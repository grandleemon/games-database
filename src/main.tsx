import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/homepage/Homepage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: async () => {
            return console.log(import.meta.env.VITE_API_KEY)
        },
        children: [
            {
                path: "",
                element: <Homepage />
            },
            {
                path: "profile",
                element: <>Profile</>
            },
        ]
    },

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
