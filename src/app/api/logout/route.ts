import { NextResponse } from 'next/server';

export async function GET() {
  // Clear the sessionToken cookie by setting an expired date
  const response = NextResponse.json({ message: 'Logged out and session cleared' });

  response.cookies.set('sessionToken', '', {
    httpOnly: true,
    secure: true, // ensure it's only cleared over HTTPS
    maxAge: 0, // Set to 0 to expire immediately
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
