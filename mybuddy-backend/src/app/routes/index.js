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

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
