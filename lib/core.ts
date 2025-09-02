import axios from 'axios';

// Core app configuration
const CORE_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://sacavia.com';

// Create axios instance for core app API calls
const coreApiClient = axios.create({
  baseURL: CORE_APP_URL,
  timeout: 30000, // 30 seconds timeout for ingest operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Core contest entry interface (matching the main app)
export interface CoreContestEntry {
  experienceId: string;
  title: string;
  city: string;
  thumbnailUrl?: string;
  permalink: string;
  createdAt: string;
  upvotesCount: number;
}

// Core API response interface
export interface CoreContestEntriesResponse {
  entries: CoreContestEntry[];
  nextCursor?: string;
}

// Fetch contest entries from core app
export async function fetchEntries({
  cursor,
  limit = 50,
  city,
  q,
}: {
  cursor?: string;
  limit?: number;
  city?: string;
  q?: string;
}): Promise<CoreContestEntriesResponse> {
  try {
    console.log('🌐 Fetching entries from core app:', { cursor, limit, city, q });
    
    // Build query parameters
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor);
    if (limit) params.append('limit', limit.toString());
    if (city) params.append('city', city);
    if (q) params.append('q', q);

    const url = `/api/contest/entries${params.toString() ? `?${params.toString()}` : ''}`;
    
    console.log('📡 Core API request:', `${CORE_APP_URL}${url}`);

    const response = await coreApiClient.get<CoreContestEntriesResponse>(url);
    
    console.log('✅ Core API response:', {
      entriesCount: response.data.entries.length,
      hasNextCursor: !!response.data.nextCursor,
      firstEntry: response.data.entries[0]?.title,
    });

    return response.data;

  } catch (error) {
    console.error('❌ Failed to fetch entries from core app:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;
      
      throw new Error(`Core API error (${status}): ${message}`);
    }
    
    throw new Error(`Failed to fetch entries: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fetch all entries with pagination (for ingest operations)
export async function fetchAllEntries({
  city,
  q,
  maxEntries = 1000, // Safety limit
}: {
  city?: string;
  q?: string;
  maxEntries?: number;
}): Promise<CoreContestEntry[]> {
  const allEntries: CoreContestEntry[] = [];
  let cursor: string | undefined;
  let totalFetched = 0;

  try {
    console.log('🔄 Starting bulk fetch of all entries...');
    
    do {
      const response = await fetchEntries({
        cursor,
        limit: 50, // Use maximum limit for efficiency
        city,
        q,
      });

      allEntries.push(...response.entries);
      totalFetched += response.entries.length;
      cursor = response.nextCursor;

      console.log(`📊 Fetched ${totalFetched} entries so far...`);

      // Safety check to prevent infinite loops
      if (totalFetched >= maxEntries) {
        console.warn(`⚠️  Reached maximum entries limit (${maxEntries}), stopping fetch`);
        break;
      }

      // Small delay to be respectful to the core API
      if (cursor) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

    } while (cursor);

    console.log(`✅ Bulk fetch complete: ${allEntries.length} total entries`);
    return allEntries;

  } catch (error) {
    console.error('❌ Bulk fetch failed:', error);
    throw error;
  }
}

// Health check for core app connectivity
export async function checkCoreAppHealth(): Promise<boolean> {
  try {
    const response = await coreApiClient.get('/api/health', { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.error('❌ Core app health check failed:', error);
    return false;
  }
}

// Get core app URL for external links
export function getCoreAppUrl(): string {
  return CORE_APP_URL;
}

// Get core app API base URL
export function getCoreApiBaseUrl(): string {
  return `${CORE_APP_URL}/api`;
}

// Voting functions
export async function upvoteExperience(experienceId: string, userId: string): Promise<{
  success: boolean;
  upvoted: boolean;
  upvotesCount: number;
  message?: string;
  error?: string;
}> {
  try {
    console.log('👍 Upvoting experience:', { experienceId, userId });
    
    const response = await coreApiClient.post('/contest/upvote', {
      experienceId,
      userId,
    });

    return response.data;
  } catch (error) {
    console.error('❌ Failed to upvote experience:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;
      
      throw new Error(`Upvote failed (${status}): ${message}`);
    }
    
    throw new Error(`Failed to upvote: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Check upvote status
export async function checkUpvoteStatus(experienceId: string, userId?: string): Promise<{
  success: boolean;
  experienceId: string;
  upvotesCount: number;
  userUpvoted: boolean;
  message?: string;
  error?: string;
}> {
  try {
    console.log('🔍 Checking upvote status:', { experienceId, userId });
    
    const params = new URLSearchParams();
    params.append('experienceId', experienceId);
    if (userId) params.append('userId', userId);

    const response = await coreApiClient.get(`/contest/upvote?${params.toString()}`);
    
    return response.data;
  } catch (error) {
    console.error('❌ Failed to check upvote status:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;
      
      throw new Error(`Status check failed (${status}): ${message}`);
    }
    
    throw new Error(`Failed to check status: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
