import './App.scss'
import { useState } from 'react'
import firebase from 'firebase/app'
import {auth} from './Services/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Header from './components/Header/Header'
import TasksContainer from './components/TasksContainer/TasksContainer'
import TaskModal from './components/TaskModal/TaskModal'

function App() {
  
  const [showModal, setShowModal] = useState(false)
  const [modalProps, setModalProps] = useState(null)

  const [user] = useAuthState(auth)

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <div className='App'>
      <Header setShowModal={setShowModal} user={user} setModalProps={setModalProps} />
      {user ? <TasksContainer user={user} setShowModal={setShowModal} setModalProps={setModalProps} /> : <button className='signIn-btn' onClick={() => signInWithGoogle()}>Sign in with Google</button>}
      <TaskModal showModal={showModal} setShowModal={setShowModal} modalProps={modalProps} user={user} />
    </div>
  )
}

export default App
