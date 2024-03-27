import React from 'react';
import { Logic } from './Logic/Logic';
import Zoom from './Zoom/Zoom';
import styles from './App.module.scss'
import HistoryNavigation from './HistoryNavigation/HistoryNavigation';

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
    clearCanvas,
    addTriangle,
    zoomLevel
  } = Logic()

  const handleLoadImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files?.[0];
    if (img) {
      addImage(img);
      event.target.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <canvas className={styles.container__canvas} id="fabric-canvas" />
      <div className={styles.container__zoom}>
        <Zoom 
          zoomIn = {zoomIn}
          zoomOut = {zoomOut}
          zoomLevel = {zoomLevel}
        />
      </div>

      <div className={styles.container__historyNav}>
        <HistoryNavigation
          Undo = {Undo}
          Redo = {Redo}

        />
      </div>
      <button onClick={addRect}>Add Square</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addText}>Add Text</button>
      <button onClick={convertToSVG}>Save</button>

      <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button>
      <button onClick={Undo}>Undo</button>
      <button onClick={Redo}>Redo</button>
      <button onClick={clearCanvas}>clearCanvas</button>
      <button onClick={addTriangle}>Triangle</button>
      <input 
      type="file"
      accept=".png, .jpg, .svg"
      onChange={handleLoadImg}
      />
      
    </div>
  );
};

export default FabricCanvas;
