import cloudImages from "../../../assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmChangePassword, setConfirmChangePassword] = useState<string>("");
    const [eightLetters, setEightLetters] = useState<boolean>(false);
    const [capitalAlphaNumeric, setCapitalAlphaNumeric] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isNewPasswordFocused, setIsNewPasswordFocused] = useState<boolean>(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState<boolean>(false);
    const [passwordWarning, setPasswordWarning] = useState<string>("");


    const navigate = useNavigate();

    const validatePassword = (password: string) => {
        return {
            hasEightLetters: password.length >= 8,
            hasCapitalAlphaNumeric: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password),
        };
    };


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setNewPassword(password);

        const { hasEightLetters, hasCapitalAlphaNumeric } = validatePassword(password);
        setEightLetters(hasEightLetters);
        setCapitalAlphaNumeric(hasCapitalAlphaNumeric);

        if (passwordWarning) setPasswordWarning("");
    };



    const resetPassword = () => {
        if (!newPassword || !confirmChangePassword) {
            setPasswordWarning("Please fill in both fields.");
            return;
        }

        if (!eightLetters || !capitalAlphaNumeric) {
            setPasswordWarning("Password must be at least 8 characters with uppercase, lowercase, and numbers.");
            return;
        }

        if (newPassword !== confirmChangePassword) {
            setPasswordWarning("Passwords do not match!");
            return;
        }

        // If everything is fine
        setNewPassword("");
        setConfirmChangePassword("");
        setPasswordWarning("");
        alert("Password has been changed");
        navigate("/login");
    };



    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen flex justify-center items-center md:bg-[#F0FDF4]">
            <div className="md:w-1/2 md:rounded-xl md:bg-[#FFFFFF]">
                <div className="flex flex-col items-center justify-center text-center py-10 md:m-auto lg:w-2/3 xl:w-1/2">
                    <h1 className="text-3xl text-green-600 font-bold mb-4">PathoLeaf</h1>
                    <p className="mb-10 text-gray-500 text-md font-medium md:mb-8">Create New Password</p>
                    <p className="mb-5 text-gray-500 text-sm w-3/4 font-medium md:w-full">Your new password must be different from the old password</p>
                    <div className="p-4 bg-white">
                        <div className="mb-8">
                            <label className="float-left mb-3">
                                Enter new password
                            </label>
                            <div className={` w-full flex border border-gray-300 rounded-md mb-3 ${isNewPasswordFocused || newPassword ? "border-green-600" : ""}`}>
                                <input
                                    id="password"
                                    type={showNewPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 focus:outline-none"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    onFocus={() => setIsNewPasswordFocused(true)}
                                    onBlur={() => setIsNewPasswordFocused(false)}
                                />
                                {/* view password icon */}
                                <button type="button" onClick={toggleNewPasswordVisibility} className="pr-3 cursor-pointer">
                                    <img
                                        src={showNewPassword ? cloudImages.hidePassword : cloudImages.seePassword}
                                        width={20}
                                        height={20}
                                        alt={showNewPassword ? "Hide password" : "Show password"}
                                    />
                                </button>
                            </div>
                            {/* condition for having atleast 8 letters */}
                            <div className="flex text-center gap-3 mb-3">
                                <img src={cloudImages.padlock} width={20} height={20} alt="padlock icon" />
                                <p className={`text-sm text-gray-500 ${eightLetters ? "text-green-600" : "text-[#EF4444]"}`}>Must be 8 letters</p>
                            </div>
                            {/* condition foruppercase, lowercase and numbers*/}
                            <div className="flex text-center gap-3">
                                <img src={cloudImages.padlock} width={20} height={20} alt="padlock icon" />
                                <p className={`text-sm text-gray-500 ${capitalAlphaNumeric ? "text-green-600" : "text-[#EF4444]"}`}>uppercase, lowercase and numbers.</p>
                            </div>
                        </div>
                        <div>
                            <label className="float-left mb-3">Confirm new password</label>
                            <div className={` w-full flex border border-gray-300 rounded-md ${isConfirmPasswordFocused || confirmChangePassword ? "border-green-600" : ""}`}>
                                <input
                                    id="password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 focus:outline-none"
                                    value={confirmChangePassword}
                                    onChange={(e) => {
                                        setConfirmChangePassword(e.target.value)
                                        if (passwordWarning) setPasswordWarning("");
                                    }}
                                    onFocus={() => setIsConfirmPasswordFocused(true)}
                                    onBlur={() => setIsConfirmPasswordFocused(false)}
                                />
                                {/* view password icon */}
                                <button type="button" onClick={toggleConfirmPasswordVisibility} className="pr-3 cursor-pointer">
                                    <img
                                        src={showConfirmPassword ? cloudImages.hidePassword : cloudImages.seePassword}
                                        width={20}
                                        height={20}
                                        alt={showConfirmPassword ? "Hide password" : "Show password"}
                                    />
                                </button>
                            </div>
                            {passwordWarning && <p className="text-[#EF4444] text-xs text-center">{passwordWarning}</p>}
                        </div>
                        <button
                            type="button"
                            className="w-full p-2 bg-green-600 rounded-md text-white mt-10 cursor-pointer"
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