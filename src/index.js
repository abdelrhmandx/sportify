import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Auth } from './pages/Auth';
import { Users } from './pages/Users';
import { Events } from './pages/Events';
import Playground from './pages/Playground/list'; // Default import for Playground list
import { CreatePlayground } from './pages/Playground/create';
import { Swap } from './pages/Swap';
import { Trainner } from './pages/Trainner/list';
import { CreateTrainner } from './pages/Trainner/create';
import { Home } from './pages/Home';
import Playgrounds from './pages/Playground/creates'; // Ensure default import here

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    element: <App />,
    children: [
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
        path: "/dashboard/playground/create",
        element: <CreatePlayground />
      },
      {
        path:"/dashboard/playground/creates",
        element: <Playgrounds /> // Corrected import for Playgrounds
      },
      {
        path: "/dashboard/playground",
        element: <Playground/>, // Corrected import for Playground list
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
root.render(<RouterProvider router={router} />);
