export async function POST(req: Request) {
  try {
    const body = await req.json()

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

    const prompt = [
      {
        role: 'system',
        content:
          'You are an AI that explains its reasoning step by step before answering questions. Please first output your detailed thinking process, then your final answer. You are a helpful assistant that can only respond to questions related to SkywardAI Open Source Community.',
      },
      ...body.messages,
    ]

    const filteredMessages = prompt.map(({ role, content }) => ({
      role,
      content,
    }))

    const azureApiUrl = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_ID}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`

    const responseFromAzure = await fetch(azureApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_API_KEY!,
      },
      body: JSON.stringify({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_ID,
        messages: filteredMessages,
        temperature: 0.7,
        stream: true,
      }),
    })

    if (!responseFromAzure.ok || !responseFromAzure.body) {
      const errorText = await responseFromAzure.text()
      console.error('❌ Azure OpenAI API Error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Azure OpenAI API Error', details: errorText }),
        { status: 500 }
      )
    }

    const reader = responseFromAzure.body.getReader()

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
          console.error('❌ stream output fail:', error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
    })
  } catch (error) {
    console.error('❌ server fail:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  }
}
