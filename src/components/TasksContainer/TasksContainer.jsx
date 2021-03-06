import { useState, useEffect } from 'react'
import {database} from '../../Services/Firebase'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SearchBar from './SearchBar/SearchBar'
import SortingOptions from './SortingOptions/SortingOptions'
import Task from './Task/Task'
import LazyCat from '../../assets/lazyCat.jpeg'

export default function TasksContainer ({user, setShowModal, setModalProps}) {

    const [savedTasks, setSavedTasks ] = useState([])
    const [searchParams, setSearchParams] = useState(null)
    const filteredSavedTasks = savedTasks.filter(task => (task.taskTittle.toLowerCase().includes(searchParams)))

    const [sortParams, setSortParams ] = useState('creationDate')
    const [sortOrientantionDown, setSortOrientantionDown ] = useState(true)

    const showSavedTasks = () => {
        return database.where("userId", "==", user.uid).onSnapshot(snapshot => {
            const tasksData = []
            snapshot.forEach(task => tasksData.push({ id: task.id, ...task.data() }))
            setSavedTasks(tasksData.sort(function(a,b){
                return new Date(b.creationDate.toDate()) - new Date(a.creationDate.toDate())
            }))
        })
    }

    const sortTasks = (sortParams, sortOrientantionDown) => {
        if (sortParams === 'creationDate' && sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => new Date(b.creationDate.toDate()) - new Date(a.creationDate.toDate()))) }
        else if (sortParams === 'creationDate' && !sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => new Date(a.creationDate.toDate()) - new Date(b.creationDate.toDate()))) }
        else if (sortParams === 'dueDate' && sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => new Date(b.dueDate.toDate()) - new Date(a.dueDate.toDate()))) }
        else if (sortParams === 'dueDate' && !sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => new Date(a.dueDate.toDate()) - new Date(b.dueDate.toDate()))) }
        else if (sortParams === 'priority' && sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => parseInt(a.taskPriority) - parseInt(b.taskPriority))) }
        else if (sortParams === 'priority' && !sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => parseInt(b.taskPriority) - parseInt(a.taskPriority))) }
        else if (sortParams === 'state' && sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => a.taskState > b.taskState ? 1 : a.taskState < b.taskState ? -1 : 0)) }
        else if (sortParams === 'state' && !sortOrientantionDown) { setSavedTasks(savedTasks.sort((a,b) => a.taskState > b.taskState ? -1 : a.taskState < b.taskState ? 1 : 0)) }
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return

        const items = Array.from(savedTasks)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
    
        setSavedTasks(items)
    }

    useEffect(() => showSavedTasks(), [])
    useEffect(() => sortTasks(sortParams, sortOrientantionDown), [sortParams, sortOrientantionDown])

    return (
        <section className='tasksContainer'>
            <SearchBar setSearchParams={setSearchParams} />
            <SortingOptions sortParams={sortParams} setSortParams={setSortParams} sortOrientantionDown={sortOrientantionDown} setSortOrientantionDown={setSortOrientantionDown} />
            <p>sortParams: {sortParams}</p>
            <p>sortOrientantionDown: {sortOrientantionDown ? 'true' : 'false'}</p>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='tasks'>
                    {(provided) => (
                        savedTasks.length === 0 ? 
                            <div className='nothingToDo'>
                                <h2>Looks like you have nothing to do yet.</h2>
                                <img src={LazyCat} alt='Lazy cat' className='lazyCat' />                
                            </div> : 
                            <ul className='tasksList' {...provided.droppableProps} ref={provided.innerRef}>{(searchParams ? filteredSavedTasks : savedTasks).map((task, index) => 
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}><Task taskData={task} setShowModal={setShowModal} setModalProps={setModalProps} /></li>
                                    )}
                                </Draggable>
                                )}
                                {provided.placeholder}
                            </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}