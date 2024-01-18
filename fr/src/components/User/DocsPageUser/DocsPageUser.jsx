import { MainMenuUser } from '../MainMenuUser/MainMenuUser'
import './DocsPageUser.css'
import { DocsTestForm } from './DocsTestForm/DocsTestForm'

export const DocsPageUser = () => {
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