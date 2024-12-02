// import { useContext, useEffect, useState } from "react";
// import { useGetAllToolsQuery } from "../../../features/tools/toolsApi";
// import { useAddToolsMutation } from "../../../features/userTools/userToolsApi";
// import { AuthContext } from "../../../Context/UserContext";
// import { IoMdRemoveCircle } from "react-icons/io";
// import { IoAddCircle } from "react-icons/io5";

// const AdminAllTool = () => {
//   const [addTools] = useAddToolsMutation();
//   const { getUserToolsById, userId } = useContext(AuthContext);
//   const { data: getAllTools } = useGetAllToolsQuery();

//   const allToolsData = getAllTools?.data;
//   const allMyToolsData = getUserToolsById?.data;

//   console.log(allToolsData);

//   const currentTools = allMyToolsData?.tools;

//   // States for tools management
//   const [myTools, setMyTools] = useState([]);
//   const [allTools, setAllTools] = useState([]);
//   const [myToolsIds, setMyToolsIds] = useState([]);

//   // States for storing data directly from `localStorage`
//   const [storedMyTools, setStoredMyTools] = useState([]);
//   const [storedAllTools, setStoredAllTools] = useState([]);

//   // Load data from `localStorage` on component mount
//   useEffect(() => {
//     const storedMyToolsData = localStorage.getItem(`myTools_${userId}`);
//     const storedAllToolsData = localStorage.getItem(`allTools_${userId}`);

//     if (storedMyToolsData) {
//       setStoredMyTools(JSON.parse(storedMyToolsData));
//       setMyTools(JSON.parse(storedMyToolsData));
//     }

//     if (storedAllToolsData) {
//       setStoredAllTools(JSON.parse(storedAllToolsData));
//       setAllTools(JSON.parse(storedAllToolsData));
//     }
//   }, [userId]);


//   useEffect(() => {
//     // Initialize `myTools` from backend data if localStorage is empty
//     if (!storedMyTools.length && currentTools?.length > 0) {
//       setMyTools(currentTools);
//       localStorage.setItem(`myTools_${userId}`, JSON.stringify(currentTools));
//       setStoredMyTools(currentTools);
//     }
  
//     // Dynamically update `allTools` with new backend data, excluding `myTools`
//     if (allToolsData?.length > 0) {
//       const filteredAllTools = allToolsData.filter(
//         (tool) => !storedMyTools.some((myTool) => myTool._id === tool._id) &&
//                   !myTools.some((myTool) => myTool._id === tool._id) // Avoid duplicate tools
//       );
//       setAllTools(filteredAllTools);
//       localStorage.setItem(`allTools_${userId}`, JSON.stringify(filteredAllTools));
//       setStoredAllTools(filteredAllTools);
//     }
//   }, [allToolsData, currentTools, storedMyTools, myTools, userId]);
  
  

//   // Update `myToolsIds` when `myTools` changes
//   useEffect(() => {
//     const updatedToolIds = myTools.map((tool) => ({ toolID: tool._id }));
//     setMyToolsIds(updatedToolIds);
//   }, [myTools]);

//   // Sync updates to backend whenever `myToolsIds` changes
//   useEffect(() => {
//     const postUpdatedTools = async () => {
//       const formData = {
//         tools: myToolsIds,
//         member: "67396ba011eb8789052c3cfd", // Replace with dynamic member ID if needed
//       };

//       try {
//         const response = await addTools(formData);
//         console.log("Updated tools posted successfully:", response);
//       } catch (error) {
//         console.error("Error posting updated tools:", error);
//       }
//     };

//     if (myToolsIds.length > 0) {
//       postUpdatedTools();
//     }
//   }, [myToolsIds, addTools]);

//   // Handle adding/removing tools
//   const handleToolAction = (tool, fromMyTools) => {
//     if (fromMyTools) {
//       // Remove from My Tools and add to All Tools
//       const updatedMyTools = myTools.filter((t) => t._id !== tool._id);
//       const updatedAllTools = [...allTools, tool];

//       setMyTools(updatedMyTools);
//       setAllTools(updatedAllTools);

//       // Update `localStorage`
//       localStorage.setItem(`myTools_${userId}`, JSON.stringify(updatedMyTools));
//       localStorage.setItem(`allTools_${userId}`, JSON.stringify(updatedAllTools));

//       // Update `stored` states
//       setStoredMyTools(updatedMyTools);
//       setStoredAllTools(updatedAllTools);
//     } else {
//       // Remove from All Tools and add to My Tools
//       const updatedAllTools = allTools.filter((t) => t._id !== tool._id);
//       const updatedMyTools = [...myTools, tool];

//       setAllTools(updatedAllTools);
//       setMyTools(updatedMyTools);

//       // Update `localStorage`
//       localStorage.setItem(`myTools_${userId}`, JSON.stringify(updatedMyTools));
//       localStorage.setItem(`allTools_${userId}`, JSON.stringify(updatedAllTools));

//       // Update `stored` states
//       setStoredMyTools(updatedMyTools);
//       setStoredAllTools(updatedAllTools);
//     }
//   };

//   return (
//     <div className="p-10 space-y-10">
//       {/* My Tools Section */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">My Tools</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {storedMyTools?.map((tool) => (
//             <div
//               key={tool._id}
//               className="relative rounded-2xl p-3 space-y-3 bg-skyblue shadow-lg"
//               >
//                  <button      onClick={() => handleToolAction(tool, true)} className="absolute right-2">
//               <IoMdRemoveCircle className="text-2xl text-red-500" />
//               </button>
//               <div>
//                 <img
//                   src={tool.image}
//                   alt={tool.toolName}
//                   className="h-[57px] w-[60px] border-2 border-gray-400 p-1 rounded-full"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium">{tool.toolName}</h3>
//                 <p className="pt-2 text-sm text-gray-700">{tool.description}</p>
//               </div>
             
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* All Tools Section */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">All Tools</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {storedAllTools.map((tool) => (
//             <div
//               key={tool._id}
//               className="relative rounded-2xl p-3 space-y-3 bg-skyblue shadow-lg"
//             >
//                <button      onClick={() => handleToolAction(tool, false)} className="absolute right-2">
//                <IoAddCircle className="text-2xl text-blue-500" />
//               </button>
//               <div>
//                 <img
//                   src={tool.image}
//                   alt={tool.toolName}
//                   className="h-[57px] w-[60px] border-2 border-gray-400 p-1 rounded-full"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium">{tool.toolName}</h3>
//                 <p className="pt-2 text-sm text-gray-700">{tool.description}</p>
//               </div>
             
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAllTool;





import { useGetAllToolsQuery } from "../../../features/tools/toolsApi";

const AdminAllTool = () => {
  const { data: getAllTools } = useGetAllToolsQuery();

  console.log(getAllTools?.data);
  const allTools = getAllTools?.data;

  return (
    <div className="grid grid-cols-3 gap-6 py-10">
      {allTools?.map((o, i) => (
        <div key={i}>
          <div className="rounded-2xl p-3 space-y-3 bg-skyblue  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
            <div className="">
              <img
                src={o.image}
                className="h-[57px] w-[60px] border-2 border-gray-400 p-1 rounded-full"
              />
            </div>

            <div>
              <h3 className=" text-lg font-medium sm:text-xl">
                <a href="#" className="hover:underline">
                  {o?.toolName}
                </a>
              </h3>

              <p className="pt-2 text-sm text-gray-700">{o.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAllTool;
