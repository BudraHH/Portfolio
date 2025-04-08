
import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import ClickSpark from "../components/ClickSpark.jsx";
import Footer from "../sections/dev/Footer.jsx";
import Navbar from "../sections/dev/Navbar.jsx";
function DevelopmentLayout() {

    return (

        <ClickSpark sparkColor={"rgba(38,211,238,0.8)"} sparkRadius={75} sparkSize={10} easing={"easeOutQuad"}>

            <Navbar />
            <div className={`z-0 bg-black w-screen min-h-screen overflow-x-hidden`}>
                <Outlet />
            </div>
            <Footer choice={"development"} />
        </ClickSpark>
    );
}

// Export as default if this is the primary component for this file
export default DevelopmentLayout;