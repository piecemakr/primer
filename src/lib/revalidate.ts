import { revalidateTag } from 'next/cache';

/**
 * Revalidates the metadata cache
 * This function can be called from server actions or other server-side code
 * to manually trigger a metadata cache refresh
 */
export async function revalidateMetadata() {
  try {
    revalidateTag('metadata');
    console.log('Metadata cache revalidated successfully');
    return { success: true, message: 'Metadata cache revalidated' };
  } catch (error) {
    console.error('Failed to revalidate metadata cache:', error);
    return { success: false, error: 'Failed to revalidate metadata cache' };
  }
}

/**
 * Revalidates multiple cache tags at once
 * Useful when you need to refresh multiple related caches
 */
export async function revalidateTags(tags: string[]) {
  try {
    tags.forEach(tag => revalidateTag(tag));
    console.log(`Revalidated cache tags: ${tags.join(', ')}`);
    return { success: true, message: `Cache tags revalidated: ${tags.join(', ')}` };
  } catch (error) {
    console.error('Failed to revalidate cache tags:', error);
    return { success: false, error: 'Failed to revalidate cache tags' };
  }
}
