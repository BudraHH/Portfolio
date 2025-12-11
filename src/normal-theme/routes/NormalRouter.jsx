import { Routes, Route } from "react-router-dom";
import BasePage from "../pages/BasePage.jsx";

const NormalRouter = () => {
    return (
        <Routes>
            <Route path="/:sectionId?" element={<BasePage />} />
        </Routes>
    );
};

export default NormalRouter;
