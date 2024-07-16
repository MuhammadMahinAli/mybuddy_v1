import PropTypes from "prop-types";
const FindResearcherDescription = ({ post }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {post?.description && (
        <p className="text-[16px] xl:text-[20px]">{post?.description}</p>
      )}
      {post?.image && (
        <img
          src={post?.image}
          className="h-40 md:h-48 lg:h-52 xl:h-[300px] rounded-lg"
          loading="lazy" alt="hero"
        />
      )}
    </div>
  );
};

export default FindResearcherDescription;
FindResearcherDescription.propTypes = {
 post: PropTypes.object
};
