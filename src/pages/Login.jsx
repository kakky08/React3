import React, { useState } from "react";

export const Login = () => {
	const [userName, setUserName] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');


	return(
		<div>
			<h1>ログインページ</h1>
			<form>
				<div>
					<label htmlFor="name">ユーザー名</label>
					<input
						type="name"
						name="name"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="email">メールアドレス</label>
					<input
						type="email"
						name="email"
						value={loginEmail}
						onChange={(e) => setLoginEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">パスワード</label>
					<input
						type="password"
						name="password"
						value={loginPassword}
						onChange={(e) => setLoginPassword(e.target.value)}
					/>
				</div>
			</form>
			<button>ログイン</button>
		</div>
	)
}
