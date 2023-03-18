import React from "react";
import { useDispatch } from "react-redux";

export const Auth = ({title, emailValue, passwordValue, buttonTitle, handleEvent}) => {
	const dispatch = useDispatch();
	return(
		<div>
			<h1>{title}</h1>
			<form onSubmit={handleEvent}>
				<div>
					<label htmlFor="email">メールアドレス</label>
					<input
						type="email"
						name="email"
						value={emailValue}
						onChange={(e) => dispatch(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">パスワード</label>
					<input
						type="password"
						name="password"
						value={passwordValue}
						onChange={(e) => dispatch(e.target.value)}
					/>
				</div>
			</form>
			<button>{buttonTitle}</button>
		</div>
	)
}
