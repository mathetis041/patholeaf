import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timer, setTimer] = useState<number>(0); // Timer for resend OTP

    const navigate = useNavigate();

    useEffect(() => {
        let countdown: ReturnType<typeof setInterval>;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);


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
            inputRefs.current[0]?.focus(); //Resetting focus to the firdst input
        } else {
            navigate("/changepassword");
        }
    };

    const handleResend = () => {
        setTimer(60); // Start 1-minute timer
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
                            className={`hover:underline ${timer > 0 ? "text-gray-500 cursor-not-allowed" : "cursor-pointer text-green-600"}`}
                            disabled={timer > 0}
                        >
                            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Otp;
