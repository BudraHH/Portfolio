import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import InternalWelcome from "../pages/DevWelcome.jsx";
import GUI from "../pages/GUI.jsx";
import { DEV_ROUTES } from "./devRoutes.js";

const DevRouter = () => {
    const navigate = useNavigate();

    const handleDevWelcomeComplete = (show) => {
        if (show) {
            navigate(DEV_ROUTES.FULL_DESKTOP);
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to={DEV_ROUTES.WELCOME} replace />} />
            <Route
                path={DEV_ROUTES.WELCOME}
                element={<InternalWelcome setShowGUI={handleDevWelcomeComplete} />}
            />
            <Route
                path={DEV_ROUTES.DESKTOP}
                element={<GUI />}
            />
        </Routes>
    );
};

export default DevRouter;
