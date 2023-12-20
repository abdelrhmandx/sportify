import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Auth } from './pages/Auth';
import { Users } from './pages/Users';
import { Events } from './pages/Events';
import { Playground } from './pages/Playground/list';
import { CreatePlayground } from './pages/Playground/create';
import { Swap } from './pages/Swap';
import { Trainner } from './pages/Trainner/list';
import { CreateTrainner } from './pages/Trainner/create';
import { Home } from './pages/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {

    element: <App />,
    children:[
      {
        path:'/dashboard',
        element: <Home />
      },
      {

        path: "/dashboard/users",
        element: <Users/>,
        
      },
      {
        path: "/dashboard/events",
        element: <Events />,
        
      },
      {
       
        path:"/dashboard/playground/create",
        element :<CreatePlayground />
     
    },
      {
        path: "/dashboard/playground",
        element: <Playground/>,
        
      },

      {
        path: "/dashboard/swap",
        element: <Swap/>,
        
      },
      {
        path: "/dashboard/trainners",
        element: <Trainner/>,
        
      },
      {
        path: "/dashboard/trainners/create",
        element: <CreateTrainner/>,
        
      }
    ]
  },
 
]);


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render( <RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
