import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
}

const storedUser = (() => {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem("authUser") ?? "null");
  } catch {
    return null;
  }
})();

const initialState: AuthState = {
  user: storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    register: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authUser");
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
