import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import HomePage from "./pages/homePage";
import EventsCalendar from "./pages/eventsCalendar";
import CreateCoursesPage from "./pages/createCoursesPage";
import ForgotPassword from "./pages/forgotPasswordPage";
import ResetPassword from "./pages/resetPassword";
import NewPassword from "./pages/newPassword";
import CourseDetailPage from "./pages/courseDetails";
import PostsPage from "./pages/postsPage";
import ProtectedRoute from "./pages/protectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>

<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/courses" element={<CreateCoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/events" element={<EventsCalendar />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={5000} />
    </>
    
  );
}
export default App;
