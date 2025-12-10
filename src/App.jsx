import GlobalWelcome from "./pages/Welcome.jsx";
import InternalWelcome from "./dev-theme/pages/DevWelcome.jsx";
import GUI from "./dev-theme/pages/GUI.jsx";
import {useState} from "react";

// Wrapper for the Dev Theme Flow (Boot -> GUI)
const DevThemeRoot = () => {
    const [showGUI, setShowGUI] = useState(false);
    return !showGUI ? (
        <InternalWelcome setShowGUI={setShowGUI} />
    ) : (
        <GUI />
    );
};

function App() {
    const [activeTheme, setActiveTheme] = useState(null); // null (Welcome), 'dev', 'normal'

    const handleThemeSelect = (theme) => {
        setActiveTheme(theme);
    };

    return (
        <div className="App overflow-hidden h-screen w-screen bg-black">
            {!activeTheme ? (
                <GlobalWelcome onSelectTheme={handleThemeSelect} />
            ) : activeTheme === 'dev' ? (
                <DevThemeRoot />
            ) : (
                <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Standard Portfolio</h1>
                        <p className="text-gray-400">Coming Soon...</p>
                        <button
                            onClick={() => setActiveTheme(null)}
                            className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;
