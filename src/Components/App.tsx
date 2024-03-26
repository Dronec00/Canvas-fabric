import React from 'react';
import { fabric } from 'fabric';
import { Logic } from './Logic';

const FabricCanvas: React.FC = () => {
  const { 
    addRect,
    addCircle,
    addText,
    addImage,
    convertToSVG,
    zoomIn,
    zoomOut,
    Undo,
    Redo,
    clearCanvas
  } = Logic()

  const handleLoadImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files?.[0];
    if (img) {
      addImage(img);
      event.target.value = '';
    }
  };

  return (
    <div>
      <canvas id="fabric-canvas" />
      <button onClick={addRect}>Add Square</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addText}>Add Text</button>
      <button onClick={convertToSVG}>Save</button>
      <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button>
      <button onClick={Undo}>Undo</button>
      <button onClick={Redo}>Redo</button>
      <button onClick={clearCanvas}>clearCanvas</button>
      <input 
      type="file"
      accept=".png, .jpg, .svg"
      onChange={handleLoadImg}
      />
    </div>
  );
};

export default FabricCanvas;
