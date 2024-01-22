import { createBrowserRouter, Routes, Route } from 'react-router-dom';
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
import { PrivateRoutes } from './PrivateRoutes';
import { AuthRotes } from './AuthRotes';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // element: <PrivateRoutes component={App} />,
    children: [
      {
        index: true,
        element: <MainContent />,
      },
      {
        path: '/login',
        element: <AuthRotes component={Login} />,
      },
      {
        path: '/registration',
        element: <AuthRotes component={Registration} />,
      },
      {
        path: '/userPageAdministration',
        element: <PrivateRoutes component={UserPageAdministration} />,
      },
      {
        path: '/taskPageAdministration',
        element: <PrivateRoutes component={TaskPageAdministration} />,
      },
      {
        path: '/depsPageAdministration',
        element: <PrivateRoutes component={DepsPageAdministration} />,
      },
      {
        path: '/venchelPageAdministration',
        element: <PrivateRoutes component={VenchelPageAdministration} />,
      },
      {
        path: '/elevator_ae',
        element: <PrivateRoutes component={VenchelPageAdministration} />,
      },
      {
        path: '/elevator_pe',
        element: <PrivateRoutes component={VenchelPageAdministration} />,
      },
      {
        path: '/venchelPageAdministrationV2',
        element: <PrivateRoutes component={VenchelPageAdministrationV2} />,
      },
      {
        path: '/taskPageUser',
        element: <PrivateRoutes component={TaskPageUser} />,
      },
      {
        path: '/docsPageUser',
        element: <PrivateRoutes component={DocsPageUser} />,
      },
    ],
  },
]);

// export const routes = createBrowserRouter([{
//   path: '/',
//   element: <App/>,
//   children: [{
//     index: true,
//     element: <MainContent/>
//   },
//   {
//     path: '/login',
//     element: <Login/>,
//   },
//   {
//     path: '/registration',
//     element: <Registration/>,
//   },
//   {
//     path: '/userPageAdministration',
//     element: <PrivateRoutes component={UserPageAdministration}/>,
//   },  
//   {
//     path: '/taskPageAdministration',
//     element: <TaskPageAdministration/>,
//   },
//   {
//     path: '/depsPageAdministration',
//     element: <DepsPageAdministration />,
//   },
//   {
//     path: '/venchelPageAdministration',
//     element: <VenchelPageAdministration/>,
//   },
//   {
//     path: '/elevator_ae',
//     element: <VenchelPageAdministration/>,
//   },
//   {
//     path: '/elevator_pe',
//     element: <VenchelPageAdministration/>,
//   },
//   {
//     path: '/venchelPageAdministrationV2',
//     element: <VenchelPageAdministrationV2/>,
//   },
//   {
//     path: '/taskPageUser',
//     element: <TaskPageUser />,
//   },
//   {
//     path: '/docsPageUser',
//     element: <DocsPageUser />,
//   },
//   ]
// }])

// const routesMap = [
//   {
//     path: '/',
//     element: <PrivateRoutes component={App} />,
//     children: [
//       {
//         index: true,
//         element: <PrivateRoutes component={MainContent} />,
//       },
//       {
//         path: '/login',
//         element: <PrivateRoutes component={Login} />,
//       },
//     ],
//   },
// ];

// export const routes = createBrowserRouter(
//   <Routes>
//     {routesMap.map((route, index) => (
//       <Route key={index} {...route} />

//     ))}
//   </Routes>
// );

// const routesMap = [
//   {
//     path: '/',
//     element: <PrivateRoutes component={App} />,
//     children: [
//       {
//         index: true,
//         element: <PrivateRoutes component={MainContent} />,
//       },
//       {
//         path: '/login',
//         element: <PrivateRoutes component={Login} />,
//       },
//     ],
//   },
// ];

// export const routes = createBrowserRouter(
//   <Routes>
//     {routesMap.map((route, index) => (
//       <Route
//         key={index}
//         path={route.path}
//         element={route.element}
//       >
//         {route.children && route.children.map((childRoute, childIndex) => (
//           <Route
//             key={childIndex}
//             path={childRoute.path}
//             element={childRoute.element}
//           />
//         ))}
//       </Route>
//     ))}
//   </Routes>
// );