import cloudImages from "../../../assets";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const IntroPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user has already visited
        const hasVisited = localStorage.getItem("hasVisited");

        if (hasVisited) {
            navigate("/signup"); // Redirect if they have already seen the introPage
        } else {
            localStorage.setItem("hasVisited", "true"); // Mark as visited
        }
    }, [navigate]);


    return (
        <div className="bg-green-600 flex items-center justify-center min-h-screen">
            <motion.div
                className="px-10 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <motion.img
                    src="../../../../favicon.png"
                    alt="application Icon"
                    className="w-40 h-40 mb-7"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />
                <motion.h1
                    className="text-white text-4xl mb-7 font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    PathoLeaf AI
                </motion.h1>
                <motion.p
                    className="text-white text-lg mb-7"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    Empowering Farmers with AI Powered Crop Disease Detection
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                >
                    <Link
                        to="/termsandconditions"
                        className="bg-white flex p-3 gap-3 rounded-md text-green-600 font-extrabold cursor-pointer"
                    >
                        <p>Get Started</p>
                        <img src={cloudImages.rightArrow} alt="getting started" />
                    </Link>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default IntroPage;
