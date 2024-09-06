import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const userSlice = createSlice({
  name: "user",
  initialState: storedUser || {
    id: null,
    username: null,
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    image: null,
    role: null,
    privacy: "public",
    twoFactorAuth: false,
    emailNotifications: true,
    smsNotifications: false,
    users: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.image = action.payload.image;
      state.role = action.payload.role;
      localStorage.setItem("user", JSON.stringify(state));
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.token = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.image = null;
      state.role = null;
      state.privacy = "public";
      state.twoFactorAuth = false;
      state.emailNotifications = true;
      state.smsNotifications = false;
      localStorage.removeItem("user");
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUserSettings: (state, action) => {
      const { privacy, twoFactorAuth, emailNotifications, smsNotifications } =
        action.payload;
      state.privacy = privacy;
      state.twoFactorAuth = twoFactorAuth;
      state.emailNotifications = emailNotifications;
      state.smsNotifications = smsNotifications;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { setUser, clearUser, setUsers, updateUserSettings } =
  userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
