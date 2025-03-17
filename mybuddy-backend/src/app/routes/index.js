import express from "express";
import { ProjectRoutes } from "../modules/project/project.routes.js";
import { MemberRoutes } from "../modules/member/member.routes.js";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { PostRoutes } from "../modules/post/post.routes.js";
import { FriendRequestRoutes } from "../modules/friendRqst/friendRequest.routes.js";
import{ProjectJoinRequestRoutes} from "../modules/projectJoinRequest/projectJoinRequest.routes.js";
import { PaymentIntentRoutes } from "../modules/payment/paymentIntent.routes.js";
import { SingleMemberSocialInfoRoutes } from "../modules/socialInformation/socialInformation.routes.js";
import { SingleMemberSkillRoutes } from "../modules/skills/skills.routes.js";
import { LicenseRoutes } from "../modules/licence/license.routes.js";
import { ExperienceRoutes } from "../modules/experience/experience.routes.js";
import { CommitRoutes } from "../modules/commit/commit.routes.js";
import { FundRequestRoutes } from "../modules/fundProposal/fundProposal.routes.js";
import { MeetingRoutes } from "../modules/meeting/meeting.routes.js";
import { PostReactRoutes } from "../modules/PostReact/PostReact.routes.js";
import { PaypalInfoRoutes } from "../modules/paypalInfo/paypalInfo.routes.js";
import { PayoneerInfoRoutes } from "../modules/payoneerInfo/payoneerInfo.routes.js";
import { PaypalFundInfoRoutes } from "../modules/paypalfund/paypalfund.routes.js";
import { PayoneerFundInfoRoutes } from "../modules/payoneerfund/payoneerfund.routes.js";
import { BankTransferFundInfoRoutes  } from "../modules/banktransferfund/bankTransferfund.routes.js";
import { AdminBankInfoRoutes } from "../modules/adminBankInfo/adminBankInfo.routes.js";
import { AdminToolsRoutes } from "../modules/tools/tools.routes.js";
import { UsersToolsRoutes } from "../modules/usersTools/usersTools.routes.js";
import { ConferenceLinkRoutes } from "../modules/conference/conference.routes.js";
import { TutorialsRoutes } from "../modules/tutorials/tutorials.routes.js";
import { TodoRoutes } from "../modules/todo/todo.router.js";
import { ProjectTodoRoutes } from "../modules/project-todo/projectTodo.router.js";

const router = express.Router();
const moduleRoutes = [
    { path: "/project", route: ProjectRoutes },
    { path: "/member", route: MemberRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/posts", route: PostRoutes },
    { path:"/friend", route:FriendRequestRoutes},
    { path:"/project-join-request", route:ProjectJoinRequestRoutes},
    { path:"/payment", route:PaymentIntentRoutes},
    { path:"/socialInfo", route:SingleMemberSocialInfoRoutes},
    { path:"/skill", route:SingleMemberSkillRoutes},
    { path:"/license", route:LicenseRoutes},
    { path:"/experience", route:ExperienceRoutes},
    { path:"/commit", route:CommitRoutes},
    { path:"/fund", route:FundRequestRoutes},
    { path:"/meeting", route:MeetingRoutes},
    { path:"/PostReact", route:PostReactRoutes},
    { path:"/paypal", route:PaypalInfoRoutes},
    { path:"/payoneer", route:PayoneerInfoRoutes},
    { path:"/paypalFund", route:PaypalFundInfoRoutes},
    { path:"/payoneerFund", route:PayoneerFundInfoRoutes},
    { path:"/bankTransferFund", route:BankTransferFundInfoRoutes},
    { path:"/adminBankInfo", route:AdminBankInfoRoutes},
    { path:"/adminTools", route:AdminToolsRoutes},
    { path:"/userTools", route:UsersToolsRoutes},
    { path:"/conference", route:ConferenceLinkRoutes},
    { path:"/tutorials", route:TutorialsRoutes},
    { path:"/todo", route:TodoRoutes},
    { path:"/project-todo", route:ProjectTodoRoutes}
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
