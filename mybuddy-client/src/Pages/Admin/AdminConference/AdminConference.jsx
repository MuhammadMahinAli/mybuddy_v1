import { useState, useContext} from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
import { useDeleteConferenceLinkMutation, useGetUsersConferenceLinkQuery, useUpdateConferenceLinkMutation } from "../../../features/conference/conferenceApi";


const AdminConference = () => {
 const { data: getConferenceLink } = useGetUsersConferenceLinkQuery();
  const [updateConferenceLink] = useUpdateConferenceLinkMutation();
  const [deleteConferenceLink] = useDeleteConferenceLinkMutation();
  const [conferenceLink, setConferenceLink] = useState("");
  const [updatedConferenceLink, setUpdatedConferenceLink] = useState("");
  const [isOpenPaypalEdit, setIsOpenPaypalEdit] = useState(false);


  console.log(getConferenceLink?.data);
 const userConferenceLink = getConferenceLink?.data?.conferenceLink || "";

 const userConferenceId = getConferenceLink?.data?._id;


  const handleConferenceSubmit = async (e) => {
    e.preventDefault();
    console.log({
      conferenceLink,
    });

    try {
      const response = await fetch(
        "https://test-two-22w0.onrender.com/api/v1/conference/addLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            
            conferenceLink
          }),
        }
      );

      if (response.ok) {
        const result = await response.json(); // Parse response JSON if needed
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your conference link has been added successfully.",
          timer: 3000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to save conference link. Please try again.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving conference link:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };



  const handleUpdateConferenceLink = async (e) => {
    e.preventDefault();
    const id = userConferenceId;
    console.log("p", { id, newConferenceLink: updatedConferenceLink });

    try {
      const result = await updateConferenceLink({
        id,
        data: { id, newConferenceLink: updatedConferenceLink },
      });

      if (result?.data?.message === "Conference Link updated successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your Conference link has been updated successfully.",
          timer: 3000,
          showConfirmButton: false,
        });

        setConferenceLink(updatedConferenceLink);

        setIsOpenPaypalEdit(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating Conference link:", error);
    }
  };



  const handleDeleteConferenceLink = () => {
    Swal.fire({
      title: "Are you sure to delete it ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConferenceLink(userConferenceId)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "Your conference link has been deleted.",
              "success"
            );
            setConferenceLink("");
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2500);
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an issue to cancelled request.",
              "error"
            );
          });
      }
    });
  }


  return (
    <div className="flex flex-col justify-center items-center space-y-8 pt-14">
      <div className="bg-white p-8 rounded-lg shadow-lg md:w-[600px]">
        {/* PayPal Section */}
        <div className="flex justify-center  mb-6">
          <img
            src="https://i.ibb.co.com/nQ5hXVB/Screenshot.png"
            alt="PayPal Logo"
            className="w-40 md:w-48 lg:w-52 3xl:w-56 rounded-lg"
          />
        </div>

        {/* PayPal Edit Button */}
        <div className="flex items-start md:items-center justify-between py-3">
          <p className="text-sm ssm:text-lg font-bold pr-3 ssm:pr-0">Conference Link</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsOpenPaypalEdit(!isOpenPaypalEdit)}
              className="text-xl"
            >
              <TiEdit />
            </button>
            <button 
            onClick={handleDeleteConferenceLink} 
            className="text-xl">
              <IoTrashOutline />
            </button>
          </div>
        </div>

       {userConferenceLink ? (
          // Show PayPal link if available, else show the form to add PayPal link
          !isOpenPaypalEdit ? (
            <input
              type="text"
              value={
                updatedConferenceLink?.length !== 0
                  ? updatedConferenceLink
                  : userConferenceLink
              }
              readOnly
              className="w-full px-4 mt-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <form onSubmit={handleUpdateConferenceLink}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter new conference link"
                  value={updatedConferenceLink}
                  onChange={(e) => setUpdatedConferenceLink(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
              >
                Update
              </button>
            </form>
          )
        ) : ( 
          <form className="" onSubmit={handleConferenceSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter a conference link"
                value={conferenceLink}
                onChange={(e) => setConferenceLink(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
            >
              Save
            </button>
          </form>
         )} 
      </div>

    </div>
  );
};

export default AdminConference;
