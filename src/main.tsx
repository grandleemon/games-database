import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Home";
import {Provider} from "react-redux";
import store from "./store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Game from "./pages/Game";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Homepage />
            },
            {
                path: "profile",
                element: <>Profile</>
            },
            {
                path: 'games/:id',
                element: <Game />
            }
        ]
    },

]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
      </QueryClientProvider>
  </React.StrictMode>
)
