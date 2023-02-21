import { OpenAIStream } from '../../utils/open-ai-stream';

if (!process.env.OPEN_AI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response('No prompt supplied in the request', { status: 400 });
  }

  const payload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
