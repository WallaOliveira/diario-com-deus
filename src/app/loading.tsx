export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mx-auto flex items-center justify-center mb-4 animate-pulse">
          <span className="text-3xl">✝️</span>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-3"></div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}

