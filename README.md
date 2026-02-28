# Network of Knowledge

This project is a Next.js application designed to visualize connections between Wikipedia articles as a network graph.

## Technical Overview

### Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Visualization:** Cytoscape.js
- **Styling:** Tailwind CSS (v4)

### Core Functionality

- **Data Fetching:**
  - Connects to the Wikipedia API (`en.wikipedia.org/w/api.php`) to retrieve article metadata.
  - Implements server-side fetching with Next.js caching strategies (1-hour revalidation for links, 24-hour for categories).
  - Filters for main namespace articles (Namespace 0) and excludes hidden categories.
- **Visualization:**
  - Renders a force-directed graph using Cytoscape.js (`cose` layout).
  - Displays a root node (currently hardcoded as "Linux") and its outgoing links as connected nodes.
  - Limits initial visualization to 50 nodes for performance.

### Project Structure

- `app/lib/wikipedia.ts`: Handles API interaction, parameter construction, and response parsing.
- `app/components/NetworkGraph.tsx`: Client-side component wrapping Cytoscape.js for graph rendering.
- `app/page.tsx`: Server component that orchestrates data fetching and passes graph elements to the client.
