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

    const azureApiUrl = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_ID}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`

    console.log('🚀 发送到 Azure OpenAI:', azureApiUrl)

    const response = await fetch(azureApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_API_KEY!,
      },
      body: JSON.stringify({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_ID,
        messages: body.messages,
        temperature: 0.7,
        stream: true, // ✅ 确保启用流式传输
      }),
    })

    if (!response.ok || !response.body) {
      const errorText = await response.text()
      console.error('❌ Azure OpenAI 请求失败:', errorText)
      return new Response(
        JSON.stringify({ error: 'Azure OpenAI API Error', details: errorText }),
        { status: 500 }
      )
    }

    console.log('✅ 开始流式传输 AI 响应')

    const reader = response.body.getReader()

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
