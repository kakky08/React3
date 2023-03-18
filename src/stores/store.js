import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// storeにreducerをいれていく
export const store = configureStore({
	reducer: {
		auth: authSlice
	},
});
