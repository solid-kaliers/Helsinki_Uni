import { useState } from 'react';

const DragDropExample = () => {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    setDraggedIndex(null);
  };

  return (
    <ul>
      {items.map((item, idx) => (
        <li
          key={item}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(idx)}
          style={{
            padding: '8px',
            margin: '4px',
            background: '#eee',
            border: '1px solid #ccc',
            cursor: 'move'
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DragDropExample;
