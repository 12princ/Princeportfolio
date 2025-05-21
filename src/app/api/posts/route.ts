import { NextResponse } from 'next/server';
import { client } from '@sanity/lib/client';
import { postsQuery } from '@sanity/lib/queries';

export async function GET() {
  try {
    const posts = await client.fetch(postsQuery);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
} 