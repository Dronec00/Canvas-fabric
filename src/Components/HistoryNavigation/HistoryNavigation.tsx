import undo from '../../img/arrow-left.svg'
import redo from '../../img/arrow-right.svg'
import styles from './HistoryNavigation.module.scss'

interface HistoryNavigationProps {
    Undo: () => void,
    Redo: () => void
}

const HistoryNavigation = ({
    Undo,
    Redo
}: HistoryNavigationProps
) => {
    return (
        <div className={styles.history}>
            <button
                className={styles.history__undo}
                onClick={Undo}
                >
                <img src={undo} alt='undo' />
            </button>
            <button
                className={styles.history__redo}
                onClick={Redo}
                >
                <img src={redo} alt='redo' />
            </button>
        </div>
    )
}

export default HistoryNavigation