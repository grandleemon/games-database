import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/homepage/Homepage";
import axios from "axios";
import {Provider} from "react-redux";
import store from "./store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                loader: async () => {
                    return await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}`)
                },
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)
