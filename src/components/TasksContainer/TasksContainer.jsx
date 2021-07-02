import { useState, useEffect } from 'react'
import {database} from '../../Services/Firebase'
import SearchBar from './SearchBar/SearchBar'
import SortingOptions from './SortingOptions/SortingOptions'
import Task from './Task/Task'
import LazyCat from '../../assets/lazyCat.jpeg'

export default function TasksContainer ({user, setShowModal, setModalProps}) {

    const [savedTasks, setSavedTasks ] = useState([])

    const [searchParams, setSearchParams] = useState(null)
    const filteredSavedTasks = savedTasks.filter(task => (task.taskTittle.toLowerCase().includes(searchParams)))

    const [sortParams, setSortParams ] = useState('creationDate')

    const showSavedTasks = () => {

        return database.where("userId", "==", user.uid).onSnapshot(snapshot => {
        const tasksData = []
        snapshot.forEach(task => tasksData.push({ id: task.id, ...task.data() }))
        setSavedTasks(tasksData.sort(function(a,b){
            return new Date(b.creationDate.toDate()) - new Date(a.creationDate.toDate())
          }))
        })
    }

    const sortTasks = () => {
        console.log('tasks sorted')
    }

    useEffect(() => showSavedTasks())
    useEffect(() => sortTasks(), [sortParams])

    return (
        <section className='tasksContainer'>
            <SearchBar setSearchParams={setSearchParams} />
            <SortingOptions sortParams={sortParams} setSortParams={setSortParams} />

            {savedTasks.length !== 0 ? (searchParams ? filteredSavedTasks : savedTasks).map(task => <Task taskData={task} key={task.id} setShowModal={setShowModal} setModalProps={setModalProps} />) : 
            <div className='nothingToDo'>
                <h2>Looks like you have nothing to do yet.</h2>
                <img src={LazyCat} alt='Lazy cat' className='lazyCat' />                
            </div>
            }
        </section>
    )
}