
import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import ClickSpark from "../components/ClickSpark.jsx";
import DevFooter from "../sections/dev/DevFooter.jsx";
import DevNavbar from "../sections/dev/DevNavbar.jsx";
function DevelopmentLayout() {

    return (

        <ClickSpark sparkColor={"rgba(38,211,238,0.8)"} sparkRadius={75} sparkSize={10} easing={"easeOutQuad"}>

            <DevNavbar />
            <div className={`z-0 bg-black w-screen min-h-screen overflow-x-hidden`}>
                <Outlet />
            </div>
            <DevFooter choice={"development"} />
        </ClickSpark>
    );
}

// Export as default if this is the primary component for this file
export default DevelopmentLayout;