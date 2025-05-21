import { NextResponse } from 'next/server';
import { client } from '@sanity/lib/client';
import { projectsQuery } from '@sanity/lib/queries';

export async function GET() {
  try {
    const projects = await client.fetch(projectsQuery);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
  }
} 