import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
import UserContext from "../../context/UserContexts";

function Login() {
	const { loginUser } = useContext(UserContext);
	const [formData, setFormData] = useState({
		email: "",
		mobile: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser(formData);
	};

	return (
		<div className="login-container">
			<div className="login">
				<p>Login</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label htmlFor="email">Email/Mobile</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value,
								mobile: e.target.value,
							})
						}
						type="text"
						name="email"
						id="email"
						placeholder="Your Email/Mobile Number"
					/>

					<label htmlFor="password">Password</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								password: e.target.value,
							})
						}
						type="password"
						name="password"
						id="password"
						placeholder="Password"
					/>

					<div className="form-btns">
						<button type="submit">Login</button>
					</div>
					<p className="forgot-pasword">Forgot Password</p>
					<p>
						Don't have an account?{" "}
						<NavLink to="/landing/register">Sign Up</NavLink>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
