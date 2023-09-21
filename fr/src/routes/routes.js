import { createBrowserRouter } from 'react-router-dom';
import { MainContent } from '../components/MainPageLayouts/MainContent/MainContent';
import { Login } from '../components/Authtorization/Login/Login';
import { Registration } from '../components/Authtorization/Registration/Registration';
import { UserPageAdministration } from '../components/Administration/UserPageAdministration/UserPageAdministration'
import { TaskPageAdministration } from '../components/Administration/TaskPageAdministration/TaskPageAdministration';
import { TaskPageUser } from '../components/User/TaskPageUser/TaskPageUser';
import App from '../App';
import { VenchelPageAdministration } from '../components/Administration/VenchelPageAdministration/VenchelPageAdministration';
import { DepsPageAdministration } from '../components/Administration/DepsPageAdministration/DepsPageAdministration'


export const routes = createBrowserRouter([{
  path: '/',
  element: <App/>,
  children: [{
    index: true,
    element: <MainContent/>
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/registration',
    element: <Registration/>,
  },
  {
    path: '/userPageAdministration',
    element: <UserPageAdministration />,
  },
  {
    path: '/taskPageAdministration',
    element: <TaskPageAdministration/>,
  },
  {
    path: '/depsPageAdministration',
    element: <DepsPageAdministration />,
  },
  {
    path: '/venchelPageAdministration',
    element: <VenchelPageAdministration/>,
  },
  {
    path: '/taskPageUser',
    element: <TaskPageUser />,
  },
]
}])