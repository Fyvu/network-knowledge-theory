import WikiGraph from '@/app/components/WikiGraph';
import SearchBar from '@/app/ui/SearchBar';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const params = await searchParams;
  const topic = params.topic;

  if (!topic) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
        <div className="flex flex-col items-center w-full max-w-2xl space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white tracking-tight">
            Knowledge<span className="text-blue-600">Graph</span>
          </h1>
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <div className="absolute top-4 left-0 right-0 z-10 px-4 pointer-events-none">
        <div className="pointer-events-auto mx-auto max-w-2xl">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading graph...
          </div>
        }
      >
        <WikiGraph topic={topic} />
      </Suspense>
    </div>
  );
}
