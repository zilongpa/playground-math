import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { NumberInput, ColorPreview, Lightness, Log } from './components/nodes/demoNodes';

const proOptions = { hideAttribution: true };

const nodeTypes = {
  NumberInput,
  ColorPreview,
  Lightness,
  Log,
};

const initialNodes = [
  {
    type: 'NumberInput',
    id: '1',
    data: { label: 'Red', value: 255 },
    position: { x: 0, y: 0 },
  },
  {
    type: 'NumberInput',
    id: '2',
    data: { label: 'Green', value: 0 },
    position: { x: 0, y: 100 },
  },
  {
    type: 'NumberInput',
    id: '3',
    data: { label: 'Blue', value: 115 },
    position: { x: 0, y: 200 },
  },
  {
    type: 'ColorPreview',
    id: 'color',
    position: { x: 150, y: 50 },
    data: {
      label: 'Color',
      value: { r: undefined, g: undefined, b: undefined },
    },
  },
  {
    type: 'Lightness',
    id: 'lightness',
    position: { x: 350, y: 75 },
  },
  {
    id: 'log-1',
    type: 'Log',
    position: { x: 500, y: 0 },
    data: { label: 'Use black font', fontColor: 'black' },
  },
  {
    id: 'log-2',
    type: 'Log',
    position: { x: 500, y: 140 },
    data: { label: 'Use white font', fontColor: 'white' },
  },
];

const initialEdges = [
  {
    id: '1-color',
    source: '1',
    target: 'color',
    targetHandle: 'red',
  },
  {
    id: '2-color',
    source: '2',
    target: 'color',
    targetHandle: 'green',
  },
  {
    id: '3-color',
    source: '3',
    target: 'color',
    targetHandle: 'blue',
  },
  {
    id: 'color-lightness',
    source: 'color',
    target: 'lightness',
  },
  {
    id: 'lightness-log-1',
    source: 'lightness',
    sourceHandle: 'light',
    target: 'log-1',
  },
  {
    id: 'lightness-log-2',
    source: 'lightness',
    sourceHandle: 'dark',
    target: 'log-2',
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  
  return (
    <div style={{ width: '100wh', height: '100vh'}}>
      <ReactFlow
      fitView
      proOptions={proOptions}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}