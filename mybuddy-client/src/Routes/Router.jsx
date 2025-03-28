import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../Pages/Homepage/Homepage";
import Feed from "../Pages/Feed/Feed";
import GDashboard from "../Pages/GeneralDashboard/GDashboard/GDashboard";
import GeneralLayout from "../Layout/GeneralLayout";
import GeneralFriendRequest from "../Pages/GeneralDashboard/GeneralFriendRequest/GeneralFriendRequest";
import GeneralAllProject from "../Pages/GeneralDashboard/GeneralAllProject/GeneralAllProject";
import AddProject from "../Pages/GeneralDashboard/GeneralAddProject/AddProject";
import GeneralAddProject from "../Pages/GeneralDashboard/GeneralAddProject/GeneralAddProject";
import GeneralMeetingSchedule from "../Pages/GeneralDashboard/GeneralMeetingSchedule/GeneralMeetingSchedule";
import GeneralFundProposal from "../Pages/GeneralDashboard/GeneralFundProposal/GeneralFundProposal";
//import CalenderPage from "../Pages/GeneralDashboard/GeneralMeetingSchedule/CalenderPage";
import Sign from "../Pages/SignUp/Sign";
import Login from "../Pages/Login/Login";
import Try from "../Pages/Try/Try";
import HomepageLayout from "../Layout/HomepageLayout";
import UserProfileLayout from "../Layout/UserProfileLayout";
//import FindProjectPage from "../Pages/FindProject/FindProjectPage";
import FindProject from "../Pages/FindProject/FindProject";
import UserProfileVM from "../Pages/UserProfile/ViewMode/UserProfileVM";
import UserProfileEM from "../Pages/UserProfile/EditMode/UserProfileEM";
import GeneralRequestSent from "../Pages/GeneralDashboard/GeneralRequest/GeneralRequestSent";
import GeneralRequestRecieve from "../Pages/GeneralDashboard/GeneralRequest/GeneralRequestRecieve";
import Academic from "../Pages/AcademicPage/Academic";
import EmailVarification from "../Pages/Email/EmailVarification";
import VerificationSuccess from "../Pages/Email/VerificationSuccess";
import AddTaskForm from "../Pages/Try/AddTaskForm";
import GeneralProjectDetails from "../Pages/GeneralDashboard/GeneralProjectDetails/GeneralProjectDetails";
import ResetPassword from "../Pages/Login/ResetPassword";
import Friends from "../Pages/UpcomingPages/Friends";
import Meeting from "../Pages/UpcomingPages/Meeting";
import PaymentSuccess from "../Pages/FindProject/PaymentSuccess.jsX";
import PaymentFailed from "../Pages/FindProject/PaymentFailed";
import MeetingForm from "../Pages/GeneralDashboard/GeneralMeetingSchedule/MeetingForm";
import Attendence from "../Pages/GeneralDashboard/GeneralMeetingSchedule/Attendence";
import Pre from "../Pages/GeneralDashboard/GeneralMeetingSchedule/Pre";
import PrivateRoute from "../Context/PrivateRoute";
import SettingForm from "../Pages/GeneralDashboard/Setting/SettingForm";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../Pages/Admin/AdminDashboard/AdminDashboard";
import AdminAllProject from "../Pages/Admin/AdminAllProject/AdminAllProject";
import AdminAllUser from "../Pages/Admin/AdminAllUser/AdminAllUser";
import AdminAllFund from "../Pages/Admin/AdminAllFund/AdminAllFund";
import AdminLogin from "../Pages/Admin/AdminLogin/AdminLogin";
import AdminSetting from "../Pages/Admin/AdminSetting/AdminSetting";
import AdminTools from "../Pages/Admin/AdminCreateTools/AdminTools";
import AdminAllTool from "../Pages/Admin/AdminAllTool/AdminAllTool";
import GeneralMyTools from "../Pages/GeneralDashboard/GeneralMyTools/GeneralMyTools";
import GeneralAllPost from "../Pages/GeneralDashboard/GeneralAllPost/GeneralAllPost";
import LandingPage from "../Pages/Landing/LandingPage";
import Help from "../Pages/Help/Help";
import LandingLayout from "../Layout/LandingLayout";
import AdminConference from "../Pages/Admin/AdminConference/AdminConference";
import AdminTutorials from "../Pages/Admin/AdminTutorials/AdminTutorials";
import Agent from "../Pages/ResearchBuddyAgent/Agent";
import GeneralToDo from "../Pages/GeneralDashboard/GeneralToDo/GeneralToDo";
import CreateTodo from "../Pages/GeneralDashboard/GeneralToDo/CreateTodo";
import TermsCondition from "../Pages/CommonPages/TermsCondition";
import About from "../Pages/CommonPages/About";
import Contact from "../Pages/CommonPages/Contact";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage /> ,
      },
   
      
    ],
  },
  {
    path: "/feed",
    element: <HomepageLayout />,
    children: [
      {
        path: "/feed",
        element: <Homepage /> ,
      },

      
    ],
  },
  {
    path: "/find/",
    element: <MainLayout />,
    children: [
      {
        path: "/find/project",
        element: <FindProject />,
      },
      {
        path: "/find/researcher",
        element: <Feed />,
      },
      {
        path: "/find/academic",
        element: <Academic />,
      },
    ],
  },
  {
    path: "/user/",
    element: <UserProfileLayout />,
    children: [
      {
        path: "/user/profile/:id",
        element: <UserProfileVM />,
      },
      {
        path: "/user/edit-profile",
        element: <UserProfileEM />,
      },
      {
        path: "/user/friend",
        element: <Friends />,
      },
      {
        path: "/user/meeting",
        element: <Meeting />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <GeneralLayout />,
    children: [
      {
        path: "/dashboard/",
        element: <GDashboard />,
      },
      {
        path: "/dashboard/sent-request",
        element: <GeneralRequestSent />,
      },
      {
        path: "/dashboard/recieve-request",
        element: <GeneralRequestRecieve />,
      },
      {
        path: "/dashboard/friend-request",
        element: <GeneralFriendRequest />,
      },
      {
        path: "/dashboard/all-projects",
        element: <GeneralAllProject />,
      },
      {
        path: "/dashboard/create-projects",
        element: <AddProject />,
      },
      {
        path: "/dashboard/create-project",
        element: <GeneralAddProject />,
      },
      {
        path: "/dashboard/all-post",
        element: <GeneralAllPost />,
      },
      {
        path: "/dashboard/my-todo",
        element: <GeneralToDo />,
      },
      {
        path: "/dashboard/create-todo",
        element: <CreateTodo/>,
      },
      {
        path: "/dashboard/meeting-schedule",
        element: <GeneralMeetingSchedule />,
      },
      {
        path: "/dashboard/fund-proposal",
        element: <GeneralFundProposal />,
      },
      {
        path: "/dashboard/my-tools",
        element: <GeneralMyTools />,
      },
      {
        path: "/dashboard/setting",
        element: <SettingForm />,
      },
      {
        path: "/dashboard/meeting",
        element: <MeetingForm />,
      },
      {
        path: "/dashboard/details/:id",
        element: <GeneralProjectDetails />,
        loader: ({ params }) => fetch(`https://test-two-22w0.onrender.com/api/v1/project/getProjectById/${params.id}`)
      },
      {
        path: "/dashboard/test",
        element: <Try />,
      },
    ],
  },
  {
    path: "/admin/:id",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/:id",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/:id/all-project",
        element: <AdminAllProject />,
      },
      {
        path: "/admin/:id/all-user",
        element: <AdminAllUser />,
      },
      {
        path: "/admin/:id/all-fund",
        element: <AdminAllFund />,
      },
      {
        path: "/admin/:id/tutorials",
        element: <AdminTutorials />,
      },
      {
        path: "/admin/:id/project-details/:id",
        element: <GeneralProjectDetails />,
        loader: ({ params }) => fetch(`https://test-two-22w0.onrender.com/api/v1/project/getProjectById/${params.id}`)
      },
      {
        path: "/admin/:id/setting",
        element: <AdminSetting />,
      },
      {
        path: "/admin/:id/tools",
        element: <AdminTools />,
      },
      {
        path: "/admin/:id/all-tools",
        element: <AdminAllTool />,
      },
      {
        path: "/admin/:id/set-conference",
        element: <AdminConference />,
      },
    
      // {
      //   path: "/dashboard/details/:id",
      //   element: <GeneralProjectDetails />,
      //   loader: ({ params }) => fetch(`https://test-two-22w0.onrender.com/api/v1/project/getProjectById/${params.id}`)
      // },
     
    ],
  },

  {
    path: "/sign-up",
    element: <Sign />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/only-for-admin-login-route",
    element: <AdminLogin />,
  },
  {
    path: "/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/funding-failed",
    element: <PaymentFailed />,
  },
  {
    path: "/verify-your-email",
    element: <EmailVarification />,
  },
  {
    path: "/pre?meetingId:id",
    element: <PrivateRoute>
 <Pre />

    </PrivateRoute>,
  },
  {
    path: "/agent",
    element: <Agent />,
  },
  {
    path: "/attendance",
    element: <Attendence />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verified-email/:token",
    element: <VerificationSuccess />,
  },
 
  {
    path: "/try",
    element: <Try />,
  },
  {
    path: "/help",
    element: <Help/>,
  },
  {
    path: "/terms&conditions",
    element: <TermsCondition/>,
  },
  {
    path: "/about-us",
    element: <About/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  
  {
    path: "/test",
    element: <AddTaskForm />,
  },
]);

export default router;
