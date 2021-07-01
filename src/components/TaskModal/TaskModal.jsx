import { useState } from 'react'
import {database} from '../../Services/Firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function TaskModal ({showModal, setShowModal, user, modalProps}) {

    const [datePickerStartDate, setDatePickerStartDate] = useState(new Date())

    const [taskTittle, setTaskTittle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskPriority, setTaskPriority] = useState(1)
    const [taskType, setTaskType] = useState('work')
    const [taskState, setTaskState] = useState('pending')

    const [displayError, setDisplayError] = useState(false)

    const onSubmit = () => {
        if (taskTittle && taskDescription) {
            database.add({userId: user.uid, taskTittle: taskTittle, taskDescription: taskDescription, taskPriority: taskPriority, taskType: taskType, taskState: taskState, creationDate: new Date(), dueDate: datePickerStartDate})
            setDisplayError(false)
            setShowModal(false)
        } else {
            setDisplayError(true)
        }
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} className='addTaskModal'>
            <Modal.Header closeButton>
                <Modal.Title>{modalProps ? modalProps.taskTittle : 'New task:'}</Modal.Title>
                <button onClick={()=>console.log(modalProps)}>test</button>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className='form-input'>
                        <label for='tittle'>Task tittle</label>
                        <input id='tittle' type='text' placeholder={modalProps ? modalProps.taskTittle : null} onChange={e => setTaskTittle(e.target.value)} />
                    </div>

                    <div className='form-input'>
                        <label for='description'>Task description</label>
                        <textarea id='description' rows='3' cols='33' placeholder={modalProps ? modalProps.taskDescription : null} onChange={e => setTaskDescription(e.target.value)} />
                    </div>
                    
                    <div className='form-input'>
                        <label for='priority'>Priority</label>
                        <select id='priority' onChange={e => setTaskPriority(e.target.value)} >
                            <option value='1' selected={modalProps && '1' === modalProps.taskPriority ? true : false}>1</option>
                            <option value='2' selected={modalProps && '2' === modalProps.taskPriority ? true : false}>2</option>
                            <option value='3' selected={modalProps && '3' === modalProps.taskPriority ? true : false}>3</option>
                        </select>
                    </div>

                    <div className='form-input'>
                        <label for='type'>Type</label>
                        <select id='type' onChange={e => setTaskType(e.target.value)} >
                            <option value='work' selected={modalProps && 'work' === modalProps.taskType ? true : false}>Work</option>
                            <option value='studies' selected={modalProps && 'studies' === modalProps.taskType ? true : false}>Studies</option>
                            <option value='social' selected={modalProps && 'social' === modalProps.taskType ? true : false}>Social</option>
                            <option value='other' selected={modalProps && 'other' === modalProps.taskType ? true : false}>Other</option>
                        </select>
                    </div>

                    <div className='form-input'>
                        <label for='dueDate'>Due date</label>
                        <div>
                            <DatePicker selected={modalProps ? modalProps.dueDate.toDate() : datePickerStartDate} onChange={(date) => setDatePickerStartDate(date)} />
                        </div>
                    </div>

                    <div className='form-input'>
                        <label for='state'>State</label>
                        <select id='state' onChange={e => setTaskState(e.target.value)} >
                            <option value='pending'>Pending</option>
                            <option value='completed'>Completed</option>
                        </select>
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                {displayError ? <p className='errorMsg'>Please complete all fields.</p> : null} 
                <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
                <Button variant='primary' onClick={() => onSubmit()}>{modalProps ? 'Submit changes' : 'Submit'}</Button>
            </Modal.Footer>
        </Modal>
    )
}