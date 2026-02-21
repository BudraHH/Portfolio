import { SECTIONS } from "../utils/constants";
import { EducationCertification } from "./EducationCertification";
import { Experience } from "./Experience";

export function Career() {
    return (
        <section id={SECTIONS.CAREER} className="">
            <Experience />
            <EducationCertification />
        </section>
    );
}