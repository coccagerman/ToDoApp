import { Icon } from '@iconify/react'
import arrowDown from '@iconify-icons/bi/arrow-down'

export default function SortingOptions ({sortParams, setSortParams, sortOrientantionDown, setSortOrientantionDown}) {

    return (
        <div className='sortingOptions'>
            <h3>Sort by:</h3>
            <button className={sortParams === 'creationDate' ? 'selected' : null} onClick={() => {setSortParams('creationDate'); setSortOrientantionDown(!sortOrientantionDown)}}>
                Creation date
                {sortParams === 'creationDate' ? <Icon icon={arrowDown} className={sortOrientantionDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
            <button className={sortParams === 'dueDate' ? 'selected' : null} onClick={() => {setSortParams('dueDate'); setSortOrientantionDown(!sortOrientantionDown)}}>
                Due date
                {sortParams === 'dueDate' ? <Icon icon={arrowDown} className={sortOrientantionDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
            <button className={sortParams === 'priority' ? 'selected' : null} onClick={() => {setSortParams('priority'); setSortOrientantionDown(!sortOrientantionDown)}}>
                Priority
                {sortParams === 'priority' ? <Icon icon={arrowDown} className={sortOrientantionDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
            <button className={sortParams === 'state' ? 'selected' : null} onClick={() => {setSortParams('state'); setSortOrientantionDown(!sortOrientantionDown)}}>
                State
                {sortParams === 'state' ? <Icon icon={arrowDown} className={sortOrientantionDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
        </div>
    )
}