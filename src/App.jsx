import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Greetings from "./pages/Greetings.jsx";
import Development from "./pages/Development.jsx";
import DataScience from "./pages/DataScience.jsx";
import Navbar from "./sections/Navbar.jsx";

function Layout() {
    const location = useLocation();

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            {/* Show Navbar on all pages except Greetings */}
            {location.pathname !== "/" && <Navbar />}

            <Routes>
                <Route path="/" element={<Greetings />} />
                <Route path="/development" element={<Development />} />
                <Route path="/data-science" element={<DataScience />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}
