const PostLike = ({liked, currentPostId, postId}) => {
  const active = liked === true && currentPostId === postId ? "#1E90FF" : "#838DAA"
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6008 28.6175C6.83256 28.6175 0.511629 22.4868 0.511629 14.8956C0.511629 7.30438 6.83256 1.17371 14.6008 1.17371C22.369 1.17371 28.6899 7.30438 28.6899 14.8956C28.6899 22.4868 22.369 28.6175 14.6008 28.6175Z" fill="#4285F4" stroke="#ECECEC"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.4103 7.98702C12.4103 6.85406 13.5297 6.09875 14.4044 6.09875C15.0131 6.09875 15.0607 6.561 15.1544 7.47341C15.1959 7.87373 15.2458 8.36014 15.356 8.93116C15.6476 10.4433 16.6552 12.3754 17.6189 12.9532V17.4284C17.622 19.1278 17.0555 19.6943 14.6007 19.6943H11.751C10.1074 19.6943 9.70937 18.6119 9.56133 18.2109L9.55151 18.1837C9.4654 17.9525 9.28111 17.7705 9.06962 17.5643C8.83548 17.3332 8.5681 17.0711 8.36945 16.6731C8.13455 16.2025 8.16552 15.7841 8.19347 15.4117C8.21084 15.1859 8.2267 14.9774 8.18063 14.7848C8.13229 14.5809 8.07035 14.426 8.01068 14.278C7.90267 14.0091 7.80297 13.7598 7.80297 13.2742C7.80297 12.1412 8.36794 11.3874 9.55151 11.3874H12.7125C12.7125 11.3874 12.4103 9.11998 12.4103 7.98702ZM20.2655 12.1412C20.566 12.1412 20.8542 12.2606 21.0667 12.473C21.2791 12.6855 21.3985 12.9737 21.3985 13.2742V18.5613C21.3985 18.8618 21.2791 19.15 21.0667 19.3624C20.8542 19.5749 20.566 19.6943 20.2655 19.6943C19.9651 19.6943 19.6769 19.5749 19.4644 19.3624C19.2519 19.15 19.1326 18.8618 19.1326 18.5613V13.2742C19.1326 12.9737 19.2519 12.6855 19.4644 12.473C19.6769 12.2606 19.9651 12.1412 20.2655 12.1412Z" fill="white"/>
    </svg>
    
    
  );
};

export default PostLike;
