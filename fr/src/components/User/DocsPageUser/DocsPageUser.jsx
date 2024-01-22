import { useAuthContext } from '../../../context/AuthProvider'
import { MainMenuUser } from '../MainMenuUser/MainMenuUser'
import './DocsPageUser.css'
import { DocsTestForm } from './DocsTestForm/DocsTestForm'

export const DocsPageUser = () => {
  const currentUser = useAuthContext()

  if (!currentUser.login) {
    return null; // Если currentUser.login не существует, вернуть null (ничего не отображать)
  }
  
  return(
    <div className='user-docs-page'>
      <MainMenuUser />
      <div className='user-docs-page__body'>
        <div className='user-docs-page__container'>
          <DocsTestForm/>
        </div>
      </div>
    </div>
  )
}