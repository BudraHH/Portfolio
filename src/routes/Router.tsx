import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PortfolioApp from '../PortfolioApp';
import App from '../App';
import LandingPage from '../pages/LandingPage';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <PortfolioApp />,
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

