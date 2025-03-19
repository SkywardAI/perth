export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('✅ 收到请求:', JSON.stringify(body, null, 2))

    if (
      !body.messages ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400 }
      )
    }

    const thinkingProcessPrompt = [
      {
        role: 'system',
        content:
          'You are an AI that explains its reasoning step by step before answering questions. Please provide a structured "thinking process" first, without answering the question directly.',
      },
      ...body.messages,
    ]

    const filteredMessages = thinkingProcessPrompt.map(({ role, content }) => ({
      role,
      content,
    }))

    const azureApiUrl = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_ID}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`

    const thinkingResponse = await fetch(azureApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_API_KEY!,
      },
      body: JSON.stringify({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_ID,
        messages: filteredMessages,
        temperature: 0.7,
        stream: false, // 先获取完整思考过程
      }),
    })

    if (!thinkingResponse.ok) {
      const errorText = await thinkingResponse.text()
      console.error('❌ AI 生成思考过程失败:', errorText)
      return new Response(
        JSON.stringify({ error: 'Azure OpenAI API Error', details: errorText }),
        { status: 500 }
      )
    }

    const thinkingData = await thinkingResponse.json()
    const thinkingProcess =
      thinkingData.choices[0].message.content.trim() + '\n\n###THINKING-END###'

    console.log('🤔 AI 思考过程:', thinkingProcess)

    const answerPrompt = [
      {
        role: 'system',
        content: `Here is your structured thinking process:\n\n${thinkingProcess}\n\nNow, based on this, please provide a final answer.`,
      },
      ...body.messages,
    ]

    const answerResponse = await fetch(azureApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_API_KEY!,
      },
      body: JSON.stringify({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_ID,
        messages: answerPrompt.map(({ role, content }) => ({ role, content })),
        temperature: 0.7,
        stream: true,
      }),
    })

    if (!answerResponse.ok || !answerResponse.body) {
      const errorText = await answerResponse.text()
      console.error('❌ AI 生成答案失败:', errorText)
      return new Response(
        JSON.stringify({ error: 'Azure OpenAI API Error', details: errorText }),
        { status: 500 }
      )
    }

    console.log('✅ 开始流式传输 AI 最终答案')
    const reader = answerResponse.body.getReader()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
          controller.close()
        } catch (error) {
          console.error('❌ 流式传输错误:', error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
    })
  } catch (error) {
    console.error('❌ 服务器错误:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  }
}
