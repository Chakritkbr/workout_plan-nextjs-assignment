//failed stuff

import { NextRequest, NextResponse } from 'next/server';
import { createParser, Event } from 'eventsource-parser';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const response = await openai.completions.create({
      model: 'text-davinci-003', //out of support
      prompt: prompt,
      max_tokens: 100,
      stream: true,
    });

    return new NextResponse(
      new ReadableStream({
        start(controller) {
          function onParse(event: any) {
            if (event.type === 'event' && typeof event.data === 'string') {
              const data = JSON.parse(event.data);
              const text = data.choices[0]?.text;
              if (text) {
                controller.enqueue(text);
              }
            } else if (event.type === 'done') {
              controller.close();
            }
          }

          const parser = createParser(onParse);

          (response as any).body.pipeTo(
            new WritableStream({
              write(chunk) {
                parser.feed(new TextDecoder().decode(chunk));
              },
            })
          );
        },
      }),
      {
        headers: { 'Content-Type': 'text/plain' },
      }
    );
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    return NextResponse.json({ error: 'Failed to fetch data from OpenAI' });
  }
}
