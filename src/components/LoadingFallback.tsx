export const LoadingFallback = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-accent/5 rounded-lg mb-4" />
    <div className="h-32 bg-accent/5 rounded-lg" />
  </div>
);

export const CardLoadingFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="h-48 bg-accent/5 rounded-lg mb-2" />
        <div className="h-4 bg-accent/5 rounded w-3/4 mb-2" />
        <div className="h-4 bg-accent/5 rounded w-1/2" />
      </div>
    ))}
  </div>
); 