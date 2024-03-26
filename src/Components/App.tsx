import React from 'react';
import { fabric } from 'fabric';
import { Logic } from './Logic';

const FabricCanvas: React.FC = () => {
  const { 
    addRect,
    addCircle,
    addText,
    Save,
    zoomIn,
    zoomOut,
    Undo,
    Redo,
    clearCanvas
  } = Logic()

  return (
    <div>
      <canvas id="fabric-canvas" />
      <button onClick={addRect}>Add Square</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addText}>Add Text</button>
      <button onClick={Save}>Save</button>
      <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button>
      <button onClick={Undo}>Undo</button>
      <button onClick={Redo}>Redo</button>
      <button onClick={clearCanvas}>clearCanvas</button>
      <input 
      type="file"
      />
    </div>
  );
};

export default FabricCanvas;
