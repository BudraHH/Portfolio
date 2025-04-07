
import {useLocation} from "react-router-dom";
import Hero from "../sections/Hero.jsx";
import ClickSpark from "../components/ClickSpark.jsx";
import Summary from "../sections/Summary.jsx";
import Skills from "../sections/Skills.jsx";
import AboutMe from "../sections/AboutMe.jsx";
import QuickInfo from "../sections/QuickInfo.jsx";



export default function Development() {
    const location = useLocation().pathname;
    // console.log(location.slice(1));
    const userChoice = location.slice(1);
    console.log(userChoice);

    return (
        <ClickSpark  sparkColor={"rgba(38,211,238,0.8)"} sparkRadius={75} sparkSize={10} easing={"easeOutQuad"} >
            <div className={`z-0 bg-black max-w-screen min-h-screen overflow-hidden`}>
                <Hero choice={userChoice} />
                <Skills choice={userChoice} />
                <Summary choice={userChoice} />


            </div>
        </ClickSpark>
    )
}