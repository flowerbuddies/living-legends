import { createPlayer, getPlayer, updatePlayer } from '@/lib/player';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));
  const player = await getPlayer(id);
  return NextResponse.json(player);
}

export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));
  const data = await request.json();
  await updatePlayer(id, data);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ id: await createPlayer(data) });
}
