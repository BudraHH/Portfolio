import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// --- Layouts / Pages ---
import DevelopmentLayout from "./pages/DevelopmentLayout.jsx";

// --- Route Elements ---
import Greetings from "./pages/Greetings.jsx";
import DevelopmentIndexPage from "./pages/development/DevelopmentIndexPage.jsx";
import DevAboutPage from "./pages/development/DevAboutPage.jsx";
import ProjectsPage from "./pages/development/DevProjects.jsx";
import DataScienceIndexPage from "./pages/data-science/DataScienceIndexPage.jsx";
import DataScienceLayout from "./pages/DataScienceLayout.jsx";

// --- Main App Component ---
export default function App() {
    return (
        <BrowserRouter>
            <div className={`overflow-x-hidden`}>
                <Routes>
                    <Route path="/" element={<Greetings />} />

                    <Route path="/development" element={<DevelopmentLayout />}>
                        <Route index element={<DevelopmentIndexPage />} />
                        <Route path="about" element={<DevAboutPage />} />
                        <Route path="projects" element={<ProjectsPage />} />
                    </Route>

                    <Route path="/data-science" element={<DataScienceLayout />} >
                        <Route index element={<DataScienceIndexPage/>}/>
                    </Route>

                    <Route path="*" element={
                        <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
                            <h1 className="text-3xl font-mono">404 - Page Not Found</h1>
                        </div>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}