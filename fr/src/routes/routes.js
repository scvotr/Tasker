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
import { VenchelPageAdministrationV2 } from '../components/Administration/VenchelPageAdministrationV2/VenchelPageAdministrationV2';
import { DocsPageUser } from '../components/User/DocsPageUser/DocsPageUser';

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
    path: '/elevator_ae',
    element: <VenchelPageAdministration/>,
  },
  {
    path: '/elevator_pe',
    element: <VenchelPageAdministration/>,
  },
  // ---------------------------------------------
  {
    path: '/venchelPageAdministrationV2',
    element: <VenchelPageAdministrationV2/>,
  },
    // ---------------------------------------------
  {
    path: '/taskPageUser',
    element: <TaskPageUser />,
  },
  {
    path: '/docsPageUser',
    element: <DocsPageUser />,
  },
]
}])