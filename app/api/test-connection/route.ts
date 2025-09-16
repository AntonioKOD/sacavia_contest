import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://www.sacavia.com/api';
    
    console.log('🔗 Testing connection to main app API:', apiBaseUrl);

    // Test connection to main app's contest API
    const testEndpoints = [
      '/contest/entries?limit=1',
      '/contest/stats',
      '/contest/leaderboard?limit=1'
    ];

    const results = [];

    for (const endpoint of testEndpoints) {
      try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout
          signal: AbortSignal.timeout(5000),
        });

        const isSuccess = response.ok;
        const status = response.status;
        const statusText = response.statusText;

        results.push({
          endpoint,
          success: isSuccess,
          status,
          statusText,
          url: `${apiBaseUrl}${endpoint}`
        });

        console.log(`✅ ${endpoint}: ${status} ${statusText}`);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.push({
          endpoint,
          success: false,
          error: errorMessage,
          url: `${apiBaseUrl}${endpoint}`
        });

        console.error(`❌ ${endpoint}:`, errorMessage);
      }
    }

    const allSuccessful = results.every(r => r.success);
    const successCount = results.filter(r => r.success).length;

    return NextResponse.json({
      success: allSuccessful,
      message: `API connection test completed: ${successCount}/${results.length} endpoints successful`,
      apiBaseUrl,
      results,
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_MAIN_APP_URL: process.env.NEXT_PUBLIC_MAIN_APP_URL,
        NEXT_PUBLIC_CONTEST_APP_URL: process.env.NEXT_PUBLIC_CONTEST_APP_URL,
      }
    });

  } catch (error) {
    console.error('❌ API connection test failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'API connection test failed',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

