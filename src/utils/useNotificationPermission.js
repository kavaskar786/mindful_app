import { useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../utils/firebase";

const useNotificationPermission = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function requestNotificationPermission() {
      try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const messaging = firebase.messaging();
          const token = await messaging.getToken({
            vapidKey:
              "BCaL6zoYEiFaqNS8LxwhFJ560VVYYtM9mKIo5dLUaYDM8-XFTeJ-vHWKslhgptqEtu5KpNoWIaPAcm_JeRJnWSQ",
          });
          saveTokenToFirestore(token);
          console.log(token);
        } else {
          console.warn("Notification permission not granted.");
        }
      } catch (error) {
        console.error("Error getting notification permission:", error);
      }
    }

    async function saveTokenToFirestore(token) {
      try {
        const userId = user.uid;
        const userRef = firebase.firestore().collection("users").doc(userId);
        await userRef.update({
          notificationToken: token,
          data: {
            title: "New Message",
            body: "You have a new message!",
          },
        });
      } catch (error) {
        console.error("Error saving token to Firestore:", error);
      }
    }

    if (user) {
      requestNotificationPermission();
    }
  }, [user]);
};

export default useNotificationPermission;
