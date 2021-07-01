import { Icon } from '@iconify/react'
import trashFill from '@iconify-icons/bi/trash-fill'
import editSolid from '@iconify-icons/clarity/edit-solid'
import bxCheck from '@iconify-icons/bx/bx-check'
import arrowGoBackFill from '@iconify-icons/ri/arrow-go-back-fill'
import {database} from '../../../Services/Firebase'

export default function Task ({taskData, setShowModal, setModalProps}) {

    const onDone = () => {
        database.doc(taskData.id).update({taskState: 'completed'})
    }

    const onReverse = () => {
        database.doc(taskData.id).update({taskState: 'pending'})
    }

    const onEdit = () => {
        setModalProps(taskData)
        setShowModal(true)
    }

    const onDelete = () => {
        database.doc(taskData.id).delete()
    }

    return (
        <article className='task'>
            <header>
                <h2 className={taskData.taskState === 'completed' ? 'line-through' : null}>{taskData.taskTittle}</h2>
                {taskData.taskState !== 'completed' ? <Icon icon={bxCheck} className='icon icon-done' onClick={() => onDone()} /> :
                    <Icon icon={arrowGoBackFill} className='icon icon-reverse' onClick={() => onReverse()} />}
                <Icon icon={editSolid} className='icon icon-edit' onClick={() => onEdit()} />
                <Icon icon={trashFill} className='icon icon-delete' onClick={() => onDelete()}/>
            </header>
            <div className='task-details'>
                <div className='details-column1'>
                    <p>Type: {taskData.taskType}</p>
                    <p>Creation date: {taskData.creationDate.toDate().toLocaleDateString()}</p>
                </div>
                <div className='details-column2'>
                    <p>Priority: {taskData.taskPriority}</p>
                    <p>Due date: {taskData.dueDate.toDate().toLocaleDateString()}</p>
                </div>
                <div className='details-column3'>
                    <p>State: {taskData.taskState}</p>
                </div>
            </div>
            <p className={taskData.taskState === 'completed' ? 'task-description line-through' : 'task-description'}>{taskData.taskDescription}</p>
        </article>
    )
}