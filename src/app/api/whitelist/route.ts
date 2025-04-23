import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required.' },
        { status: 400 }
      );
    }

    const entry = await prisma.whiteList.findUnique({
      where: { walletAddress },
    });

    if (!entry) {
      await prisma.whiteList.create({ data: { walletAddress } });
      return NextResponse.json({
        message: 'Wallet registered successfully. Please complete all tasks.',
      });
    }

    if (isAllTasksCompleted(entry)) {
      // If already marked completed, no need to update again
      if (!entry.completedAt) {
        await prisma.whiteList.update({
          where: { walletAddress },
          data: { completedAt: new Date() },
        });
      }

      return NextResponse.json({
        message: 'All tasks completed. You are now on the whitelist!',
      });
    }

    return NextResponse.json(
      {
        error:
          'Please complete all tasks (follow, like, retweet, join Discord and Telegram).',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing whitelist entry:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    let entry = await prisma.whiteList.findUnique({
      where: {
        walletAddress,
      },
    });

    // If not found, create a new one
    if (!entry) {
      entry = await prisma.whiteList.create({
        data: {
          walletAddress,
        },
      });
    }

    if (!entry) {
      return NextResponse.json(
        { error: 'Whitelist entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error('Error fetching whitelist entry:', error);
    return NextResponse.json(
      { error: 'Failed to fetch whitelist entry' },
      { status: 500 }
    );
  }
}

function isAllTasksCompleted(entry: {
  followed: boolean;
  liked: boolean;
  retweeted: boolean;
  discord: boolean;
  telegram: boolean;
}): boolean {
  return (
    entry.followed &&
    entry.liked &&
    entry.retweeted &&
    entry.discord &&
    entry.telegram
  );
}
