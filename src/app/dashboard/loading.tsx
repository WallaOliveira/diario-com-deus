export default function DashboardLoading() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Card de boas-vindas */}
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>

        {/* Streak */}
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>

        {/* Grid de atalhos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        {/* Mais cards */}
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

