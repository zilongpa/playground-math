import { useState } from 'react';
import { NodeProps, Node } from '@xyflow/react';
 
export type CounterNode = Node<
  {
    initialCount?: number;
  },
  'counter'
>;
 
export default function CounterNode(props: NodeProps<CounterNode>) {
  const [count, setCount] = useState(props.data?.initialCount ?? 0);
 
  return (
    <div>
      <p>Count: {count}</p>
      <button className="nodrag" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}