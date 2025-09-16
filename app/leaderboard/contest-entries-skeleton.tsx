export function ContestEntriesSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search Form Skeleton */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-4 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Entries Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            {/* Thumbnail Skeleton */}
            <div className="w-full h-64 bg-gray-300 rounded mb-4"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-12"></div>
              </div>
            </div>
            
            {/* Actions Skeleton */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-8 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Skeleton */}
      <div className="text-center">
        <div className="h-12 bg-gray-300 rounded-lg w-48 mx-auto animate-pulse"></div>
      </div>
    </div>
  );
}
