import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from '../App';
import LandingPage from '../pages/LandingPage';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                children: [
                    {
                        index: true,
                        element: <LandingPage />,
                    },
                ],
            },
            {
                path: '/portfolio/*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}
