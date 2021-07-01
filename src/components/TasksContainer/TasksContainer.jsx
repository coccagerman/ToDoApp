import { useState, useEffect } from 'react'
import {database} from '../../Services/Firebase'
import Task from './Task/Task'
import SearchBar from './SearchBar/SearchBar'

export default function TasksContainer ({user, setShowModal, setModalProps}) {

    const [savedTasks, setSavedTasks ] = useState([])

    const showSavedTasks = () => {

        return database.where("userId", "==", user.uid).onSnapshot(snapshot => {
        const tasksData = []
        snapshot.forEach(task => tasksData.push({ id: task.id, ...task.data() }))
        setSavedTasks(tasksData.sort(function(a,b){
            return new Date(b.creationDate.toDate()) - new Date(a.creationDate.toDate())
          }))
        })
    }

  useEffect(() => showSavedTasks(), [])

    return (
        <section className='tasksContainer'>
            <SearchBar/>
            <div className='sortingOptions'>
                <h3>Sort by:</h3>
                <button>Creation date</button>
                <button>Due date</button>
                <button>Priority</button>
                <button>State</button>
            </div>
            {savedTasks ? savedTasks.map(task => <Task taskData={task} key={task.id} setShowModal={setShowModal} setModalProps={setModalProps} />) : <h2>Looks like you have nothing to do yet!</h2> }
        </section>
    )
}