import { fetchLinksForPage, fetchCategoriesForPage } from '@/app/lib/wikipedia';
import NetworkGraph from '@/app/components/NetworkGraph';

export default async function Home() {
  const rootTitle = 'Linux';
  // Limit to 50 links for initial visualization performance
  const links = (await fetchLinksForPage(rootTitle)).slice(0, 50);
  const categories = await fetchCategoriesForPage(rootTitle);

  console.log(
    `Fetched ${links.length} links for "${rootTitle}" (visualization limited to 50)`,
  );
  console.log(`Fetched ${categories.length} categories for "${rootTitle}"`);

  // Transform data for Cytoscape
  const rootNode = { data: { id: rootTitle, label: rootTitle } };

  const nodes = links.map((link) => ({
    data: { id: link, label: link },
  }));

  const edges = links.map((link) => ({
    data: {
      id: `${rootTitle}-${link}`,
      source: rootTitle,
      target: link,
    },
  }));

  const elements = [rootNode, ...nodes, ...edges];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <NetworkGraph elements={elements} />
    </div>
  );
}
