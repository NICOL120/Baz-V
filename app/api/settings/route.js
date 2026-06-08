import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '../../../lib/trading';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const updated = await saveSettings(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
