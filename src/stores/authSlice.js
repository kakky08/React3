import { Iterable } from 'immutable'
import { createAsyncThunk, createSerializableStateInvariantMiddleware, createSlice, isPlain } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import 'firebase/firestore';

const initialState = {
	user: {
		email: '',
		password: '',
		name: '',
	}
};

export const registerUser = createAsyncThunk(
	'registerUserThunk',
	async (state) => {
		const userCredential =  await createUserWithEmailAndPassword(
			auth,
			state.email,
			state.password,
		);
		const userInfo = {
			uid: userCredential.user.uid,
			displayName: state.name,
			email: userCredential.user.email,
		};
		await updateProfile(userCredential.user, { displayName: state.name })
		return userInfo;
	}
)

export const addUser = async (uid, name, email) => {
	await addDoc(collection(db, "users"), {
				uid: uid,
				username: name,
				email: email,
				tips: 100000,
			})
}

export const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value)
export const getEntries = (value) =>
	Iterable.isIterable(value) ? value.entries() : Object.entries(value)

export const serializableMiddleware = createSerializableStateInvariantMiddleware({
	isSerializable,
	getEntries,
})

const authSlice = createSlice({
	name: "auth",
	initialState,
	middleware: [serializableMiddleware],
	reducers: {
		setEmail: (state, action) => {
			state.user.email = action.payload
		},
		setPassword: (state, action) => {
			state.user.password = action.payload
		}
	},
	extraReducers: builder => {
		// 通信が開始
		builder.addCase(registerUser.pending, (state, action) => {})
		// 通信が失敗
		builder.addCase(registerUser.rejected, (state, action) => { })
		// 通信が成功
		builder.addCase(registerUser.fulfilled, async (state, action) => {
			state.user.email = action.payload.email;
			state.user.password = action.payload.password;
			state.user.name = action.payload.displayName;

			await addUser(action.payload.uid, action.payload.displayName, action.payload.email);
		})
	}
})

export const {
	setEmail,
	setPassword,
} = authSlice.actions;


export default authSlice.reducer;
