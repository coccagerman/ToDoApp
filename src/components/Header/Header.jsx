import { Icon } from '@iconify/react'
import addAlt from '@iconify-icons/carbon/add-alt'
import { auth } from '../../Services/Firebase'

export default function Header ({setShowModal, user, setModalProps}) {

    return (
        <header className='app-header'>
            <h1>ToDoApp</h1>

            {user ? <div className='container'>
                        <img className='user-img' src={auth.currentUser.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='User'/>
                        <button onClick={() => auth.signOut()}>Sign out</button>
                    </div> :
            null}

            <Icon icon={addAlt} className='icon' onClick={() => {setModalProps(null); setShowModal(true)}} />
        </header>
    )
}