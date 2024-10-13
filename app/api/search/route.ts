import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Backend request failed');
    }

    const data = await response.json();
    return NextResponse.json({ result: data.result });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}