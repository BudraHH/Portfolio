import { motion } from "framer-motion";
import SpotlightCard from "../components/SpotlightCard";
import ClickSpark from "../components/ClickSpark.jsx";
import { Link } from "react-router-dom";

export default function Greetings() {


    const expertiseAreas = [
        { area: 'Development', color: "rgba(38,211,238,0.8)", link: "/development"},
        { area: 'Data Science', color: "rgba(250,204,21,0.8)", link: "/data-science" },
    ];



    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-10 md:p-20 overflow-hidden bg-black" aria-label="Landing-Page">

            <motion.div
                initial={{ opacity: 0, scale: 1.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="relative z-20 w-full md:h-full p-10 md:p-14 lg:p-16 flex flex-col justify-center items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl text-center"
            >

                <motion.h2
                    initial={{opacity:0, y:50}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 md:mb-6 text-left md:text-center">
                    Welcome to My Space!
                </motion.h2>

                <motion.p
                    initial={{opacity:0, y:50}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                    className="text-sm sm:text-xl md:text-2xl text-white/80 mb-4 lg:mb-8 w-full md:w-4/5 lg:w-3/4 text-left lg:text-center">
                    Hey there! I'm <span className=" bg-gradient-to-r from-cyan-400 via-white to-yellow-400 text-transparent bg-clip-text font-bold">Hari Hara Budra</span>,
                    passionate about <span className="text-cyan-400 font-semibold">Development</span> and
                    <span className="text-yellow-400 font-semibold"> AI & Data Science</span>.
                    I love <span className="text-cyan-300 font-semibold">building impactful digital experiences</span> and
                    <span className="text-yellow-300 font-semibold"> unlocking insights from data</span>.
                    Let’s push boundaries and create something extraordinary together!
                </motion.p>



                <motion.p
                    initial={{opacity:0, y:50}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                    className="mb-2 md:mb-4 lg:mb-6 text-left lg:text-center text-sm md:text-lg lg:text-xl text-white/50">
                    I'd love to know more about you! What's your background?
                </motion.p>


                <div
                    className="w-full md:w-10/12 md:h-full lg:w-11/12 flex flex-col lg:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
                    {expertiseAreas.map((item, index) => (

                            <motion.div
                                initial={{opacity:0, y:50}}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 * index + 1.5, ease: "easeOut" }}
                                className={`z-20 cursor-pointer w-full h-full`}
                                key={index}
                            >
                                <Link to={item.link} key={index}><SpotlightCard  className={`h-full flex justify-center items-center font-semibold text-sm md:text-xl lg:text-2xl bg-white/5 border border-white/5 `} spotlightColor={item.color}>
                                    {item.area}
                                </SpotlightCard>
                                </Link>
                            </motion.div>

                    ))}
                </div>

                <div
                    className="absolute inset-0 flex flex-col lg:flex-row">
                    <ClickSpark sparkColor={"rgba(38,211,238,0.8)"}/>
                    <ClickSpark sparkColor={"rgba(250,204,21,0.8)"}/>
                </div>

            </motion.div>
            <div
                className="z-10 absolute inset-0 text-center">
                <ClickSpark/>
            </div>


            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className=" absolute inset-0 text-center  p-20 flex items-center justify-center bg-transparent"
            >
                <h1 className="font-extrabold text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] leading-none text-center text-white bg-transparent">
                    HARI HARA BUDRA
                </h1>
            </motion.div>
        </div>
    );
}
