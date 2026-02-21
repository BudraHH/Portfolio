import { SECTIONS } from "../utils/constants";
import { Education } from "./Education";
import { Experience } from "./Experience";

export function Career() {
    return (
        <section id={SECTIONS.CAREER} className="">
            <Experience />
            <Education />
        </section>
    );
}