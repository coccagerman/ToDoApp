import { useState, useEffect } from 'react'
import {database} from '../../Services/Firebase'
import Task from './Task/Task'

export default function TasksContainer ({user}) {

    const [savedTasks, setSavedTasks ] = useState([])

    const showSavedTasks = () => {

        return database.where("userId", "==", user.uid).onSnapshot(snapshot => {
        const tasksData = []
        snapshot.forEach(task => tasksData.push({ id: task.id, ...task.data() }))
        setSavedTasks(tasksData)
        })
    }

  useEffect(() => showSavedTasks(), [])

    return (
        <section className='tasksContainer'>
            {savedTasks ? savedTasks.map(task => <Task taskData={task} key={task.id}/>) : <h2>Looks like you have nothing to do yet!</h2> }
        </section>
    )
}