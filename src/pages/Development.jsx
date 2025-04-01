import Hero from "../sections/Hero.jsx";
import ClickSpark from "../components/ClickSpark.jsx";
import Summary from "../sections/Summary.jsx";
import { useChoice } from "../context/ChoiceContext";
import {useLocation} from "react-router-dom";


export default function Development() {
    const { choice } = useChoice();
    const location = useLocation().pathname;
    console.log(location.slice(1));
    const userChoice = location.slice(1);
    return (
        <ClickSpark  sparkColor={"rgba(38,211,238,0.8)"} sparkRadius={75} sparkSize={10} easing={"easeOutQuad"}>
            <div className={`bg-black max-w-screen min-h-screen overflow-hidden`}>
                <Hero choice={userChoice} />

            </div>
        </ClickSpark>
    )
}