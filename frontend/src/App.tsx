import ChangePassword from "./pages/onboarding/forgotPassword/changePassword";
import ForgotPassword from "./pages/onboarding/forgotPassword/forgotPassword";
import Homepage from "./pages/homepage/homepage";
import IntroPage from "./pages/onboarding/intro/introPage";
import Login from "./pages/onboarding/logIn/login";
import Otp from "./pages/onboarding/otp/otp";
import SignUp from "./pages/onboarding/signUp/signup";
import TermsAndConditions from "./pages/onboarding/intro/termsAndCondition";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/" element={<IntroPage />} />
      </Routes>
    </Router>
  );
}

export default App;
