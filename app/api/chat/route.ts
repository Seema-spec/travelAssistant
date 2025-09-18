import axios from 'axios';

const delay = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req:any) {
  const { message } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  console.log(apiKey,"+++++++++++++++++++++++");
  
  try {
    await delay(10000);
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini', 
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.headers);

    return new Response(
      JSON.stringify({ response: response.data.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch response from OpenAI' }),
      { status: 500 }
    );
  }
}
