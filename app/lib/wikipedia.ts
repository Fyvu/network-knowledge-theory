const BASE_URL = 'https://en.wikipedia.org/w/api.php';

// --- Types ---

export interface WikiLink {
  ns: number;
  title: string;
}

export interface WikiCategory {
  ns: number;
  title: string;
}

export interface WikiPageResponse {
  pageid: number;
  ns: number;
  title: string;
  links?: WikiLink[];
  categories?: WikiCategory[];
}

// --- Helpers ---

/**
 * Helper to construct the URL with standard params.
 * Centralizes the API endpoint and default parameters.
 */
const buildUrl = (params: Record<string, string | number>) => {
  const searchParams = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    formatversion: '2',
    ...params,
  });

  console.log(`${BASE_URL}?${searchParams.toString()}`);
  return `${BASE_URL}?${searchParams.toString()}`;
};

// --- Fetch Functions ---

/**
 * Fetches categories for a specific page title.
 * Efficiently filters out hidden categories and non-article namespaces.
 * Cached for 24 hours.
 */
export const fetchCategoriesForPage = async (
  title: string,
): Promise<string[]> => {
  try {
    const url = buildUrl({
      prop: 'categories',
      titles: title,
      clshow: '!hidden', // Don't show hidden categories (internal maintenance categories)
      cllimit: 'max',
    });

    const res = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) {
      console.error(
        `Wikipedia API error for category fetch: ${res.statusText}`,
      );
      return [];
    }

    const data = await res.json();
    const page = data.query?.pages?.[0];

    if (!page || !page.categories) return [];

    return page.categories.map((c: WikiCategory) =>
      c.title.replace(/^Category:/, ''),
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Fetches outgoing links for a specific page title.
 * Optimized to retrieve the max number of links allowed (500) and filter for Main Articles only.
 * Cached for 1 hour.
 */
export const fetchLinksForPage = async (title: string): Promise<string[]> => {
  try {
    const url = buildUrl({
      prop: 'links',
      titles: title,
      pllimit: 'max', // Max 500 for standard users
      plnamespace: 0, // Only fetch links to main articles (namespace 0). Excludes Talk, User, etc.
    });

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error(`Wikipedia API error for links fetch: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const page = data.query?.pages?.[0];

    if (!page || !page.links) return [];

    return page.links.map((l: WikiLink) => l.title);
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
};
