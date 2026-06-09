import { NextResponse } from 'next/server';
import { runAutonomousFundManager } from '../../../lib/fundManagerV2';

export async function POST() {
  try {
    console.log('🚀 Manual fund manager cycle triggered via API');
    const result = await runAutonomousFundManager();
    
    return NextResponse.json({
      success: true,
      cycle: result,
      message: 'Fund manager cycle executed successfully',
    });
  } catch (error) {
    console.error('Fund manager error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Fund Manager API',
    endpoints: {
      POST: 'Trigger autonomous fund manager cycle',
      settings: '/api/settings',
    },
  });
}

