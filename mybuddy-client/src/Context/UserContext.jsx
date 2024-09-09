import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGetAllUsersQuery, useGetSingleUserQuery, useUpdateCoverPicMutation, useUpdateProfilePicMutation, useUpdateUserInfoMutation } from "../features/auth/authApi";
import { useSelector } from "react-redux";
import { useGetSingleUserPostQuery } from "../features/post/postApi";
import { useCreateNewTaskMutation, useDeleteProjectMutation, useDeleteTaskMutation, useGetAllProjectByUserQuery, useUpdateProjectInfoMutation } from "../features/project/projectApi";
import {
  useAddSkillsMutation,
  useGetSingleUserSkillQuery,
  useUpdateSkillsMutation,
} from "../features/skill/skillApi";
import {
  useAddSocialInfoMutation,
  useGetSingleUserSocialInfoQuery,
  useUpdateSocialInfoMutation,
} from "../features/social-info/socialInfoApi";
import {
  useAddLicenseMutation,
  useGetUserLicenseQuery,
  useUpdateLicenseMutation,
} from "../features/license/licenseApi";
import {
  useAddExperienceMutation,
  useGetUserExperienceQuery,
  useUpdateExperienceMutation,
} from "../features/experience/experienceApi";
import { useDeleteProjectByRequestedByMutation, useGetAllAcceptedProjectByRequestedByQuery, useGetAllAcceptedProjectByRequestedToQuery, useGetAllProjectByRequestedByQuery, useGetAllProjectByRequestedToQuery, useGetAllSentProjectJoinRequestQuery } from "../features/projectJoinRequest/projectJoinRequestApi";
import { useCreateNewRequestMutation, useDeleteFriendRequestMutation, useGetAcceptedFriendRequestQuery, useGetAllSentPendingFriendRequestQuery, useGetAllStatusFriendRequestQuery, useGetFriendRequestQuery } from "../features/friend/friendApi";
import { useCreateCommitMutation, useGetAllCommitQuery } from "../features/commit/commitApi";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  //************************************************************************************************************** */
  //********************************************     GET   ******************************************************* */
  //************************************************************************************************************** */

  //-------------- get each user info
  const {
    data: singleUser,
    isLoading: isFetchingUser,
    error: userError,
  } = useGetSingleUserQuery(userId, { skip: !userId });

  //-------------- get all user
  const {
    data: getAllUsers,
    isLoading: isFetchingAllUsers,
    error: allUserError,
  } = useGetAllUsersQuery(userId, { skip: !userId });




  //-------------- get each user's post
  const {
    data: getUserPost,
    isLoading: isFetchingPost,
    error: postError,
  } = useGetSingleUserPostQuery(userId, { skip: !userId });
  console.log("p", getUserPost);

  //-------------- get each user's project
  const {
    data: getAllProjectByUser,
    isLoading: isFetchingProject,
    error: projectError,
  } = useGetAllProjectByUserQuery(userId, { skip: !userId });

  //-------------- get each user's skill
  const {
    data: getAllSkillByUser,
    isLoading: isFetchingSkill,
    error: skillError,
  } = useGetSingleUserSkillQuery(userId, { skip: !userId });

  //-------------- get each user's social info
  const {
    data: getSingleUserSocialInfo,
    isLoading: isFetchingSocialInfo,
    error: socialInfoError,
  } = useGetSingleUserSocialInfoQuery(userId, { skip: !userId });

  //-------------- get each user's license
  const {
    data: getUserLicense,
    isLoading: isFetchingLicense,
    error: licenseError,
  } = useGetUserLicenseQuery(userId, { skip: !userId });

  //-------------- get each user's experience
  const {
    data: getUserExperience,
    isLoading: isFetchingExperience,
    error: experienceError,
  } = useGetUserExperienceQuery(userId, { skip: !userId });


  //------------- get all sent project request
  const { data: getAllSentProjectJoinRequest, isLoading: isFetchingGetAllSentProjectJoinRequest, error: getAllSentProjectJoinRequestError } =
  useGetAllSentProjectJoinRequestQuery(userId, { skip: !userId });

  //------------- get sent project request
  const { data: allSentRequest, isLoading: isFetchingSentPJRequest, error: sentPJError } =
    useGetAllProjectByRequestedByQuery(userId, { skip: !userId });


  //------------- get recieve project request
  const { data: allRecieveRequest, isLoading: isFetchingRecievePJRequest, error: recievePJError} =
    useGetAllProjectByRequestedToQuery(userId, { skip: !userId });

  //------------- get accepted recieve project request to
  const { data: allAcceptedRecieveRequest, isLoading: isFetchingAcceptedRecievePJRequest, error: recieveAcceptedPJError} =
  useGetAllAcceptedProjectByRequestedToQuery(userId, { skip: !userId });


  //------------- get accepted recieve project request by
  const { data: allAcceptedSentRequest, isLoading: isFetchingAcceptedSentPJRequest, error: sentAcceptedPJError} =
  useGetAllAcceptedProjectByRequestedByQuery(userId, { skip: !userId });

  //------------- get All Status FriendRequest request by
  const { data: getAllStatusFriendRequest, isLoading: isFetchingGetAllStatusFriendRequest, error: getAllStatusFriendRequestError} =
  useGetAllStatusFriendRequestQuery(userId, { skip: !userId });
  
  //------------- get pending  FriendRequest request by
  const { data: getAllSentPendingFriendRequest, isLoading: isFetchingGetAllSentPendingFriendRequest, error: getAllSentPendingFriendRequestError} =
  useGetAllSentPendingFriendRequestQuery(userId, { skip: !userId });



  //------------- get pending friend request
  const { data: getFriendRequest, isLoading: isFetchingGetFriendRequest, error: getFriendRequestError } =
  useGetFriendRequestQuery(userId, { skip: !userId });

  //------------- get pending friend request
  const { data: getAcceptedFriendRequest, isLoading: isFetchingAcceptedFriendRequest, error: acceptedFriendRequestError } =
  useGetAcceptedFriendRequestQuery(userId, { skip: !userId });

  //------------- get pending friend request
  const { data: getAllCommit, isLoading: isFetchingGetAllCommit, error: getAllCommitError } =
 useGetAllCommitQuery(userId, { skip: !userId });



  //************************************************************************************************************** */
  //********************************************     POST   ******************************************************* */
  //************************************************************************************************************** */


  
  
  //-------------- post skill of specific user
  const [
    addSkills,
    { data: responseAddSkillData, isFatchingAddSkill, error: addSkillError },
  ] = useAddSkillsMutation();

  //-------------- post task in project

  const [ createNewTask,
    {data:responseAddTaskData, isFatchingAddTask,error:addTaskError}
  ] = useCreateNewTaskMutation()

  //-------------- post social information of specific user
  const [
    addSocialInfo,
    { isFatchingAddsocialInfo, error: addsocialInfoError },
  ] = useAddSocialInfoMutation();

  //-------------- post license of specific user
  const [addLicense, { isFatchingAddLicense, error: addLicenseError }] =
    useAddLicenseMutation();

  //-------------- post experience of specific user
  const [
    addExperience,
    { isFatchingAddExperience, error: addExperienceError },
  ] = useAddExperienceMutation();


  //-------------- post friend request
  const [
    createNewRequest,
    { isFatchingCreateNewRequest, error: createNewRequestError },
  ] = useCreateNewRequestMutation();

  //-------------- post commit
  const [
    createCommit,
    { isFatchingCreateCommit, error: createCommitError },
  ] = useCreateCommitMutation();

  //************************************************************************************************************** */
  //********************************************     PUT   ******************************************************* */
  //************************************************************************************************************** */

  // ---------- update user skill
  const [
    updateSkills,
    { isUpdateSkillLoading, error: responseUpdateSkillError },
  ] = useUpdateSkillsMutation();

  // ---------- update user skill
  const [
    updateSocialInfo,
    { isUpdateSocialInfoLoading, error: responseUpdateSocialInfoError },
  ] = useUpdateSocialInfoMutation();

  // ---------- update user license
  const [
    updateLicense,
    { isUpdateLicenseLoading, error: responseUpdateLicenseError },
  ] = useUpdateLicenseMutation();


  // ---------- update user experience
  const [
    updateExperience,
    { isUpdateExperienceLoading, error: responseUpdateExperienceError },
  ] = useUpdateExperienceMutation();


  // ---------- update user cover pic
  const [
    updateCoverPic,
    { isUpdateCoverPicLoading, error: responseUpdateCoverPicError },
  ] = useUpdateCoverPicMutation();


  // ---------- update user cover pic
  const [
    updateProfilePic,
    { isUpdateProfilePicLoading, error: responseUpdateProfilePicError },
  ] = useUpdateProfilePicMutation();


  // ---------- update user INFO
  const [
    updateUserInfo,
    { isUpdateUserInfoLoading, error: responseUpdateUserInfoError },
  ] = useUpdateUserInfoMutation();


  //---------- update project

    const [
      updateProjectInfo,
      { isUpdateProjectLoading, error: responseUpdateProjectError },
    ] = useUpdateProjectInfoMutation();

  //************************************************************************************************************** */
  //********************************************     DELETE   ******************************************************* */
  //************************************************************************************************************** */

  //------------- delete project
  
    const [
      deleteProject,
      { isdeletingProjectLoading, error: repsponseDeleteProjectError },
    ] = useDeleteProjectMutation();

  //------------- delete task
  
    const [
      deleteTask,
      { isDeleteTaskLoading, error: repsponseDeleteTaskError },
    ] = useDeleteTaskMutation();

  //------------- delete team member
  
    const [
      deleteTeamMember,
      { isDeleteTeamMemberLoading, error: repsponseDeleteTeamMemberError },
    ] = useDeleteProjectByRequestedByMutation();

  //------------- delete friend request
  
    const [
      deleteFriendRequest,
      { isDeleteFriendRequestLoading, error: repsponseDeleteFriendRequestError },
    ] = useDeleteFriendRequestMutation();

  //************************************************************************************************************** */
  //********************************************    FETCH DATA   ************************************************* */
  //************************************************************************************************************** */

  useEffect(() => {
    if (
      isFetchingUser ||
      isFatchingAddTask ||
      isFetchingAllUsers ||
      isFetchingPost ||
      isFetchingProject ||
      isFetchingSkill ||
      isFatchingCreateCommit ||
      isFatchingAddSkill ||
      isFatchingAddsocialInfo ||
      isFetchingSocialInfo ||
      isUpdateSocialInfoLoading ||
      isUpdateSkillLoading ||
      isFatchingAddLicense ||
      isFetchingLicense ||
      isFetchingGetAllStatusFriendRequest ||
      isUpdateLicenseLoading ||
      isFetchingExperience ||
      isFatchingAddExperience ||
      isUpdateExperienceLoading ||
      isUpdateProjectLoading ||
      isUpdateCoverPicLoading ||
      isFetchingGetAllCommit||
      isUpdateUserInfoLoading ||
      isUpdateProfilePicLoading ||
      isFetchingSentPJRequest ||
      isFetchingRecievePJRequest ||
      isFatchingCreateNewRequest ||
      isFetchingGetFriendRequest ||
      isFetchingAcceptedFriendRequest ||
      isFetchingAcceptedSentPJRequest ||
      isdeletingProjectLoading||
      isDeleteTaskLoading ||
      isDeleteTeamMemberLoading ||
      isFetchingGetAllSentPendingFriendRequest ||
      isDeleteFriendRequestLoading ||
      isFetchingGetAllSentProjectJoinRequest
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    isFetchingUser,
    isFatchingAddTask,
    isFetchingAllUsers,
    isFetchingPost,
    isFetchingProject,
    isFetchingAcceptedRecievePJRequest,
    isFetchingSkill,
    isFatchingAddSkill,
    isFatchingAddsocialInfo,
    isFetchingGetAllStatusFriendRequest,
    isFatchingCreateCommit,
    isFetchingSocialInfo,
    isUpdateSocialInfoLoading,
    isUpdateSkillLoading,
    isFetchingExperience,
    isFetchingGetAllCommit,
    isFatchingAddExperience,
    isUpdateExperienceLoading,
    isUpdateCoverPicLoading,
    isUpdateProfilePicLoading,
    isUpdateProjectLoading,
    isUpdateUserInfoLoading,
    isFetchingSentPJRequest,
    isFetchingRecievePJRequest,
    isFatchingCreateNewRequest,
    isFetchingGetFriendRequest,
    isFetchingAcceptedFriendRequest,
    isFetchingAcceptedSentPJRequest,
    isdeletingProjectLoading,
    isDeleteTaskLoading,
    isDeleteTeamMemberLoading,
    isFetchingGetAllSentPendingFriendRequest,
    isDeleteFriendRequestLoading,
    repsponseDeleteFriendRequestError,
    isFetchingGetAllSentProjectJoinRequest
  ]);

  //************************************************************************************************************** */
  //********************************************    FETCH ERROR   ************************************************* */
  //************************************************************************************************************** */

  useEffect(() => {
    if (
      userError ||
      addTaskError ||
      allUserError ||
      postError ||
      projectError ||
      recieveAcceptedPJError||
      skillError ||
      addsocialInfoError ||
      socialInfoError ||
      responseUpdateSkillError ||
      responseUpdateSocialInfoError ||
      isFetchingAcceptedRecievePJRequest ||
      sentAcceptedPJError||
      responseUpdateLicenseError ||
      addLicenseError ||
      licenseError ||
      getAllCommitError ||
      experienceError ||
      createCommitError||
      addExperienceError ||
      responseUpdateExperienceError ||
      responseUpdateCoverPicError ||
      responseUpdateProfilePicError ||
      getAllStatusFriendRequestError||
      responseUpdateUserInfoError ||
      responseUpdateProjectError ||
      recievePJError ||
      createNewRequestError ||
      getFriendRequestError ||
      acceptedFriendRequestError||
      repsponseDeleteTaskError ||
      repsponseDeleteTeamMemberError ||
      getAllSentPendingFriendRequestError ||
      repsponseDeleteFriendRequestError ||
      getAllSentProjectJoinRequestError 
    ) {
      console.error("Error fetching user data:", {
        userError,
        addTaskError,
        allUserError,
        postError,
        projectError,
        recieveAcceptedPJError,
        skillError,
        addSkillError,
        createCommitError,
        getSingleUserSocialInfo,
        responseUpdateSkillError,
        responseUpdateSocialInfoError,
        responseUpdateLicenseError,
        addLicenseError,
        responseUpdateProjectError,
        sentAcceptedPJError,
        licenseError,
        getAllCommitError,
        experienceError,
        addExperienceError,
        responseUpdateExperienceError,
        responseUpdateCoverPicError, 
        responseUpdateProfilePicError ,
        responseUpdateUserInfoError ,
        sentPJError,
        recievePJError,
        createNewRequestError,
        getFriendRequestError,
        acceptedFriendRequestError,
        repsponseDeleteProjectError,
        repsponseDeleteTaskError,
        repsponseDeleteTeamMemberError,
        getAllStatusFriendRequestError,
        getAllSentPendingFriendRequestError,
        repsponseDeleteFriendRequestError,
        getAllSentProjectJoinRequestError 
      });
    }
  }, [
    userError,
    addTaskError,
    allUserError,
    postError,
    projectError,
    recieveAcceptedPJError,
    skillError,
    addsocialInfoError,
    socialInfoError,
    responseAddSkillData,
    responseUpdateSkillError,
    responseUpdateLicenseError,
    addLicenseError,
    licenseError,
    experienceError,
    addExperienceError,
    responseUpdateExperienceError,
    responseUpdateCoverPicError ,
    responseUpdateProfilePicError ,
    responseUpdateUserInfoError ,
    sentPJError,
    recievePJError,
    createNewRequestError,
    getFriendRequestError,
    acceptedFriendRequestError,
    repsponseDeleteProjectError,
    repsponseDeleteTaskError,
    repsponseDeleteTeamMemberError,
    getAllStatusFriendRequestError,
    getAllSentPendingFriendRequestError,
    repsponseDeleteFriendRequestError,
    getAllSentProjectJoinRequestError 
  ]);

  //************************************************************************************************************** */
  //********************************************    EXPORT DATA   ************************************************* */
  //************************************************************************************************************** */

  const shareableData = {
    userId,
    loading,
    createNewTask,
    user,
    getAllUsers,
    setLoading,
    darkMode,
    setDarkMode,
    singleUser,
    getUserPost,
    getAllProjectByUser,
    allAcceptedRecieveRequest,
    allAcceptedSentRequest,
    getAllSkillByUser,
    getAllStatusFriendRequest,
    isFetchingSkill,
    addSkills,
    addSocialInfo,
    getSingleUserSocialInfo,
    updateSkills,
    updateSocialInfo,
    getAllSentPendingFriendRequest,
    addLicense,
    updateLicense,
    getUserLicense,
    getUserExperience,
    createCommit,
    addExperience,
    updateExperience,
    updateProjectInfo,
    updateCoverPic,
    getAllCommit,
    updateProfilePic,
    updateUserInfo,
    allSentRequest,
    allRecieveRequest,
    createNewRequest,
    getFriendRequest,
    getAcceptedFriendRequest,
    isFatchingCreateNewRequest,
    deleteProject,
    deleteTask,
    deleteTeamMember,
    deleteFriendRequest,
    getAllSentProjectJoinRequest
  };

  return (
    <AuthContext.Provider value={shareableData}>
      {children}
    </AuthContext.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
