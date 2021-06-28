import { Icon } from '@iconify/react'
import trashFill from '@iconify-icons/bi/trash-fill'
import editSolid from '@iconify-icons/clarity/edit-solid'
import bxCheck from '@iconify-icons/bx/bx-check'
import arrowGoBackFill from '@iconify-icons/ri/arrow-go-back-fill'
import { useState } from 'react'

export default function Task ({taskData}) {

    const [taskDone, setTaskDone] = useState(false)

    return (
        <article className='task'>
            <header>
                <h2 className={taskDone ? 'line-through' : null}>{taskData.taskTittle}</h2>
                {!taskDone ? <Icon icon={bxCheck} className='icon icon-done' onClick={() => setTaskDone(!taskDone)} /> : <Icon icon={arrowGoBackFill} className='icon icon-reverse' onClick={() => setTaskDone(!taskDone)} />}
                <Icon icon={editSolid} className='icon icon-edit' />
                <Icon icon={trashFill} className='icon icon-erase' />
            </header>
            <div className='task-details'>
                <div className='details-column1'>
                    <p>Type: {taskData.taskType}</p>
                    <p>Creation date:</p>
                </div>
                <div className='details-column2'>
                    <p>Priority: {taskData.taskPriority}</p>
                    <p>Due date:</p>
                </div>
                <div className='details-column3'>
                    <p>State: {taskData.taskState}</p>
                </div>
            </div>
            <p className={taskDone ? 'task-description line-through' : 'task-description'}>{taskData.taskDescription}</p>
        </article>
    )
}