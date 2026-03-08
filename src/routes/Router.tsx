import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import LandingPage from '../pages/LandingPage';
import NotFound from '../pages/NotFound';

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
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}
