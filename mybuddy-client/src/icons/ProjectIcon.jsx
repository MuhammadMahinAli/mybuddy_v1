import project from "../assets/icon/project.png";

const ProjectIcon = ({ theme ,openProject}) => {
  return (
    <>
      {theme === "light" ? (
        <svg
          className="w-4 sm:w-5"
          viewBox="0 0 25 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49759 5.98901H17.1271C17.3592 5.98901 17.5819 5.89678 17.7461 5.73261C17.9102 5.56844 18.0025 5.34577 18.0025 5.1136V3.36279C18.0025 2.66627 17.7258 1.99828 17.2333 1.50577C16.7408 1.01326 16.0728 0.736572 15.3762 0.736572H9.2484C8.55189 0.736572 7.8839 1.01326 7.39139 1.50577C6.89888 1.99828 6.62219 2.66627 6.62219 3.36279V5.1136C6.62219 5.34577 6.71441 5.56844 6.87859 5.73261C7.04276 5.89678 7.26542 5.98901 7.49759 5.98901ZM21.9418 2.92509H21.0664C21.0079 2.92122 20.9493 2.92989 20.8944 2.95052C20.8396 2.97115 20.7897 3.00326 20.7483 3.0447C20.7068 3.08614 20.6747 3.13596 20.6541 3.19082C20.6335 3.24568 20.6248 3.30431 20.6287 3.36279V5.1136C20.6287 6.04229 20.2598 6.93294 19.6031 7.58962C18.9464 8.24631 18.0557 8.61523 17.1271 8.61523H7.49759C6.5689 8.61523 5.67825 8.24631 5.02157 7.58962C4.36489 6.93294 3.99597 6.04229 3.99597 5.1136V3.36279C3.99984 3.30431 3.99117 3.24568 3.97054 3.19082C3.94991 3.13596 3.9178 3.08614 3.87636 3.0447C3.83491 3.00326 3.7851 2.97115 3.73024 2.95052C3.67538 2.92989 3.61675 2.92122 3.55826 2.92509H2.68286C1.98634 2.92509 1.31835 3.20178 0.825842 3.69429C0.33333 4.1868 0.0566406 4.85479 0.0566406 5.55131V24.3725C0.0566406 25.0691 0.33333 25.737 0.825842 26.2295C1.31835 26.7221 1.98634 26.9988 2.68286 26.9988H21.9418C22.6383 26.9988 23.3063 26.7221 23.7988 26.2295C24.2913 25.737 24.568 25.0691 24.568 24.3725V5.55131C24.568 4.85479 24.2913 4.1868 23.7988 3.69429C23.3063 3.20178 22.6383 2.92509 21.9418 2.92509ZM7.49759 21.7463C7.49759 21.9785 7.40536 22.2012 7.24119 22.3653C7.07702 22.5295 6.85436 22.6217 6.62219 22.6217H5.74678C5.51461 22.6217 5.29194 22.5295 5.12777 22.3653C4.9636 22.2012 4.87137 21.9785 4.87137 21.7463V20.8709C4.87137 20.6387 4.9636 20.4161 5.12777 20.2519C5.29194 20.0877 5.51461 19.9955 5.74678 19.9955H6.62219C6.85436 19.9955 7.07702 20.0877 7.24119 20.2519C7.40536 20.4161 7.49759 20.6387 7.49759 20.8709V21.7463ZM7.49759 17.3693C7.49759 17.6015 7.40536 17.8241 7.24119 17.9883C7.07702 18.1525 6.85436 18.2447 6.62219 18.2447H5.74678C5.51461 18.2447 5.29194 18.1525 5.12777 17.9883C4.9636 17.8241 4.87137 17.6015 4.87137 17.3693V16.4939C4.87137 16.2617 4.9636 16.039 5.12777 15.8749C5.29194 15.7107 5.51461 15.6185 5.74678 15.6185H6.62219C6.85436 15.6185 7.07702 15.7107 7.24119 15.8749C7.40536 16.039 7.49759 16.2617 7.49759 16.4939V17.3693ZM7.49759 12.9923C7.49759 13.2244 7.40536 13.4471 7.24119 13.6113C7.07702 13.7754 6.85436 13.8677 6.62219 13.8677H5.74678C5.51461 13.8677 5.29194 13.7754 5.12777 13.6113C4.9636 13.4471 4.87137 13.2244 4.87137 12.9923V12.1169C4.87137 11.8847 4.9636 11.662 5.12777 11.4978C5.29194 11.3337 5.51461 11.2414 5.74678 11.2414H6.62219C6.85436 11.2414 7.07702 11.3337 7.24119 11.4978C7.40536 11.662 7.49759 11.8847 7.49759 12.1169V12.9923ZM19.7533 21.7463C19.7533 21.9785 19.661 22.2012 19.4969 22.3653C19.3327 22.5295 19.11 22.6217 18.8779 22.6217H10.1238C9.89164 22.6217 9.66897 22.5295 9.5048 22.3653C9.34063 22.2012 9.2484 21.9785 9.2484 21.7463V20.8709C9.2484 20.6387 9.34063 20.4161 9.5048 20.2519C9.66897 20.0877 9.89164 19.9955 10.1238 19.9955H18.8779C19.11 19.9955 19.3327 20.0877 19.4969 20.2519C19.661 20.4161 19.7533 20.6387 19.7533 20.8709V21.7463ZM19.7533 17.3693C19.7533 17.6015 19.661 17.8241 19.4969 17.9883C19.3327 18.1525 19.11 18.2447 18.8779 18.2447H10.1238C9.89164 18.2447 9.66897 18.1525 9.5048 17.9883C9.34063 17.8241 9.2484 17.6015 9.2484 17.3693V16.4939C9.2484 16.2617 9.34063 16.039 9.5048 15.8749C9.66897 15.7107 9.89164 15.6185 10.1238 15.6185H18.8779C19.11 15.6185 19.3327 15.7107 19.4969 15.8749C19.661 16.039 19.7533 16.2617 19.7533 16.4939V17.3693ZM19.7533 12.9923C19.7533 13.2244 19.661 13.4471 19.4969 13.6113C19.3327 13.7754 19.11 13.8677 18.8779 13.8677H10.1238C9.89164 13.8677 9.66897 13.7754 9.5048 13.6113C9.34063 13.4471 9.2484 13.2244 9.2484 12.9923V12.1169C9.2484 11.8847 9.34063 11.662 9.5048 11.4978C9.66897 11.3337 9.89164 11.2414 10.1238 11.2414H18.8779C19.11 11.2414 19.3327 11.3337 19.4969 11.4978C19.661 11.662 19.7533 11.8847 19.7533 12.1169V12.9923Z"
             fill={openProject === true || theme !== 'light' ? "#2adba4" : "#838DAA" }
          />
        </svg>
      ) : (
        <img src={project}
        className="w-4 sm:w-5"/>
      )}
    </>
  );
};

export default ProjectIcon;
