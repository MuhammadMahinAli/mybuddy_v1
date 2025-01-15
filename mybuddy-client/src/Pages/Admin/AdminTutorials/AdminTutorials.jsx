import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiLinkUnlinkM } from "react-icons/ri";
import Swal from "sweetalert2";

const AdminTutorials = () => {
  const [selectedField, setSelectedField] = useState("tools");
  const [displayText, setDisplayText] = useState("");
  const [tutorialUrl, setTutorialUrl] = useState("");
  const [tutorialInfo, setTutorialInfo] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  // Fetch tutorial info on component mount
  useEffect(() => {
    const fetchTutorialInfo = async () => {
      try {
        const response = await fetch(
          `https://test-two-22w0.onrender.com/api/v1/tutorials/getAll`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching tutorial info: ${response.statusText}`
          );
        }

        const data = await response.json();
        setTutorialInfo(data.data); // Assuming `data.data` contains the tutorial info
      } catch (error) {
        console.error("Error fetching tutorial info:", error);
      }
    };

    fetchTutorialInfo();
  }, []);

  // Add tutorial
  const handleTutorialSubmit = async (e) => {
    e.preventDefault();

    if (!displayText || !tutorialUrl) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter both display text and tutorial URL!",
      });
      return;
    }

    const formData = { field: selectedField, displayText, tutorialUrl };

    try {
      const response = await fetch(
        "https://test-two-22w0.onrender.com/api/v1/tutorials/addTutorial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Tutorial saved successfully!",
          showConfirmButton: true,
          timer: 2000,
        });

        // Update state dynamically
        setTutorialInfo((prevInfo) => ({
          ...prevInfo,
          [selectedField]: [
            ...prevInfo[selectedField],
            { displayText, tutorialUrl },
          ],
        }));

        setDisplayText(""); // Clear input
        setTutorialUrl(""); // Clear input
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save the tutorial. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  // Delete tutorial
  const handleDeleteTutorial = async (field, tutorialUrl) => {
    try {
      const response = await fetch(
        "https://test-two-22w0.onrender.com/api/v1/tutorials/deleteTutorial",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ field, tutorialUrl }),
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The tutorial has been removed.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Update state dynamically
        setTutorialInfo((prevInfo) => ({
          ...prevInfo,
          [field]: prevInfo[field].filter(
            (tu) => tu.tutorialUrl !== tutorialUrl
          ),
        }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete the tutorial. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };
  const categories = [
    "tools",
    "profile",
    "feeds",
    "researchers",
    "projects",
    "tasks",
    "funds",
    "meetings",
    "appearance",
  ];
  return (
    <>
      {/* Add tutorial form */}
      <div className="flex justify-center items-center pt-7 xl:pt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg md:w-[600px]">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co.com/p6Dq7BS/images-removebg-preview.png"
              alt="Logo"
              className="w-40 md:w-48 lg:w-52 3xl:w-56 rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center py-3">
            <p className="invisible text-sm text-center ssm:text-lg font-bold pr-3 ssm:pr-0">
              Add Tutorials
            </p>
            {/* Base */}

            <button
              onClick={() => setOpenPopup(true)}
              className="group relative inline-block focus:outline-none focus:ring"
            >
              <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#9dded9] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

              <span className="relative inline-block border-2 border-current px-4 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                View all
              </span>
            </button>
          </div>

          <form onSubmit={handleTutorialSubmit}>
            {/* Dropdown to Select Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Field:
              </label>
              <select
                value={selectedField}
                onChange={handleFieldChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3eaca8]"
              >
                <option value="tools">Tools</option>
                <option value="profile">Profile</option>
                <option value="feeds">Feeds</option>
                <option value="researchers">Researchers</option>
                <option value="projects">Projects</option>
                <option value="taskss">Tasks</option>
                <option value="funds">Funds</option>
                <option value="meetings">Meetings</option>
                <option value="appearance">Appearance</option>
              </select>
            </div>

            {/* Input for Display Text */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Display Text:
              </label>
              <input
                type="text"
                value={displayText}
                onChange={(e) => setDisplayText(e.target.value)}
                placeholder="Enter a display text [ e.g. how to post? ]"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3eaca8]"
              />
            </div>

            {/* Input for Tutorial Link */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tutorial Link:
              </label>
              <input
                type="text"
                value={tutorialUrl}
                onChange={(e) => setTutorialUrl(e.target.value)}
                placeholder="Enter a tutorial link"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3eaca8]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3eaca8] text-white py-2 rounded-md hover:bg-[#53c2be] transition-colors"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      {/*  Display tutorials */}
      {openPopup && (
        <div className="fixed top-0 left-0  flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen  z-50">
          <div className="bg-white space-y-10  max-h-[600px] overflow-y-scroll p-5">
            <IoIosCloseCircleOutline
              onClick={() => setOpenPopup(false)}
              className="text-xl float-right"
            />
            {categories
              .filter((category) => tutorialInfo?.[category]?.length > 0) // Only show categories with tutorials
              .map((category) => (
                <div key={category}>
                  <h2 className="text-lg font-bold pb-3 capitalize md:text-center text-gray-700">{`${category} Tutorials`}</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {tutorialInfo[category].map((tu, i) => (
                      <li
                        key={tu.tutorialUrl}
                        className="text-gray-700 rounded-lg flex xl:w-[400px] px-3 py-2 justify-between items-center bg-gray-50"
                      >
                        <p className="capitalize">
                          {" "}
                          <span>{i + 1}.</span> {tu.displayText}
                        </p>
                        <div className="flex items-center space-x-2">
                          <a
                            href={tu.tutorialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 font-bold text-xl"
                          >
                            <RiLinkUnlinkM />
                          </a>
                          <button
                            onClick={() =>
                              handleDeleteTutorial(category, tu.tutorialUrl)
                            }
                            className="text-red-500 font-bold"
                          >
                            <FaRegTrashCan />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTutorials;
