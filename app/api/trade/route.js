import { NextResponse } from 'next/server';
import { runStrategy } from '../../../lib/trading';

export async function POST() {
  try {
    const result = await runStrategy();
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
