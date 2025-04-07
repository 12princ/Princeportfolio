import { NextResponse } from 'next/server';
import { client } from '../../../../../sanity/lib/client';
import { getAllProjectsQuery, getFeaturedProjectsQuery, getProjectsByCategoryQuery } from '../../../../../sanity/lib/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');
  
  try {
    let projects;
    
    if (featured === 'true') {
      projects = await client.fetch(getFeaturedProjectsQuery);
    } else if (category) {
      projects = await client.fetch(getProjectsByCategoryQuery, { category });
    } else {
      projects = await client.fetch(getAllProjectsQuery);
    }
    
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
} 