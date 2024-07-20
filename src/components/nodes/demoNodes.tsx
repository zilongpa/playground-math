import { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useHandleConnections, useNodesData, useReactFlow } from '@xyflow/react';


function CustomHandle({ id, label, onChange }) {
    const connections = useHandleConnections({
        type: 'target',
        id,
    });

    const nodeData = useNodesData(connections?.[0].source);

    useEffect(() => {
        onChange(nodeData?.data ? nodeData.data.value : 0);
    }, [nodeData]);

    return (
        <div>
            <Handle
                type="target"
                position={Position.Left}
                id={id}
                className="handle"
            />
            <label htmlFor="red" className="label">
                {label}
            </label>
        </div>
    );
}

function NumberInput({ id, data }) {
    const { updateNodeData } = useReactFlow();
    const [number, setNumber] = useState(0);

    const onChange = useCallback((evt) => {
        const cappedNumber = Math.round(
            Math.min(255, Math.max(0, evt.target.value)),
        );
        setNumber(cappedNumber);
        updateNodeData(id, { value: cappedNumber });
        console.log(11)
    }, []);

    return (
        <div className="number-input">
            <div>{data.label}</div>
            <input
                id={`number-${id}`}
                name="number"
                type="number"
                min="0"
                max="255"
                onChange={onChange}
                className="nodrag"
                value={number}
            />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

function ColorPreview() {
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

    return (
        <div
            className="node"
            style={{
                background: `rgb(${color.r}, ${color.g}, ${color.b})`,
            }}
        >
            <CustomHandle
                id="red"
                label="R"
                onChange={(value) => setColor((c) => ({ ...c, r: value }))}
            />
            <CustomHandle
                id="green"
                label="G"
                onChange={(value) => setColor((c) => ({ ...c, g: value }))}
            />
            <CustomHandle
                id="blue"
                label="B"
                onChange={(value) => setColor((c) => ({ ...c, b: value }))}
            />
            <Handle type="source" position={Position.Right} id="output" />
        </div>
    );
}

function Lightness({ id }) {
    const { updateNodeData } = useReactFlow();
  
    const connections = useHandleConnections({ type: 'target' });
    const nodesData = useNodesData(connections?.[0].source);
  
    const [lightness, setLightness] = useState('dark');
  
    useEffect(() => {
      if (nodesData.data?.value) {
        const color = nodesData.data.value;
        const isLight =
          0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128;
        setLightness(isLight ? 'light' : 'dark');
  
        const newNodeData = isLight
          ? { light: color, dark: null }
          : { light: null, dark: color };
        updateNodeData(id, newNodeData);
      } else {
        setLightness('dark');
        updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
      }
    }, [nodesData, updateNodeData]);
  
    return (
      <div
        className="lightness-node"
        style={{
          background: lightness === 'light' ? 'white' : 'black',
          color: lightness === 'light' ? 'black' : 'white',
        }}
      >
        <Handle type="target" position={Position.Left} />
        <p style={{ marginRight: 10 }}>Light</p>
        <Handle
          type="source"
          id="light"
          position={Position.Right}
          style={{ top: 25 }}
        />
        <p style={{ marginRight: 10 }}>Dark</p>
        <Handle
          type="source"
          id="dark"
          position={Position.Right}
          style={{ top: 75 }}
        />
      </div>
    );
  }

  function Log({ data }) {
    const connections = useHandleConnections({ type: 'target' });
  
    const nodeData = useNodesData(connections?.[0].source);
  
    const color = nodeData.data
      ? nodeData.data[connections?.[0].sourceHandle]
      : null;
  
    return (
      <div
        className="log-node"
        style={{
          background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white',
          color: color ? data.fontColor : 'black',
        }}
      >
        {color ? data.label : 'Do nothing'}
        <Handle type="target" position="left" />
      </div>
    );
  }

export { NumberInput, ColorPreview, Lightness, Log };