import { useState } from 'react'
import {database} from '../../Services/Firebase'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function AddTaskModal ({showModal, setShowModal, user}) {

    const [datePickerStartDate, setDatePickerStartDate] = useState(new Date())

    const [taskTittle, setTaskTittle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskPriority, setTaskPriority] = useState(1)
    const [taskType, setTaskType] = useState('work')
    const [taskState, setTaskState] = useState('notStarted')

    const addNewTask = () => {
        database.add({userId: user.uid, taskTittle: taskTittle, taskDescription: taskDescription, taskPriority: taskPriority, taskType: taskType, taskState: taskState, creationDate: new Date(), dueDate: datePickerStartDate})
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} className='addTaskModal'>
            <Modal.Header closeButton>
                <Modal.Title>New task:</Modal.Title>
                <button onClick={()=>console.log(user.uid)}>test</button>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className='form-input'>
                        <label for='tittle'>Task tittle</label>
                        <input id='tittle' type='text' onChange={e => setTaskTittle(e.target.value)} />
                    </div>

                    <div className='form-input'>
                        <label for='description'>Task description</label>
                        <textarea id='description' rows='3' cols='33' onChange={e => setTaskDescription(e.target.value)} />
                    </div>
                    
                    <div className='form-input'>
                        <label for='priority'>Priority</label>
                        <select id='priority' onChange={e => setTaskPriority(e.target.value)} >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                        </select>
                    </div>

                    <div className='form-input'>
                        <label for='type'>Type</label>
                        <select id='type' onChange={e => setTaskType(e.target.value)} >
                            <option value='work'>Work</option>
                            <option value='studies'>Studies</option>
                            <option value='social'>Social</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>

                    <div className='form-input'>
                        <label for='dueDate'>Due date</label>
                        <div>
                            <DatePicker selected={datePickerStartDate} onChange={(date) => setDatePickerStartDate(date)} />
                        </div>
                    </div>

                    <div className='form-input'>
                        <label for='state'>State</label>
                        <select id='state' onChange={e => setTaskState(e.target.value)} >
                            <option value='notStarted'>Not started</option>
                            <option value='started'>Started</option>
                            <option value='completed'>Completed</option>
                        </select>
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
                <Button variant='primary' onClick={() => {setShowModal(false); addNewTask()}}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}