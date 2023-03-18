/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import { registerUser } from "../stores/authSlice";

export const Register = () => {

	const [userInfo, setUserInfo] = useState({ email: '', password: '' , name: ''});
	const [usre, setUser] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const register = await dispatch(registerUser(userInfo))
		if (registerUser.fulfilled.match(register)) {
			setUserInfo(() => ({ email: '', password: '', name: ''}));
		} else {

		}
	}

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
	}, []);


	const box = css`
		max-width: 500px;
		margin: 150px auto 0px;
	`
	const title = css`
		margin-bottom: 3rem;
	`
	const form = css`
		width: 40%;
		margin: 0 auto 1rem;
	`

	const input = css`
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	`

	const button = css`
		color: #7ec0d4;
		background-color: #fff;
		border: solid 1px #7ec0d4;
		border-radius: 4px;
		padding: 4px 8px;

		&:hover {
			color: #fff;
			background-color: #7ec0d4;
			cursor: pointer;
		}
	`




	return(
		<div css={box}>
			<h1 css={title}>新規登録</h1>
			<form css={form} onSubmit={handleSubmit}>
				<div css={input}>
					<label htmlFor="name">ユーザー名</label>
					<input
						type="name"
						name="name"
						value={userInfo.name}
						onChange={(e) => {setUserInfo((state) => ({...state, name: e.target.value}))}}
					/>
				</div>
				<div css={input}>
					<label htmlFor="email">メールアドレス</label>
					<input
						type="email"
						name="email"
						value={userInfo.email}
						onChange={(e) => {setUserInfo((state) => ({...state, email: e.target.value}))}}
					/>
				</div>
				<div css={input}>
					<label htmlFor="password">パスワード</label>
					<input
						type="password"
						name="password"
						value={userInfo.password}
						onChange={(e) => {setUserInfo((state) => ({...state, password: e.target.value}))}}
					/>
				</div>
				<butto css={button}>新規登録</butto>
			</form>
				<Link to="">ログインはこちら</Link>
		</div>
	)
}
