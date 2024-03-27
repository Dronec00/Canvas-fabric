import React from 'react';
import { fabric } from 'fabric';

interface LogicTypes {
  addRect: () => void,
  addCircle: () => void,
  addTriangle: () => void,
  addText: () => void,
  addImage: (file: File) => void,
  convertToSVG: () => string,
  zoomIn: () => void,
  zoomOut: () => void,
  Undo: () => void,
  Redo: () => void,
  clearCanvas: () => void,
  zoomLevel: number
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
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey) {
          if (event.key === "z") {
            Undo();
          } else if (event.key === "y") {
            Redo();
          }
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener("keydown", handleKeyDown);
      }
    }, []);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.setWidth(window.innerWidth);
        canvasRef.current.setHeight(window.innerHeight);
        canvasRef.current.renderAll();
      }
    };
    console.log(zoomLevel)
    React.useEffect(()=>{
      if(!canvasRef.current) return;
      canvasRef.current.setZoom(zoomLevel)
    },[zoomLevel]);

    const addRect = () => {
      if (!canvasRef.current) return;
        const rect = new fabric.Rect({
          left: 250,
          top: 100,
          fill: 'red',
          width: 150,
          height: 150,
          stroke: '#717f5c',
          strokeWidth: 5,
        });
        canvasRef.current.add(rect);
        canvasRef.current.renderAll();
        setItems(prevItems => [...prevItems, rect])
    };

    const addTriangle = () => {
      if (!canvasRef.current) return;
      const triangle = new fabric.Triangle({
        width: 250,
        height: 300,
        left: 400,
        top: 300,
        fill: '#74be04',
        stroke: 'black',
        strokeWidth: 5,
      });
      canvasRef.current.add(triangle);
      canvasRef.current.renderAll();
      setItems(prevItems => [...prevItems, triangle]);
    };

    const addCircle = () => {
      if (!canvasRef.current) return;
      const circle = new fabric.Circle({
        left: 200,
        top: 200,
        radius: 90,
        fill: '#225bce',
        stroke: '#a920cf',
        strokeWidth: 5,
      });
      canvasRef.current.add(circle);
      canvasRef.current.renderAll();
      setItems(prevItems => [...prevItems, circle]);
    }

    const addText = () => {
    if (!canvasRef.current) return;
    const text = new fabric.Textbox('Text', {
      left: 270,
      top: 50,
      fontSize: 40,
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

    return {
        addRect,
        addTriangle,
        addCircle,
        addText,
        addImage,
        convertToSVG,
        zoomIn,
        zoomOut,
        Undo,
        Redo,
        clearCanvas,
        zoomLevel
    }
}




