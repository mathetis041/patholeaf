import cloudImages from "../../../assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [isMailFocused, setIsMailFocused] = useState<boolean>(false);
    const [forgotMail, setForgotMail] = useState<string>("");
    const [mailWarning, setMailWarning] = useState<string>("");

    const navigate = useNavigate();

    const handleForgotPassword = () => {
        let valid = true;

        // Validate Email
        if (!forgotMail.includes("@") || !forgotMail.includes(".")) {
            setMailWarning("Enter a proper email");
            valid = false;
        } else {
            setMailWarning("");
        }

        if (valid) {
            setForgotMail("");
            navigate("/otp")
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center md:bg-[#F0FDF4]">
            <div className="md:w-1/2 md:rounded-xl md:bg-[#FFFFFF]">
                <div className="flex flex-col items-center justify-center text-center py-10 md:m-auto lg:w-2/3 xl:w-1/2">
                    <h1 className="text-3xl text-green-600 font-bold mb-4">PathoLeaf</h1>
                    <p className="mb-10 text-gray-500 text-md font-medium md:mb-8">Forgot Password?</p>
                    <div className="p-4 bg-white">
                        {/* Email section */}
                        <div className="mb-10">
                            <div className={`relative w-full flex items-center border border-gray-300 rounded-md ${isMailFocused || forgotMail ? "border-green-600" : ""}`}>
                                <button className={`absolute left-2 ${isMailFocused || forgotMail ? "hidden" : "block"}`}>
                                    <img src={cloudImages.mail} width={20} height={20} alt="email icon" />
                                </button>
                                {/* Label for mail */}
                                <label
                                    className={`absolute left-8 text-gray-400 transition-all duration-200 ${isMailFocused || forgotMail
                                        ? "text-xs -top-3 left-2 px-2 text-green-600 bg-white"
                                        : "text-base top-2"
                                        }`}
                                    htmlFor="forgotMail"
                                >
                                    Email Address
                                </label>

                                {/* Input field mail*/}
                                <input
                                    id="forgotMail"
                                    type="email"
                                    className="w-full px-3 py-2 focus:outline-none rounded-md"
                                    value={forgotMail}
                                    onChange={(e) => setForgotMail(e.target.value)}
                                    onFocus={() => setIsMailFocused(true)}
                                    onBlur={() => setIsMailFocused(false)}
                                />
                            </div>
                            {mailWarning && <p className="text-[#EF4444] text-xs text-left">{mailWarning}</p>}
                        </div>
                        <button
                            className="w-full p-2 bg-green-600 rounded-lg text-white mb-10"
                            onClick={handleForgotPassword}
                        >
                            Send OTP
                        </button>
                        <p className="text-green-600 text-center font-bold cursor-pointer">
                            <Link to="/login">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword