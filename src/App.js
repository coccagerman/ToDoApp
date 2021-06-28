import './App.scss'
import { useState } from 'react'
import firebase from 'firebase/app'
import {auth} from './Services/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Header from './components/Header/Header'
import TasksContainer from './components/TasksContainer/TasksContainer'
import AddTaskModal from './components/AddTaskModal/AddTaskModal'

function App() {
  
  const [showModal, setShowModal] = useState(false)

  const [user] = useAuthState(auth)

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <div className='App'>
      <Header setShowModal={setShowModal} user={user} />
      {user ? <TasksContainer user={user} /> : <button className='signIn-btn' onClick={() => signInWithGoogle()}>Sign in with Google</button>}
      <AddTaskModal showModal={showModal} setShowModal={setShowModal} user={user} />
    </div>
  )
}

export default App
