import { motion } from "framer-motion";
import profileImage from "../assets/dp.jpeg";

export default function Hero() {
    return (
        <div className="h-[100vh] w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-20 lg:px-32 overflow-x-hidden">

            {/* Left Section - Development Focused Introduction */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2 text-center md:text-left space-y-4"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                    Hey, I'm <span className="text-cyan-400">Hari Hara Budra</span> 👨‍💻
                </h1>
                <p className="text-lg md:text-xl text-white/80">
                    Passionate <span className="text-cyan-400 font-semibold">Full-Stack Developer</span> with a strong focus on
                    building high-performance applications, scalable architectures, and seamless user experiences.
                </p>
                <p className="text-md md:text-lg text-white/70">
                    Experienced in frontend design and development, backend optimizations, database management.
                    Always exploring new technologies to enhance efficiency and push boundaries in web development.
                </p>
                <p className="text-md md:text-lg text-white/60">
                    Driven by clean code, best practices, and a problem-solving mindset.
                    Whether it's crafting robust APIs, designing interactive frontends, or optimizing databases—I'm all in!
                </p>
                <a
                    href="/resume.pdf"
                    download
                    className="mt-4 inline-block bg-cyan-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-cyan-300 transition duration-300"
                >
                    📄 Download Resume
                </a>
            </motion.div>


            {/* Right Section - Profile Image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2 flex justify-center"
            >
                <img
                    src={profileImage}
                    alt="Hari Hara Budra"

                />
            </motion.div>
        </div>
    );
}