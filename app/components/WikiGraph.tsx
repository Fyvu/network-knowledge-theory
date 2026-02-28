import { fetchLinksForPage, fetchCategoriesForPage } from '@/app/lib/wikipedia';
import NetworkGraph from '@/app/components/NetworkGraph';

interface WikiGraphProps {
  topic: string;
}

export default async function WikiGraph({ topic }: WikiGraphProps) {
  // Limit to 50 links for initial visualization performance
  const links = (await fetchLinksForPage(topic)).slice(0, 50);
  const categories = await fetchCategoriesForPage(topic);

  console.log(
    `Fetched ${links.length} links for "${topic}" (visualization limited to 50)`,
  );
  console.log(`Fetched ${categories.length} categories for "${topic}"`);

  // Transform data for Cytoscape
  const rootNode = { data: { id: topic, label: topic } };

  const nodes = links.map((link) => ({
    data: { id: link, label: link },
  }));

  const edges = links.map((link) => ({
    data: {
      id: `${topic}-${link}`,
      source: topic,
      target: link,
    },
  }));

  const elements = [rootNode, ...nodes, ...edges];

  return <NetworkGraph elements={elements} />;
}
