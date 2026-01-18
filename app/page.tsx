import { fetchForCategory, fetchForLink } from '../src/route/data';
import Cytos from '@/src/cytoscapeCode/cytos';
export default async function Home() {
  // fetchForCategory()
  fetchForLink();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
      {/* </main> */}
      <Cytos />
    </div>
  );
}
