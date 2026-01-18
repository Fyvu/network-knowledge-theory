'use client';
import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

export default function Cytos() {
  const containerRef = useRef(null);
  // const cyRef = useRef(null);
  useEffect(() => {
    const cyRef = cytoscape({
      container: containerRef.current,

      elements: [
        { data: { id: 'a', label: 'Node A' } },
        { data: { id: 'b', label: 'Node B' } },
        { data: { id: 'c', label: 'Node C' } },
        { data: { source: 'a', target: 'b' } },
        { data: { source: 'a', target: 'c' } },
      ],

      layout: {
        name: 'grid',
        rows: 1,
      },
    });

    return () => {
      if (cyRef) {
        cyRef.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // style={{ width: '100%', height: '500px', border: '1px solid black' }}
      className="h-screen w-screen"
    />
  );
}
