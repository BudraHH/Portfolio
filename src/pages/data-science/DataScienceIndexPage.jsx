import Hero from "../../sections/Hero.jsx";
import ClickSpark from "../../components/ClickSpark.jsx";
import Summary from "../../sections/Summary.jsx";

import Skills from "../../sections/dev/Skills.jsx";
import {useLocation} from "react-router-dom";


export default function DataScienceIndexPage() {
    const location = useLocation().pathname;
    // console.log(location.slice(1));
    const userChoice = location.slice(1);
    console.log(userChoice);
    return (
        <ClickSpark  sparkColor={"rgba(250,204,21,0.8)"} sparkRadius={75} sparkSize={10} easing={"easeOutQuad"}>
            <div className={`bg-black max-w-screen min-h-screen overflow-hidden`}>
                <Hero choice={userChoice} />
                <Skills choice={userChoice} />
                <Summary choice={userChoice} />
            </div>
        </ClickSpark>
    )
}