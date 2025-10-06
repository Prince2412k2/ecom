import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { paramsToSign } = body;

  try {
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUD_API_SECRET!);
    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Failed to sign cloudinary params', error);
    return NextResponse.json({ error: 'Failed to sign cloudinary params' }, { status: 500 });
  }
}
