# Sanity Webhook Setup for Cache Revalidation

This project is configured to automatically revalidate the metadata cache when content is updated in Sanity Studio. Here's how to set it up:

## 1. Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
SANITY_WEBHOOK_SECRET=your-secret-here
```

Generate a secure random string for the webhook secret.

## 2. Sanity Studio Webhook Configuration

In your Sanity Studio, go to **Settings** → **API** → **Webhooks** and create a new webhook:

### Webhook Details:
- **Name**: `Metadata Cache Revalidation`
- **URL**: `https://your-domain.com/api/webhooks/sanity`
- **HTTP Method**: `POST`
- **Dataset**: `production` (or your dataset name)
- **Filter**: Leave empty to trigger on all content changes
- **HTTP Headers**: 
  - `Authorization`: `Bearer your-secret-here`

### Trigger Conditions:
- **Create**: ✅
- **Update**: ✅  
- **Delete**: ✅

## 3. How It Works

1. **Content Update**: When content is updated in Sanity Studio
2. **Webhook Trigger**: Sanity sends a POST request to `/api/webhooks/sanity`
3. **Cache Invalidation**: The webhook calls `revalidateTag('metadata')`
4. **Fresh Data**: Next time a page is visited, fresh metadata is fetched

## 4. Testing the Webhook

### Manual Revalidation:
```bash
# Test the webhook endpoint
curl -X GET "https://your-domain.com/api/revalidate?tag=metadata"

# Test the Sanity webhook endpoint
curl -X POST "https://your-domain.com/api/webhooks/sanity" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-here" \
  -d '{"_type":"metadata"}'
```

### In Development:
```bash
# Local testing
curl -X GET "http://localhost:3000/api/revalidate?tag=metadata"
```

## 5. Cache Tags Used

- **`metadata`**: Applied to all metadata queries
- **`settings`**: Applied to settings queries (if implemented)

## 6. Troubleshooting

### Webhook Not Triggering:
- Check Sanity Studio webhook configuration
- Verify the webhook URL is accessible
- Check server logs for errors

### Cache Not Updating:
- Verify the webhook is receiving requests
- Check that `revalidateTag('metadata')` is being called
- Ensure the metadata query includes the cache tag

### Security:
- Always use a webhook secret in production
- The webhook validates the `Authorization` header
- Consider IP whitelisting for additional security

## 7. Manual Cache Invalidation

You can also manually invalidate the cache using the utility functions:

```typescript
import { revalidateMetadata } from '@/lib/revalidate';

// In a server action or API route
await revalidateMetadata();
```

## 8. Performance Considerations

- Cache invalidation only happens when content is updated
- Fresh data is fetched on the next page visit
- No immediate performance impact from cache invalidation
- CDN caching is preserved while ensuring data freshness
