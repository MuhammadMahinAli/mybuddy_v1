

const CommentIcon = ({ theme }) => {
  return (
    <div>
      <svg
        className="h-5 md:h-6"
        viewBox="0 0 34 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.4212 0.895752H2.18504C1.03073 0.895752 0.0967407 1.84189 0.0967407 3.0112V24.1657C0.0967407 25.335 1.03073 26.2812 2.18504 26.2812H6.36162V34.2141C6.36162 34.4278 6.48849 34.6213 6.68374 34.7028C6.74848 34.7303 6.81635 34.743 6.8837 34.743C7.01944 34.743 7.15309 34.689 7.2528 34.588L15.453 26.2812H31.4212C32.5755 26.2812 33.5095 25.335 33.5095 24.1657V3.0112C33.5095 1.84189 32.5755 0.895752 31.4212 0.895752ZM7.92785 8.29983H16.281C16.5697 8.29983 16.8031 8.53623 16.8031 8.82869C16.8031 9.12115 16.5697 9.35755 16.281 9.35755H7.92785C7.63914 9.35755 7.40577 9.12115 7.40577 8.82869C7.40577 8.53623 7.63914 8.29983 7.92785 8.29983ZM23.5901 18.8771H7.92785C7.63914 18.8771 7.40577 18.6407 7.40577 18.3482C7.40577 18.0558 7.63914 17.8194 7.92785 17.8194H23.5901C23.8788 17.8194 24.1121 18.0558 24.1121 18.3482C24.1121 18.6407 23.8788 18.8771 23.5901 18.8771ZM7.40577 15.175C7.40577 14.8826 7.63914 14.6462 7.92785 14.6462H20.4576C20.7463 14.6462 20.9797 14.8826 20.9797 15.175C20.9797 15.4675 20.7463 15.7039 20.4576 15.7039H7.92785C7.63914 15.7039 7.40577 15.4675 7.40577 15.175ZM25.6783 12.5307H7.92785C7.63914 12.5307 7.40577 12.2943 7.40577 12.0019C7.40577 11.7094 7.63914 11.473 7.92785 11.473H25.6783C25.9671 11.473 26.2004 11.7094 26.2004 12.0019C26.2004 12.2943 25.9671 12.5307 25.6783 12.5307Z"
          fill={`${theme === "light" ? "#838DAA" : "#fff"}`}
        />
      </svg>
    </div>
  );
};

export default CommentIcon;
