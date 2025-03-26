import { useState, useContext, useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
import {
  useDeletePaypalLinkMutation,
  useUpdatePaypalLinkMutation,
} from "../../../features/paypal/paypalApi";
import {
  useDeletePayoneerLinkMutation,
  useUpdatePayoneerLinkMutation,
} from "../../../features/payoneer/payoneerApi";
import { useDeleteAdminBankInfoMutation, useUpdateAdminBankInfoMutation } from "../../../features/adminBankInfo/adminBankInfoApi";

const AdminSetting = () => {
  const { userId, getUsersPaypalLink, getUsersPayoneerLink , getAdminBankInfo} =
    useContext(AuthContext);
  const [updatePaypalLink] = useUpdatePaypalLinkMutation();
  const [updatePayoneerLink] = useUpdatePayoneerLinkMutation();
  const [updateAdminBankInfo] = useUpdateAdminBankInfoMutation();
  const [deletePaypalLink] = useDeletePaypalLinkMutation();
  const [deletePayoneerLink] = useDeletePayoneerLinkMutation();
  const [deleteAdminBankInfo] = useDeleteAdminBankInfoMutation();
  const [paypalLink, setPaypalLink] = useState("");
  const [payoneerLink, setPayoneerLink] = useState("");
  const [updatedPaypalLink, setUpdatedPaypalLink] = useState("");
  const [updatedPayoneerLink, setUpdatedPayoneerLink] = useState("");
  const [isOpenPaypalEdit, setIsOpenPaypalEdit] = useState(false);
  const [isOpenPayoneerEdit, setIsOpenPayoneerEdit] = useState(false);
  const [isOpenAdminBankInfoEdit, setIsOpenAdminBankInfoEdit] = useState(false);
  const [updatedBankData, setUpdatedBankData] = useState({
    accountName: "",
    bankAccountNumber: "",
    bankName: "",
    branchName: ""
  });

  const userPaypalLink = getUsersPaypalLink?.data?.paypalLink || "";

  const userPayoneerLink = getUsersPayoneerLink?.data?.payoneerLink || "";

  const userPaypalId = getUsersPaypalLink?.data?._id;

  const userPayoneerId = getUsersPayoneerLink?.data?._id;

  const adminBankInfoId = getAdminBankInfo?.data?._id;

  const adminBankInfo = getAdminBankInfo?.data;

  const handlePaypalSubmit = async (e) => {
    e.preventDefault();
    console.log({
      member: userId,
      paypalLink,
    });

    try {
      const response = await fetch(
        "https://test-two-22w0.onrender.com/api/v1/paypal/addLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            member: userId,
            paypalLink,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json(); // Parse response JSON if needed
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your PayPal link has been added successfully.",
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
          text: "Failed to save PayPal link. Please try again.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving PayPal link:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handlePayoneerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://test-two-22w0.onrender.com/api/v1/payoneer/addLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            member: userId,
            payoneerLink,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your Payoneer link has been added successfully.",
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
          text: "Failed to save Payneer link. Please try again.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving Payoneer link:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to save PayPal link. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleUpdatePaypalLink = async (e) => {
    e.preventDefault();
    const id = userPaypalId;
    console.log("p", { id, newPaypalLink: updatedPaypalLink });

    try {
      const result = await updatePaypalLink({
        id,
        data: { id, newPaypalLink: updatedPaypalLink },
      });

      if (result?.data?.message === "PayPal link updated successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your PayPal link has been updated successfully.",
          timer: 3000,
          showConfirmButton: false,
        });

        setPaypalLink(updatedPaypalLink);

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
      console.error("Error updating PayPal link:", error);
    }
  };

  const handleUpdatePayoneerLink = async (e) => {
    e.preventDefault();
    const id = userPayoneerId;
    console.log("p", { id, newPayoneerLink: updatedPayoneerLink });

    try {
      const result = await updatePayoneerLink({
        id,
        data: { id, newPayoneerLink: updatedPayoneerLink },
      });
      console.log(result);
      if (result.data.message === "Payoneer link updated successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your Payoneer link has been updated successfully.",
          timer: 3000,
          showConfirmButton: false,
        });
        setPayoneerLink(updatedPayoneerLink);

        setIsOpenPayoneerEdit(false);
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
      console.error("Error updating Payoneer link:", error);
    }
  };

  const handleDeletePaypalLink = () => {
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
        deletePaypalLink(userPaypalId)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "Your paypal link has been deleted.",
              "success"
            );
            setPaypalLink("");
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
  };
  const handleDeletePayoneerLink = () => {
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
        deletePayoneerLink(userPayoneerId)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "Your payneer link has been deleted.",
              "success"
            );
            setPayoneerLink("");
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
  };
  //--------------------------------------------------------
  const [formData, setFormData] = useState({
    accountName: "",
    bankAccountNumber: "",
    bankName: "",
    branchName: "",
    member: userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankInfoSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("https://test-two-22w0.onrender.com/api/v1/adminBankInfo/addInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Bank details have been added successfully.",
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
          text: "Failed to save bank details. Please try again.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving bank details:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "An error occurred. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };


  useEffect(() => {
    const fetchBankDetails = async () => {
    const data = getAdminBankInfo?.data
          setUpdatedBankData({
            accountName: data.accountName || "",
            bankAccountNumber: data.bankAccountNumber || "",
            bankName: data.bankName || "",
            branchName: data.branchName || "",
          });
     
    };

    fetchBankDetails();
  }, [userId]);

  const handleBInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBankData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateBankInfoSubmit = async (e) => {
    e.preventDefault();
  
    const id = adminBankInfoId; // Bank Info ID to update
    console.log("Updating Admin Bank Info:", { id, updatedBankData });
  
    // Prepare updated data
    const updatedData = {
      accountName: updatedBankData?.accountName,
      bankAccountNumber: updatedBankData?.bankAccountNumber,
      bankName: updatedBankData?.bankName,
      branchName: updatedBankData?.branchName,
    };
  
    try {
      // Make API call
      const result = await updateAdminBankInfo({
        id,
        data: updatedData,
      });
  
      if (result?.data?.message === "Admin Bank Info updated successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Bank information updated successfully.",
          timer: 3000,
          showConfirmButton: false,
        });
  
        // Update state or close modal
        setPayoneerLink(updatedBankData);
        setIsOpenPayoneerEdit(false);
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
      console.error("Error updating Bank Info:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while updating bank information.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  
  const handleDeleteBankInfo = () => {
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
        deleteAdminBankInfo(adminBankInfoId)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "Data has been deleted.",
              "success"
            );
            setPayoneerLink("");
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2500);
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an issue. Please try again later.",
              "error"
            );
          });
      }
    });
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-8 pt-14">
      <div className="bg-white p-8 rounded-lg shadow-lg md:w-[600px]">
        {/* PayPal Section */}
        <div className="flex justify-center  mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal Logo"
            className="w-20 md:w-32"
          />
        </div>

        {/* PayPal Edit Button */}
        <div className="flex items-start md:items-center justify-between py-3">
          <p className="text-sm ssm:text-lg font-bold pr-3 ssm:pr-0">Research Buddy PayPal account</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsOpenPaypalEdit(!isOpenPaypalEdit)}
              className="text-xl"
            >
              <TiEdit />
            </button>
            <button onClick={handleDeletePaypalLink} className="text-xl">
              <IoTrashOutline />
            </button>
          </div>
        </div>

        {userPaypalLink ? (
          // Show PayPal link if available, else show the form to add PayPal link
          !isOpenPaypalEdit ? (
            <input
              type="text"
              value={
                updatedPaypalLink?.length !== 0
                  ? updatedPaypalLink
                  : userPaypalLink
              }
              readOnly
              className="w-full px-4 mt-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <form onSubmit={handleUpdatePaypalLink}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter your new PayPal.me link"
                  value={updatedPaypalLink}
                  onChange={(e) => setUpdatedPaypalLink(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </form>
          )
        ) : (
          <form className="" onSubmit={handlePaypalSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your PayPal.me link"
                value={paypalLink}
                onChange={(e) => setPaypalLink(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </form>
        )}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg md:w-[600px] ">
  {/* Payoneer Section */}
  <div className="flex justify-center mb-6   ">
    <img
      src="https://seeklogo.com/images/P/payoneer-new-2021-logo-A7168B16B5-seeklogo.com.png"
      alt="Payoneer Logo"
      className="w-20 md:w-36"
    />
  </div>
  
  {/* Payoneer Edit Button */}
  <div className="flex items-start md:items-center justify-between py-3">
    <p className="text-sm ssm:text-lg font-bold pr-3 ssm:pr-0">Research Buddy Payoneer account</p>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setIsOpenPayoneerEdit(!isOpenPayoneerEdit)}
        className="text-xl"
      >
        <TiEdit />
      </button>
      <button onClick={handleDeletePayoneerLink} className="text-xl">
        <IoTrashOutline />
      </button>
    </div>
  </div>
  
  {userPayoneerLink ? (
    !isOpenPayoneerEdit ? (
      <input
        type="text"
        value={
          updatedPayoneerLink?.length !== 0
            ? updatedPayoneerLink
            : userPayoneerLink
        }
        readOnly
        className="w-full px-4 mt-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    ) : (
      <form onSubmit={handleUpdatePayoneerLink}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your new Payoneer ID"
            value={updatedPayoneerLink}
            onChange={(e) => setUpdatedPayoneerLink(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Update
        </button>
      </form>
    )
  ) : (
    <form onSubmit={handlePayoneerSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your Payoneer ID"
          value={payoneerLink}
          onChange={(e) => setPayoneerLink(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
      >
        Save
      </button>
    </form>
  )}
  </div>
  
  <div className="bg-white p-8 rounded-lg shadow-lg md:w-[600px] ">
  {/* bank Section */}
  <div className="flex justify-center mb-6   ">
    <img
      src="https://i.ibb.co.com/zJ3bWNk/bank.png"
      alt="Payoneer Logo"
      className="w-14 md:w-16"
    />
  </div>
  
  {/* bank info Edit Button */}
  <div className="flex items-start md:items-center justify-between py-3">
    <p className="text-sm ssm:text-lg font-bold pr-3 ssm:pr-0">Research Buddy Bank account</p>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setIsOpenAdminBankInfoEdit(!isOpenAdminBankInfoEdit)}
        className="text-xl"
      >
        <TiEdit />
      </button>
      <button onClick={handleDeleteBankInfo} className="text-xl">
        <IoTrashOutline />
      </button>
    </div>
  </div>
  
  { adminBankInfoId ? (
    !isOpenAdminBankInfoEdit ? (
      <div className="space-y-4">
      <input
        type="text"
        name="accountName"
        value={adminBankInfo?.accountName}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
  
      <input
        type="text"
        name="bankAccountNumber"
        value={adminBankInfo?.bankAccountNumber}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
  
      <input
        type="text"
        name="bankName"
        value={adminBankInfo?.bankName}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        name="branchName"
        value={adminBankInfo?.branchName}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
    ) : (
      <form onSubmit={handleUpdateBankInfoSubmit} className=" cursor-green-600 rounded-lg space-y-4 text-gray-700">
      <input
        type="text"
        name="accountName"
        placeholder="Account Holder Name"
        value={updatedBankData.accountName}
        onChange={handleBInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
  
      <input
        type="text"
        name="bankAccountNumber"
        placeholder="Bank Account Number"
        value={updatedBankData.bankAccountNumber}
        onChange={handleBInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
  
      <input
        type="text"
        name="bankName"
        placeholder="Bank Name "
        value={updatedBankData.bankName}
        onChange={handleBInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        name="branchName"
        placeholder="Branch Name"
        value={updatedBankData.branchName}
        onChange={handleBInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition-colors"
      >
        Update
      </button>
    </form>
    )
  ) : (
    <form onSubmit={handleBankInfoSubmit} className=" cursor-green-600 rounded-lg space-y-4 text-gray-700">
      <input
        type="text"
        name="accountName"
        placeholder="Account Holder Name"
        value={formData.accountName}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
  
      <input
        type="text"
        name="bankAccountNumber"
        placeholder="Bank Account Number"
        value={formData.bankAccountNumber}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
  
      <input
        type="text"
        name="bankName"
        placeholder="Bank Name "
        value={formData.bankName}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        name="branchName"
        placeholder="Branch Name"
        value={formData.branchName}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition-colors"
      >
        Save
      </button>
    </form>
  )}
  </div>
    </div>
  );
};

export default AdminSetting;
