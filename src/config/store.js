import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import debounce from "../utils/debounce";
import { saveState, loadState } from "./browser-storage";

// Slice
import userReducer from "../features/user/state/userSlice";

// API
import { authApi } from "../features/auth/api/authApi";
import { userApi } from "../features/user/api/userApi";
import { messageApi } from "../features/message/api/messageApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    userState: userReducer,
  },
  preloadedState: loadState(),
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      messageApi.middleware,
    ]),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

const debouncedSearchData = debounce(() => {
  saveState(store.getState());
}, 3000);

store.subscribe(() => {
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  // Call the debounced
  debouncedSearchData();
});

setupListeners(store.dispatch);
