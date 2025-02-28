import cloudImages from "../../../assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    // const [confirmPassword, setConfirmPassword] = useState<string>("");
    // const [passwordWarning, setPasswordWarning] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

    const navigate = useNavigate();

    const resetPassword = () => {
        let valid = true;

        // Validate Email
        if (!newPassword.includes("@") || !newPassword.includes(".")) {
            // setPasswordWarning("");
            valid = false;
        } else {
            // setPasswordWarning("");
        }

        if (valid) {
            setNewPassword("");
            // setConfirmPassword("");
            navigate("/homepage");
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen flex justify-center items-center md:bg-[#F0FDF4]">
            <div className="md:w-1/2 md:rounded-xl md:bg-[#FFFFFF]">
                <div className="flex flex-col items-center justify-center text-center py-10 md:m-auto lg:w-2/3 xl:w-1/2">
                    <h1 className="text-3xl text-green-600 font-bold mb-4">PathoLeaf</h1>
                    <p className="mb-10 text-gray-500 text-md font-medium md:mb-8">Create New Password</p>
                    <p className="mb-10 text-gray-500 text-md font-medium md:mb-8">Your new password must be different from the old password</p>
                    <div className="p-4 bg-white">
                        <div className="mb-5">
                            <label>
                                Password
                            </label>
                            <div className={` w-full flex border border-gray-300 rounded-md ${isPasswordFocused || newPassword ? "border-green-600" : ""}`}>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 focus:outline-none"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                {/* view password icon */}
                                <button onClick={togglePasswordVisibility} className="pr-3">
                                    <img
                                        src={showPassword ? cloudImages.hidePassword : cloudImages.seePassword}
                                        width={25}
                                        height={25}
                                        alt={showPassword ? "Hide password" : "Show password"}
                                    />
                                </button>
                            </div>
                            <div>
                                {/* lock icon */}
                                <button className={`pl-2 border- ${isPasswordFocused || newPassword ? "hidden" : "block"}`}>
                                    <img src={cloudImages.padlock} width={25} height={25} alt="padlock icon" />
                                </button>
                                <p>Must be 8 letters</p>
                            </div>
                            <div>
                                {/* lock icon */}
                                <button className={`pl-2 border- ${isPasswordFocused || newPassword ? "hidden" : "block"}`}>
                                    <img src={cloudImages.padlock} width={25} height={25} alt="padlock icon" />
                                </button>
                                <p>Must include uppercase, lowercase and numbers.</p>
                            </div>
                        </div>
                        <div>
                            <label>Confirm new password</label>
                            <div className={` w-full flex border border-gray-300 rounded-md ${isPasswordFocused || newPassword ? "border-green-600" : ""}`}>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 focus:outline-none"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                {/* view password icon */}
                                <button onClick={togglePasswordVisibility} className="pr-3">
                                    <img
                                        src={showPassword ? cloudImages.hidePassword : cloudImages.seePassword}
                                        width={25}
                                        height={25}
                                        alt={showPassword ? "Hide password" : "Show password"}
                                    />
                                </button>
                            </div>
                        </div>
                        <button
                            className="w-full p-2 bg-green-600 rounded-md text-white"
                            onClick={resetPassword}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;