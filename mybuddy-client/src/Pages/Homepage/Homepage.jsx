import { useSelector } from "react-redux";
import Posts from "./Posts";
import ViewPosts from "./ViewPosts";

const Homepage = () => {
  const theme = useSelector((state) => state.theme.theme);

  
  return (
    <section className="space-y-7 text-gray-800 scrollbar-hide">
      <Posts theme={theme} />
      <div className="max-h-[1200px] overflow-y-auto scrollbar-hide">
        <ViewPosts theme={theme} />
      </div>
    </section>
  );
};

export default Homepage;
