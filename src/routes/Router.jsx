import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import GlobalWelcome from "../pages/Welcome.jsx";
import DevRouter from "../dev-theme/routes/DevRouter.jsx";
import NormalRouter from "../normal-theme/routes/NormalRouter.jsx";
import NotFound from "../pages/error/NotFound.jsx";

import { GLOBAL_ROUTES, NORMAL_ROUTES, DEV_ROUTES } from "../constants/routes.js";

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
            <Route path={GLOBAL_ROUTES.ROOT} element={<Navigate to={GLOBAL_ROUTES.WELCOME} replace />} />
            <Route
                path={GLOBAL_ROUTES.WELCOME}
                element={<GlobalWelcome onSelectTheme={handleThemeSelect} />}
            />
            <Route path={`${DEV_ROUTES.ROOT}/*`} element={<DevRouter />} />
            <Route path={`${NORMAL_ROUTES.ROOT}/*`} element={<NormalRouter />} />
            {/* Fallback route - directs back to welcome if no match found (optional, but good practice) */}
            {/* <Route path={GLOBAL_ROUTES.NOT_FOUND} element={<Navigate to={GLOBAL_ROUTES.WELCOME} replace />} /> */}
            <Route path={GLOBAL_ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
