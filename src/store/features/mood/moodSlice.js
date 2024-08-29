import { createSlice } from "@reduxjs/toolkit";
import app from "../../../utils/firebase";

export const moodSlice = createSlice({
  name: "mood",
  initialState: {
    loading: false,
    moods: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMoods: (state, action) => {
      state.moods = action.payload;
    },
  },
});

export const { setLoading, setMoods } = moodSlice.actions;

// Serialize date before adding to Firestore
export const createMood = (moodData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const moodsCollection = app
        .firestore()
        .collection("users")
        .doc(moodData.userId)
        .collection("moods");

      // Serialize the date before storing
      const serializedMoodData = {
        ...moodData,
        date: moodData.date.toISOString(), // Convert Date object to string
      };

      await moodsCollection.add(serializedMoodData);
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };
};

// Deserialize date when retrieving from Firestore
export const getMoods = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const moodsCollection = app
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("moods");
      const querySnapshot = await moodsCollection
        .where("userId", "==", userId)
        .orderBy("date", "asc")
        .get();
      const moods = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Convert the date to a JS Date object if necessary
        let moodDate;
        if (data.date.toDate) {
          moodDate = data.date.toDate(); // Firestore Timestamp to JS Date
        } else {
          moodDate = new Date(data.date); // Already a JS Date or ISO string
        }

        moods.push({ id: doc.id, ...data, date: moodDate.toISOString() });
      });
      dispatch(setMoods(moods));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };
};

export default moodSlice.reducer;
