// app/api/verify/route.ts
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { config } from '@/config';
import { verifyMessage } from '@wagmi/core'
import { Address } from 'viem';
import { SIGN_MESSAGE } from '@/constants';

type VerifyPayload = {
  signedMessage: Address;
  address: Address;
};

export async function POST(req: Request) {
  try {
    const { signedMessage, address }: VerifyPayload = await req.json();
    const isVerified = await verifyMessage(config, { address, message: SIGN_MESSAGE, signature: signedMessage});

    if (!isVerified) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const sessionToken = randomBytes(32).toString('hex');

    // Set token in cookie (httpOnly for security)
    const response = NextResponse.json({ message: 'Verified', sessionToken });
    response.cookies.set('sessionToken', sessionToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
