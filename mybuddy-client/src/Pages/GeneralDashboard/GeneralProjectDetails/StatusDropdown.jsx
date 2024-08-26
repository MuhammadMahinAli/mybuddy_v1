// import  { useState } from 'react';
// import Swal from 'sweetalert2';
// import { useUpdateCommitStatusMutation } from '../../../features/commit/commitApi';

// const StatusDropdown = ({ commitId, getAllCommit}) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [declineMessage, setDeclineMessage] = useState("");
//   const [updateCommitStatus] = useUpdateCommitStatusMutation();

//   const handleStatusChange = async (e, index, status) => {
//     e.preventDefault();
//     setSelectedStatus(index);
//     const selectedTask = getAllCommit?.data[index];

//     if (selectedTask) {
//       let swalOptions = {
//         title: "Are you sure?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, update status!",
//       };

//       if (status === "Declined") {
//         swalOptions = {
//           ...swalOptions,
//           text: "Please provide a reason for declining:",
//           input: 'text',
//           inputPlaceholder: 'Enter your reason',
//           inputValidator: (value) => {
//             if (!value) {
//               return 'You need to write something!';
//             }
//           }
//         };
//       } else {
//         swalOptions.text = `Does this member's task deserve to be marked as "${status}"?`;
//       }

//       Swal.fire(swalOptions).then(async (result) => {
//         if (result.isConfirmed) {
//           const declineMessage = result.value || "";
//           const postData = {
//             status,
//             ...(status === "Declined" && { declineMessage }),
//           };

//           try {
//             console.log({ id: selectedStatus._id, data: postData });

//             // Call your update service here
//             await updateCommitStatus({
//               id: selectedTask._id,
//               data: postData,
//             }).unwrap();

//             Swal.fire({
//               icon: "success",
//               title: "Status Updated",
//               text: `You have successfully updated the status to "${status}".`,
//               timer: 2000,
//               timerProgressBar: true,
//               showConfirmButton: false,
//             });

//             setTimeout(() => {
//               window.location.reload();
//             }, 2500);
//           } catch (error) {
//             alert("Failed to update status.");
//             console.error(error);
//           }
//         }
//       });
//     } else {
//       console.log("No task found for the selected index.");
//     }
//   };

//   return (
//     <td className="px-4 py-4">
//       <span
//         className="border border-green-500 text-green-600 py-1 px-3 rounded-full text-sm cursor-pointer"
//         onClick={() => setShowDropdown(!showDropdown)}
//       >
//         Select
//       </span>
//       {showDropdown && (
//         <div className="relative">
//           <ul className="absolute bg-white border border-gray-300 rounded shadow-lg mt-2 z-10">
//             <li
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setSelectedStatus("Approved");
//                 handleStatusChange("Approved");
//               }}
//             >
//               Approved
//             </li>
//             <li
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setSelectedStatus("Declined");
//                 handleStatusChange("Declined");
//               }}
//             >
//               Declined
//             </li>
//           </ul>
//         </div>
//       )}
//     </td>
//   );
// };

// export default StatusDropdown;

/* eslint-disable react/prop-types */

import { useState } from "react";
import Swal from "sweetalert2";
import { useUpdateCommitStatusMutation } from "../../../features/commit/commitApi";

const StatusDropdown = ({ commit, commitId, getAllCommit, ProjectInfo,userId ,filteredMyself,projectOwner }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [updateCommitStatus] = useUpdateCommitStatusMutation();

  const capitalizeText = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleDeclineMessageClick = () => {
    if (commit?.status === "Declined") {
      Swal.fire({
        title: "Decline Message",
        text: capitalizeText(commit?.declineMessage  || "No message provided"),
        icon: "info",
        confirmButtonText: "Close",
      });
    }
  };

  const handleStatusChange = async (status) => {
    const selectedTask = getAllCommit?.data.find(
      (commit) => commit._id === commitId
    );

    if (selectedTask) {
      let swalOptions = {
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update status!",
      };

      if (status === "Declined") {
        swalOptions = {
          ...swalOptions,
          text: "Please provide a reason for declining:",
          input: "text",
          inputPlaceholder: "Enter your reason",
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            }
          },
        };
      } else {
        swalOptions.text = `Does this member's task deserve to be marked as "${status}"?`;
      }

      Swal.fire(swalOptions).then(async (result) => {
        if (result.isConfirmed) {
          const declineMessage =
            status === "Declined" ? result.value : "Your Task Is Completed";

          const postData = {
            status,
            declineMessage,
          };

          try {
            await updateCommitStatus({
              id: selectedTask._id,
              data: postData,
            }).unwrap();

            Swal.fire({
              icon: "success",
              title: "Status Updated",
              text: `You have successfully updated the status to "${status}".`,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });

            setTimeout(() => {
              window.location.reload();
            }, 2500);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Failed to Update",
              text: "There was an error updating the status.",
            });
            console.error(error);
          }
        }
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };

  return (
    <td className="px-4 py-4">
      { ProjectInfo?.user?._id === userId  ?   (
        <>
          <span
            className={`border py-1 px-3 rounded-full text-sm cursor-pointer ${
              commit?.status === "Approved"
                ? "border-green-500 text-green-600"
                : commit?.status === "Declined"
                ? "border-red-500 text-red-600"
                : "border-blue-500 text-blue-600"
            }`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
          {commit?.status === "Pending" ? "Select" : commit?.status}
          </span>
          {showDropdown && (
            <div className="relative pt-1">
              <ul className="absolute bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStatusChange("Approved")}
                >
                  Approve
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStatusChange("Declined")}
                >
                  Decline
                </li>
              </ul>
            </div>
          )}
        </>
      )
      :
      (
        <span
          onClick={handleDeclineMessageClick}
          className={`border py-1 px-3 rounded-full text-sm cursor-pointer ${
            commit?.status === "Approved"
              ? "border-green-500 text-green-600"
              : commit?.status === "Declined"
              ? "border-red-500 text-red-600"
              : "border-blue-500 text-blue-600"
          }`}
        >
          {commit?.status}
        </span>
      )
    }

    </td>
  );
};

export default StatusDropdown;
