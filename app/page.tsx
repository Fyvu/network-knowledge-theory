import WikiGraph from '@/app/components/WikiGraph';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <WikiGraph topic="Linux" />
    </div>
  );
}
