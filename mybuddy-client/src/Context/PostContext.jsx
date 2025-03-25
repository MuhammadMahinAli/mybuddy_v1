// src/Context/PostContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useGetAllPostQuery } from "../features/post/postApi";


export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const {
    data: allPosts,
    isFetchingPosts: isFetchingPosts,
    error,
    refetch,
  } = useGetAllPostQuery({ page });



  return (
    <PostContext.Provider
      value={{
        allPosts,
         isFetchingPosts,
        error,
        refetch,
        page,
        setPage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
