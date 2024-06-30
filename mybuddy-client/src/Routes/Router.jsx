import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../Pages/Homepage/Homepage";
import Feed from "../Pages/Feed/Feed";
import ProjectDetails from "../Pages/ProjectDetails/ProjectDetails";
import GDashboard from "../Pages/GeneralDashboard/GDashboard/GDashboard";
import GeneralLayout from "../Layout/GeneralLayout";
import GeneralFriendRequest from "../Pages/GeneralDashboard/GeneralFriendRequest/GeneralFriendRequest";
import GeneralAllProject from "../Pages/GeneralDashboard/GeneralAllProject/GeneralAllProject";
import AddProject from "../Pages/GeneralDashboard/GeneralAddProject/AddProject";
import GeneralAddProject from "../Pages/GeneralDashboard/GeneralAddProject/GeneralAddProject";
import GeneralMeetingSchedule from "../Pages/GeneralDashboard/GeneralMeetingSchedule/GeneralMeetingSchedule";
import GeneralFundProposal from "../Pages/GeneralDashboard/GeneralFundProposal/GeneralFundProposal";
import CalenderPage from "../Pages/GeneralDashboard/GeneralMeetingSchedule/CalenderPage";
import Sign from "../Pages/SignUp/Sign";
import Login from "../Pages/Login/Login";
import Try from '../Pages/Try/Try'
import HomepageLayout from "../Layout/HomepageLayout";
import UserProfileLayout from "../Layout/UserProfileLayout";
import FindProjectPage from "../Pages/FindProject/FindProjectPage";
import UserProfileVM from "../Pages/UserProfile/ViewMode/UserProfileVM";
import UserProfileEM from "../Pages/UserProfile/EditMode/UserProfileEM";
import GeneralRequestSent from "../Pages/GeneralDashboard/GeneralRequest/GeneralRequestSent";
import GeneralRequestRecieve from "../Pages/GeneralDashboard/GeneralRequest/GeneralRequestRecieve";
import Academic from "../Pages/AcademicPage/Academic";




const router = createBrowserRouter([
    {
        path: "/",
        element: <HomepageLayout />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
           
            {
                path: '/find-projects',
                element: <ProjectDetails />
            }, 
          
            
            
        ]
    },
    {
        path: "/find/",
        element: <MainLayout />,
        children: [
            {
                path: '/find/project',
                element: <FindProjectPage />
            },
            {
                path: '/find/researcher',
                element: <Feed />
            },
            {
                path: '/find/academic',
                element: <Academic/>  
            }
        ]
    },
    {
        path: "/user/",
        element: <UserProfileLayout />,
        children: [
           {
                path:"/user/profile/:id",
                element:<UserProfileVM/>,
                

            },
           {
                path:"/user/edit-profile",
                element:<UserProfileEM/>
            }
            
        ]
    },
    {
        path:"/dashboard",
        element:<GeneralLayout/>,
        children:[
            {
                path:"/dashboard/",
                element:<GDashboard/>
            },
            {
                path:"/dashboard/sent-request",
                element:<GeneralRequestSent/>
            },
            {
                path:"/dashboard/recieve-request",
                element:<GeneralRequestRecieve/>
            },
            {
                path:"/dashboard/friend-request",
                element:<GeneralFriendRequest/>
            },
            {
                path:"/dashboard/all-projects",
                element:<GeneralAllProject/>
            },
            {
                path:"/dashboard/create-projects",
                element:<AddProject/>
            },
            {
                path:"/dashboard/create-project",
                element:<GeneralAddProject/>
            },
            {
                path:"/dashboard/meeting-schedule",
                element:<GeneralMeetingSchedule/>
            },
            {
                path:"/dashboard/fund-proposal",
                element:<GeneralFundProposal/>
            },
            {
                path:"/dashboard/meeting-s",
                element:<CalenderPage/>
            },
            {
                path: '/dashboard/test',
                element: <Try />
            }, 
        ]
    },

    {
        path: '/sign',
        element: <Sign/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/try',
        element: <Try/>
    },
 
]);


export default router;