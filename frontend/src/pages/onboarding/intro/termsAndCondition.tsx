import { Link } from "react-router-dom";

const TermsAndConditions = () => {
    return (
        <div>
            <div className="min-h-screen flex justify-center items-center md:bg-[#F0FDF4]">
                <div className="md:w-1/2 md:rounded-xl md:bg-[#FFFFFF] lg:w-lg">
                    <div className="flex flex-col items-center justify-center text-center py-10 md:m-auto">
                        <h1 className="text-3xl text-green-600 font-bold mb-4">PathoLeaf</h1>
                        <p className="mb-10 text-gray-500 text-md font-bold md:mb-8">Our Terms of Service</p>
                        <div className="text-sm w-full px-5 mb-5 text-left md:mb-8 leading-relaxed">
                            <p className="mb-3">
                                Welcome to PathoLeaf AI! Before you continue using our platform, we encourage you to read and understand our <Link to="" className="text-green-600">Terms and Conditions</Link>.</p>
                            <p>These terms outline the rules, guidelines, and legal aspects of using our services to ensure a secure and transparent experience for all users.</p>
                        </div>
                        <div className="p-4 bg-white">
                            <button>
                                <Link to="/signup" className="bg-green-600 text-white rounded-md text-center font-medium cursor-pointer px-10 py-3">
                                    I Agree
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions