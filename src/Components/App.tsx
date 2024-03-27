import React from 'react';
import { Logic } from './Logic/Logic';
import Zoom from './Zoom/Zoom';
import styles from './App.module.scss'
import HistoryNavigation from './HistoryNavigation/HistoryNavigation';
import Sidebar from './Sidebar/Sidebar';

const FabricCanvas: React.FC = () => {
  const { 
    addRect,
    addCircle,
    addText,
    addImage,
    addTriangle,
    convertToSVG,
    zoomIn,
    zoomOut,
    Undo,
    Redo,
    clearCanvas,
    zoomLevel
  } = Logic()

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

      <div className={styles.container__sidebar}>
        <Sidebar
        addCircle={addCircle}
        addImage={addImage}
        addRect={addRect}
        addText={addText}
        addTriangle={addTriangle}
        convertToSVG={convertToSVG}
        />
      </div>
      
    </div>
  );
};

export default FabricCanvas;
