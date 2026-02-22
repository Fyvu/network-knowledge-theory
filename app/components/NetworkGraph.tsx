'use client';
import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

interface NetworkGraphProps {
  elements: Array<{
    data: {
      id: string;
      label?: string;
      source?: string;
      target?: string;
    };
  }>;
}

export default function NetworkGraph({ elements = [] }: NetworkGraphProps) {
  const containerRef = useRef(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: elements,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
        animate: true,
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            label: 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            color: '#fff',
            'text-outline-color': '#666',
            'text-outline-width': 2,
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [elements]);

  return <div ref={containerRef} className="h-screen w-screen" />;
}
