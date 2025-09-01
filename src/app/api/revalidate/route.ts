import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if this is a Sanity webhook
    if (body._type) {
      // Revalidate metadata cache when any content is updated
      revalidateTag('metadata');
      
      console.log('Revalidated metadata cache for content update:', body._type);
      
      return NextResponse.json({ 
        revalidated: true, 
        message: 'Metadata cache revalidated',
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json({ 
      revalidated: false, 
      message: 'No valid content type found',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in revalidation webhook:', error);
    
    return NextResponse.json(
      { 
        revalidated: false, 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Also support GET requests for manual revalidation (useful for testing)
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  
  if (tag === 'metadata') {
    revalidateTag('metadata');
    console.log('Manually revalidated metadata cache');
    
    return NextResponse.json({ 
      revalidated: true, 
      tag: 'metadata',
      timestamp: new Date().toISOString()
    });
  }
  
  return NextResponse.json({
    revalidated: false,
    message: 'Missing or invalid tag parameter. Use ?tag=metadata',
    timestamp: new Date().toISOString()
  });
}
