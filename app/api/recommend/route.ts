import { NextRequest, NextResponse } from 'next/server';
import { recommendDevices } from '@/lib/recommendation';

export async function POST(req: NextRequest) {
  const answers = await req.json();
  const top = recommendDevices(answers);
  return NextResponse.json({ top });
}
