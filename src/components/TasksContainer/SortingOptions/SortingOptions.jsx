import { Icon } from '@iconify/react'
import arrowDown from '@iconify-icons/bi/arrow-down'
import { useState } from 'react'

export default function SortingOptions ({sortParams, setSortParams}) {

    const [sortOrientationDown, setSortOrientationDown ] = useState(true)

    return (
        <div className='sortingOptions'>
            <h3>Sort by:</h3>
            <button className={sortParams === 'creationDate' ? 'selected' : null} onClick={() => {setSortParams('creationDate'); setSortOrientationDown(!sortOrientationDown)}}>
                Creation date
                {sortParams === 'creationDate' ? <Icon icon={arrowDown} className={sortOrientationDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
            <button className={sortParams === 'dueDate' ? 'selected' : null} onClick={() => {setSortParams('dueDate'); setSortOrientationDown(!sortOrientationDown)}}>
                Due date
                {sortParams === 'dueDate' ? <Icon icon={arrowDown} className={sortOrientationDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
            <button className={sortParams === 'priority' ? 'selected' : null} onClick={() => {setSortParams('priority'); setSortOrientationDown(!sortOrientationDown)}}>
                Priority
                {sortParams === 'priority' ? <Icon icon={arrowDown} className={sortOrientationDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
            <button className={sortParams === 'state' ? 'selected' : null} onClick={() => {setSortParams('state'); setSortOrientationDown(!sortOrientationDown)}}>
                State
                {sortParams === 'state' ? <Icon icon={arrowDown} className={sortOrientationDown ? 'arrow down' : 'arrow up'}/> : null}
            </button>
        </div>
    )
}