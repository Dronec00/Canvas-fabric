import styles from './Zoom.module.scss'
import plus from '../../img/plus.svg'
import minus from '../../img/minus.svg'
import React from 'react'

interface zoomTypesProps {
    zoomIn: () => void,
    zoomOut: () => void,
    zoomLevel: number
}

const Zoom = ({
    zoomIn,
    zoomOut,
    zoomLevel
  }: zoomTypesProps) => {
    const [maxZoom, setMaxZoom] = React.useState(false);
    const [minZoom, setMinZoom] = React.useState(false);
  
    const zoom = Math.round(zoomLevel * 100);
  
    const handleZoomIn = () => {
      if (zoom < 240 && !maxZoom) {
        zoomIn();
        
        if (minZoom) {
          setMinZoom(false);
        }
      } else {
        setMaxZoom(true);
      }
    };
  
    const handleZoomOut = () => {
      if (zoom > 20 && !minZoom) {
        zoomOut();
        if (maxZoom) {
          setMaxZoom(false);
        }
      } else {
        setMinZoom(true);
      }
    };
  
    return (
      <div className={styles.zoom}>
        <button
          className={styles.zoom__plus}
          onClick={handleZoomIn}
        >
          <img src={plus} alt="plus" />
        </button>
        <span> {zoom} % </span>
        <button
          className={styles.zoom__minus}
          onClick={handleZoomOut}
        >
          <img src={minus} alt="minus" />
        </button>
      </div>
    );
  };

export default Zoom