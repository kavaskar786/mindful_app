import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Slider,
  Box,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createMood, getMoods } from "../../../store/features/mood/moodSlice";
import firebase from "../../../utils/firebase";

const MoodLogging = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const moods = useSelector((state) => state.mood.moods);
  const [moodValue, setMoodValue] = useState(5);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    dispatch(getMoods(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchSessions();
  }, [userId]);

  const emoticons = [
    "😭",
    "😢",
    "😔",
    "😐",
    "🙂",
    "😀",
    "😄",
    "😁",
    "😆",
    "😍",
  ];

  const handleMoodLogging = async (e) => {
    e.preventDefault();
    try {
      const moodData = {
        mood: moodValue,
        userId,
        date: new Date(),
      };
      await dispatch(createMood(moodData));
      await dispatch(getMoods(userId));
      const isMoodDown = checkForMoodDownturn(moods);
      if (isMoodDown) {
        alert(
          "Your mood has been consistently down. It's recommended that you meet with a psychiatrist."
        );
        openSchedulePopup();
      } else {
        alert("Mood logged successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkForMoodDownturn = (moods, threshold = 3, seriousThreshold = 2) => {
    const recentMoods = moods.slice(-threshold);
    const seriousMoodLevels = [1, 2];
    const lowMoods = recentMoods.filter((mood) =>
      seriousMoodLevels.includes(mood.mood)
    );

    return lowMoods.length >= seriousThreshold;
  };

  const openSchedulePopup = () => {
    setShowSchedulePopup(true);
  };

  const handleScheduleSubmit = async (freeTime) => {
    const generatedSchedule = generateSchedule(freeTime);
    const googleMeetLink = generateGoogleMeetLink();

    const newSession = await saveSessionToDatabase(
      userId,
      generatedSchedule,
      googleMeetLink
    );

    if (newSession) {
      fetchSessions(); // Fetch updated sessions after adding a new one
    }

    setShowSchedulePopup(false);

    alert(
      `Session scheduled at ${generatedSchedule} with Google Meet link: ${googleMeetLink}`
    );
  };

  const generateSchedule = (freeTime) => {
    // Generate schedule based on freeTime
    return `Monday 4:00 PM - 5:00 PM`;
  };

  const generateGoogleMeetLink = () => {
    return `https://meet.google.com/abc-defg-hij`;
  };

  const fetchSessions = async () => {
    try {
      const sessionsRef = firebase.firestore().collection("sessions");
      const querySnapshot = await sessionsRef
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

      const sessionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSessions(sessionsData);
    } catch (error) {
      console.error("Failed to fetch sessions", error);
    }
  };

  const saveSessionToDatabase = async (userId, schedule, meetLink) => {
    try {
      const sessionRef = firebase.firestore().collection("sessions");
      const newSession = {
        userId,
        schedule,
        meetLink,
        status: "Scheduled",
        // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await sessionRef.add(newSession);
      console.log("Session saved with ID: ", docRef.id);

      return { id: docRef.id, ...newSession };
    } catch (error) {
      console.error("Failed to save session: ", error.message);
      console.error("Error details: ", error); // Additional error details
    }
  };

  const valueLabelFormat = (value) => emoticons[value - 1];

  const emojiVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <Box className="mood-logging-container" sx={{ paddingTop: 2 }}>
        <Typography variant="h2" fontWeight="bold">
          Mood Tracker
        </Typography>
        <Typography variant="body1" component={"span"} gutterBottom>
          Select your mood:{" "}
        </Typography>{" "}
        <Typography component={"span"} style={{ fontSize: "2rem" }}>
          {emoticons[moodValue - 1]}
        </Typography>
        <Grow in>
          <Slider
            value={moodValue}
            min={1}
            max={10}
            step={1}
            onChange={(e, value) => setMoodValue(value)}
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
          />
        </Grow>
        <Button
          variant="contained"
          onClick={handleMoodLogging}
          className="log-mood-button"
        >
          Log Mood
        </Button>
      </Box>

      <SchedulePopup
        open={showSchedulePopup}
        onClose={() => setShowSchedulePopup(false)}
        onSubmit={handleScheduleSubmit}
      />

      <SessionsPage sessions={sessions} />
    </div>
  );
};

const SchedulePopup = ({ open, onClose, onSubmit }) => {
  const [freeTime, setFreeTime] = useState("");

  const handleSubmit = () => {
    onSubmit(freeTime);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Schedule Psychiatric Session</DialogTitle>
      <DialogContent>
        <TextField
          label="Enter your free time (e.g., Monday 3 PM - 5 PM)"
          fullWidth
          variant="outlined"
          value={freeTime}
          onChange={(e) => setFreeTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SessionsPage = ({ sessions }) => {
  return (
    <div>
      <h2>Your Sessions</h2>
      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <p>
                <strong>Date:</strong> {session.schedule}
              </p>
              <p>
                <strong>Google Meet Link:</strong>{" "}
                <a
                  href={session.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Meeting
                </a>
              </p>
              <p>
                <strong>Status:</strong> {session.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions scheduled.</p>
      )}
    </div>
  );
};

export default MoodLogging;
