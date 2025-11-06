import profile_image from "../assets/dp.jpeg";
import TypedText from "../components/TypedText.jsx";
import { useState } from "react";

export default function Hero() {
    const [showSecondTyped, setShowSecondTyped] = useState(false);
    const [showThirdTyped, setShowThirdTyped] = useState(false);

    const handleFirstTypedComplete = () => setShowSecondTyped(true);
    const handleSecondTypedComplete = () => setShowThirdTyped(true);

    return (
        <section className="relative w-screen h-screen p-16">
            {/* Background Overlay */}

            {/* Main box */}
            <div className="w-full h-full flex flex-row justify-between items-center bg-gradient-to-r from-white/5 to-black border border-white/20 backdrop-blur-3xl rounded-2xl animate-fade-in-slow">
                {/* Left section */}
                <div className="p-16 w-full h-full flex flex-col justify-center items-start rounded-2xl">
                    <code className="text-xl font-normal text-white/70">
                        <TypedText
                            strings={["Hey there, I am"]}
                            showCursor={false}
                            loop={false}
                            startDelay={200}
                            onComplete={handleFirstTypedComplete}
                            showCursorAfterEnd={false}
                            typeSpeed={50}
                        />
                    </code>

                    <h1
                        className={`text-7xl font-bold text-white
                            transition-opacity duration-500`}
                        style={{opacity: showSecondTyped ? 1 : 0}}
                    >
                        {showSecondTyped && (
                            <TypedText
                                strings={["Hari Hara"]}
                                showCursorBeforeStart={false}
                                startDelay={0}
                                loop={false}
                                showCursor={false}
                                showCursorAfterEnd={false}
                                onComplete={handleSecondTypedComplete}
                            />
                        )}{" "}
                        {showThirdTyped && (
                            <span className="text-cyan-600">
                                <TypedText
                                    strings={["Budra"]}
                                    showCursorBeforeStart={false}
                                    startDelay={0}
                                    loop={false}
                                    showCursorAfterEnd={true}
                                />
                            </span>
                        )}
                    </h1>
                </div>
                {/* Right section (profile image) */}
                <div className="w-full h-full flex items-center justify-center rounded-2xl">
                    <img
                        src={profile_image}
                        alt="Profile Image"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>

        </section>
    );
}
