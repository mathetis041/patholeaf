import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    // const [isError, setIsError] = useState<boolean>(false); // Track error state
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    // const [isFilled, setIsFilled] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Clear error state on input
        // if (isError) {
        //     setIsError(false);
        // }

        // Only move focus if a value is entered in the current box
        if (value !== "" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        if (!/^\d+$/.test(pastedData)) return; // Ensure only numbers are pasted

        const pastedOtp = pastedData.slice(0, otp.length).split("");
        const newOtp = [...otp];

        pastedOtp.forEach((value, index) => {
            newOtp[index] = value;
        });

        setOtp(newOtp);

        const nextIndex = Math.min(pastedOtp.length, otp.length - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = () => {
        if (otp.some((value) => value === "")) {
            // setIsError(true);// Trigger error if any box is empty
            inputRefs.current[0]?.focus(); //Resetting focus to the firdst input
        } else {
            // setIsFilled(true);
            // setIsError(false);
            navigate("/changepassword");
        }
    };

    const handleResend = () => {
        alert("OTP Resent!");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0FDF4] p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb- text-green-600">Verify OTP</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Enter the 6-digit code sent to your email.
                </p>
                <div className="flex justify-center space-x-2 mb-6">
                    {otp.map((_, index) => (
                        <input
                            aria-label={`OTP digit ${index + 1}`}
                            key={index}
                            type="text"
                            maxLength={1}
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            ref={(el) => {
                                if (el) inputRefs.current[index] = el;
                            }}
                            className="w-12 h-12 text-center text-xl border border-green-600 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
                        />
                    ))}
                </div>
                {/* {isError && (
                    <p className="text-sm text-red-600 text-center">Please fill out all fields.</p>
                )}
                {isFilled && <p className="text-center text-green-600 mt-2">OTP Verified! Redirecting...</p>} */}
                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 rounded-md transition ${otp.every((val) => val !== "") ? "bg-green-600 text-white cursor-pointer" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                    disabled={!otp.every((val) => val !== "")}

                >
                    Submit
                </button>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                        Didn’t receive the code?{" "}
                        <button
                            onClick={handleResend}
                            className="text-green-600 hover:underline"
                        >
                            Resend OTP
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Otp;
