import { useSelector } from "react-redux";
import Posts from "./Posts";
import ViewPosts from "./ViewPosts";

const Homepage = () => {
  const theme = useSelector((state) => state.theme.theme);


  return (
  
      <section className="space-y-7 text-gray-800">
      <Posts theme={theme} />
      <ViewPosts theme={theme} />
    </section>
   
   
  );
};

export default Homepage;
