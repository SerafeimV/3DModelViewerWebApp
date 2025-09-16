import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";

import 'bootstrap/dist/css/bootstrap.css'
import MainPage from "./pages/MainPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoute from "./components/util/ProtectedRoute.tsx";
import './global.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><MainPage/></ProtectedRoute>,
        errorElement: <NotFoundPage/>
    },
    {
        path: '/app',
        element: <ProtectedRoute><MainPage/></ProtectedRoute>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
