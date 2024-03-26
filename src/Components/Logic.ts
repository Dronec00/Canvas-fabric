import React from 'react';
import { fabric } from 'fabric';

interface LogicTypes {
  addRect: () => void,
  addCircle: () => void,
  addText: () => void,
  addImage: (file: File) => void,
  convertToSVG: () => string,
  zoomIn: () => void,
  zoomOut: () => void,
  Undo: () => void,
  Redo: () => void,
  clearCanvas: () => void,
}

export function Logic (): LogicTypes {
    const canvasRef = React.useRef<fabric.Canvas | null>(null);
    const [zoomLevel, setZoomLevel] = React.useState(1);
    const [items, setItems] = React.useState<fabric.Object[]>([])
    const [removedItems, setRemovedItems] = React.useState<fabric.Object[]>([])

    const backgroundColor: string = "#F2EAFF"

    React.useEffect(() => {
      if (canvasRef.current === null) {
        const canvas = new fabric.Canvas('fabric-canvas',{
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: backgroundColor
        })
        canvasRef.current = canvas;
      };
      window.addEventListener('resize', handleResize);
      return () =>  window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.setWidth(window.innerWidth);
        canvasRef.current.setHeight(window.innerHeight);
        canvasRef.current.renderAll();
      }
    };
  
    React.useEffect(()=>{
      if(!canvasRef.current) return;
      canvasRef.current.setZoom(zoomLevel)
      console.log(canvasRef.current.getObjects())
    },[zoomLevel]);

    const Undo = () => {
      if(items.length > 0 && canvasRef.current){
        const lastItem = items[items.length - 1];
        canvasRef.current.remove(lastItem);
        const Items = items.slice(0, -1);
        setItems(Items);
        setRemovedItems(prevRemovedItems => [...prevRemovedItems, lastItem]);
      }
    }

    const Redo = () => {
      if (removedItems.length > 0) {
        const lastRemovedItem = removedItems[removedItems.length - 1];
        setItems((prevItems) => [...prevItems, lastRemovedItem]);
        setRemovedItems(prevRemovedItems => prevRemovedItems.slice(0, prevRemovedItems.length - 1));
        canvasRef.current?.add(lastRemovedItem)
      };
    };

    const clearCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.clear();
        canvasRef.current.backgroundColor = backgroundColor;
        canvasRef.current.renderAll();
        setItems([]);
        setRemovedItems([]);
      }
    };

    const addRect = () => {
      if (!canvasRef.current) return;
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 100,
          height: 100,
        });
        canvasRef.current.add(rect);
        canvasRef.current.renderAll();
        setItems(prevItems => [...prevItems, rect])
    };

    const addCircle = () => {
      if (!canvasRef.current) return;
      const circle = new fabric.Circle({
        left: 100,
        top: 200,
        radius: 40,
        fill: '#225bce',
      });
      canvasRef.current.add(circle);
      canvasRef.current.renderAll();
      setItems(prevItems => [...prevItems, circle]);
    }

    const addText = () => {
    if (!canvasRef.current) return;
    const text = new fabric.Textbox('Text', {
      left: 70,
      top: 50,
      fontSize: 30,
      fill: 'black',
    });
    canvasRef.current.add(text);
    canvasRef.current.renderAll();
    setItems(prevItems => [...prevItems, text]);
    };

    const addImage = (file: File) => {
      if (!canvasRef.current) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        fabric.Image.fromURL(url, (img) => {
          img.scaleToWidth(150);
          img.scaleToHeight(200);
          canvasRef.current?.add(img);
          canvasRef.current?.renderAll();
          setItems(prevItems => [...prevItems, img]);
        });
      };
      reader.readAsDataURL(file);
    };

    const convertToSVG = () => {
      if(!canvasRef.current){
        return ''
      }
      else {
        return canvasRef.current.toSVG()
      }
    };

    const zoomIn = () => {
      if(!canvasRef.current) return;
      setZoomLevel(prev => prev + 0.1);
    }

    const zoomOut = () => {
      if(!canvasRef.current) return;
      setZoomLevel(prev => prev - 0.1);
    }
    return {
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
    }
}




