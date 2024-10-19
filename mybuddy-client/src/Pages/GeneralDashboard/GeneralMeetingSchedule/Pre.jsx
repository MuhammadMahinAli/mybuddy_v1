import { useEffect, useState } from "react";
import { apiFetch } from "../../../utils/apiFetch";
import { useLocation } from "react-router-dom";

const Pre = () => {
  const [meetingInfo, setMeetingInfo] = useState({});
  const [meeting, setMeeting] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Parse the meetingId from the URL parameters
    const queryParams = new URLSearchParams(location.search);
    const meetingId = queryParams.get("meetingId");
    setMeeting(meetingId);
  }, [location]);

  useEffect(() => {
    // Fetch the meeting info once the meeting ID is set
    if (!meeting) {
      return;
    }
    const fetchData = async () => {
      try {
        const res = await apiFetch(
          `http://localhost:3000/api/v1/meeting/getMeetingById/${meeting}`,
          "GET"
        );
        setMeetingInfo(res?.data ?? {});
        console.log("Meeting Info:", res?.data);
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      }
    };
    fetchData();
  }, [meeting]);

  console.log("Meeting Info:", meetingInfo, "Meeting ID:", meeting);

  return <div>Meeting Id: {meeting}</div>;
};

export default Pre;

