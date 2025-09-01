import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Sanity webhook secret for validation (set this in your environment variables)
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature if secret is configured
    if (WEBHOOK_SECRET) {
      const signature = request.headers.get('authorization');
      if (signature !== `Bearer ${WEBHOOK_SECRET}`) {
        console.warn('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const body = await request.json();
    
    // Handle different types of content updates
    if (body._type === 'metadata') {
      // Direct metadata update - revalidate metadata cache
      revalidateTag('metadata');
      console.log('Metadata updated, revalidated metadata cache');
    } else if (body._type === 'settings') {
      // Settings update - revalidate metadata cache as settings might affect metadata
      revalidateTag('metadata');
      console.log('Settings updated, revalidated metadata cache');
    } else if (body._type) {
      // Any other content update - revalidate metadata cache to be safe
      // This ensures metadata stays fresh even if other content changes
      revalidateTag('metadata');
      console.log(`Content updated (${body._type}), revalidated metadata cache`);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      contentType: body._type,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error processing Sanity webhook:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
