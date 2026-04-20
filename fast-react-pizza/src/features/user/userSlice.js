// import { getAddress } from "../../core/services/apiGeocoding";

import { createSlice } from "@reduxjs/toolkit";

// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// export async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

const initialState = {
  username: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name } = action.payload;
      state.username = name;
    },
    updateUser: (state, action) => {
      const { name } = action.payload;
      if (name !== undefined) state.username = name;
    },
    clearUser: (state) => {
      state.username = "";
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export const selectUsername = (state) => state.user.username;

export const selectIsLoggedIn = (state) => state.user.username !== "";

export const selectUser = (state) => state.user;

export default userSlice.reducer;
