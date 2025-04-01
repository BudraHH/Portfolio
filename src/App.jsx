import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Greetings from "./pages/Greetings.jsx";
import Development from "./pages/Development.jsx";
import DataScience from "./pages/DataScience.jsx";
import Navbar from "./sections/Navbar.jsx";
import { ChoiceProvider } from "./context/ChoiceContext";

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
            <ChoiceProvider>
                <Layout />
            </ChoiceProvider>
        </BrowserRouter>
    );
}


//
// {`
// `}<span className="text-cyan-400">class</span> <span className="text-white">Developer</span> {"{"} <br/>
// &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">String</span> devName = <span className="text-cyan-300">"Hari Hara Budra"</span>;<br/>
// &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">String</span> domain = <span className="text-cyan-300">"Development"</span>;<br/><br/>
//
// &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">void</span> build() {"{"} <br/>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Crafting seamless experiences, one function at a time."</span>);<br/>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Specialized in scalable backends, optimized databases, and smooth front-end interactions."</span>);<br/>
// &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/><br/>
//
// &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-200">void</span> innovate() {"{"} <br/>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Writing efficient algorithms and architecting full-stack applications."</span>);<br/>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">System.out.println</span>(<span className="text-cyan-300">"Bringing ideas to life through clean, maintainable, and high-performance code."</span>);<br/>
// &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/>
// {"}"}
