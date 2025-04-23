import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const validActions = [
  'followed',
  'liked',
  'retweeted',
  'discord',
  'telegram',
] as const;
type Action = (typeof validActions)[number];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ action: Action }> }
) {
  try {
    const { action } = await params;

    if (!validActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const body = await request.json();
    const { walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const fieldMap: Record<Action, keyof typeof prisma.whiteList.fields> = {
      followed: 'followed',
      liked: 'liked',
      retweeted: 'retweeted',
      discord: 'discord',
      telegram: 'telegram',
    };

    const field = fieldMap[action];
    const entry = await prisma.whiteList.update({
      where: {
        walletAddress,
      },
      data: {
        [field]: true,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error(`Error updating entry:`, error);
    return NextResponse.json(
      { error: `Failed to update entry` },
      { status: 500 }
    );
  }
}
