
import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import ClickSpark from "../components/ClickSpark.jsx";
import DataNavbar from "../sections/data/DataNavbar.jsx";

function DevelopmentLayout() {

    return (

        <ClickSpark  sparkColor={"rgba(250,204,21,0.8)"} sparkRadius={75} sparkSize={10} easing={"easeOutQuad"}>
<DataNavbar/>
            <div className={`z-0 bg-black w-screen min-h-screen overflow-x-hidden`}>
                <Outlet />
            </div>
        </ClickSpark>
    );
}

// Export as default if this is the primary component for this file
export default DevelopmentLayout;