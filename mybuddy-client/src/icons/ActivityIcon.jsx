const ActivityIcon = ({isOpenActivityTab}) => {
  const toggleSvgColor = isOpenActivityTab ? "#2ED573" : "#838487"
  return (
    <div>
      <svg
    className="h-8"
        viewBox="0 0 37 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.98267 19.4309H9.53402L14.5683 2.60645L22.1196 36.2554L27.1539 19.4309H34.7052"
          stroke={toggleSvgColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ActivityIcon;
