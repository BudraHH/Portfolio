import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import GlobalWelcome from "../pages/Welcome.jsx";
import DevRouter from "../dev-theme/routes/DevRouter.jsx";
import NormalRouter from "../normal-theme/routes/NormalRouter.jsx";
import NotFound from "../pages/error/NotFound.jsx";

import { NORMAL_ROUTES } from "../normal-theme/routes/routes.js";
import { DEV_ROUTES } from "../dev-theme/routes/devRoutes.js";

const AppRouter = () => {
    const navigate = useNavigate();

    const handleThemeSelect = (theme) => {
        if (theme === 'dev') {
            navigate(DEV_ROUTES.FULL_WELCOME);
        } else {
            navigate(NORMAL_ROUTES.FULL_ROOT);
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route
                path="/welcome"
                element={<GlobalWelcome onSelectTheme={handleThemeSelect} />}
            />
            <Route path="/dev-theme/*" element={<DevRouter />} />
            <Route path={`${NORMAL_ROUTES.ROOT}/*`} element={<NormalRouter />} />
            {/* Fallback route - directs back to welcome if no match found (optional, but good practice) */}
            {/* <Route path="*" element={<Navigate to="/welcome" replace />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
