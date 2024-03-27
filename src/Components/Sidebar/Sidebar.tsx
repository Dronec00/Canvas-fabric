import React from 'react'
import styles from './Sidebar.module.scss'
import elsems from '../../img/elems.svg'
import triangle from '../../img/triangle.svg'
import circle from '../../img/circle.svg'
import rect from '../../img/rect.svg'
import text from '../../img/text.svg'
import upload from '../../img/upload.svg'
import convert from '../../img/convert.svg'

interface SidebarProps {
    addRect: () => void,
    addCircle: () => void,
    addText: () => void,
    addImage: (file: File) => void,
    addTriangle: () => void,
    convertToSVG: () => void
}

const Sidebar = ({
    addRect,
    addCircle,
    addText,
    addImage,
    addTriangle,
    convertToSVG
}: SidebarProps) => {

    const [openElements, setOpenElements] = React.useState<boolean>(false);

    const handleElemsSwitch = () => {
      setOpenElements(!openElements);
    };
    
    const handleLoadImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        const img = event.target.files?.[0];
        if (img) {
          addImage(img);
          event.target.value = '';
        }
      };

    return (
      <div className={styles.sidebar}>
        <button
          className={styles.sidebar__elements}
          onClick={handleElemsSwitch}
        >
          <img src={elsems} alt="elements" />
        </button>
        Фигуры
        {openElements && (
          <ul className={styles.sidebar__list}>
            <li onClick={addCircle}>
              <img src={circle} alt="circle" />
            </li>
            <li onClick={addRect}>
              <img src={rect} alt="square" />
            </li>
            <li onClick={addTriangle}>
              <img src={triangle} alt="triangle" />
            </li>
          </ul>
        )}
        <button
        className={styles.sidebar__elements}
        onClick={addText}
        >
        <img src={text} alt='text' />
        </button>
        Текст
        <label htmlFor="upload" className={styles.sidebar__label}> 
        <img src={upload} alt='upload' className={styles.sidebar__fileUploader} />
        </label>
        <input 
            id="upload"
            type="file"
            accept=".png, .jpg, .svg"
            onChange={handleLoadImg}
            className={styles.sidebar__inputUpload}
        />
        <button
        className={styles.sidebar__elements}
        onClick={convertToSVG}
        >
        <img src={convert} alt='text' />
        </button>
      </div>
    );
  };

export default Sidebar