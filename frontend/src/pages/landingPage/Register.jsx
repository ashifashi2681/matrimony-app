import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSync } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "./register.css";
import UserContext from "../../context/UserContexts";

function Register() {
	const { registerUser } = useContext(UserContext);

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		mobile: "",
		password: "",
		confirmPassword: "",
		otp: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		registerUser(formData);

	};
	return (
		<div className="register-container">
			<div className="register">
				<p>Sign Up</p>
				<form
					className="form-container"
					action=""
					onSubmit={handleSubmit}>
					<label htmlFor="name">Name</label>
					<input
						onChange={(e) =>
							setFormData({ ...formData, name: e.target.value })
						}
						type="text"
						name="name"
						id="name"
						placeholder="Your Name"
					/>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						type="email"
						name="email"
						id="email"
						placeholder="Your Email"
					/>
					<label htmlFor="mobile">Mobile</label>
					<input
						onChange={(e) =>
							setFormData({ ...formData, mobile: e.target.value })
						}
						type="text"
						name="mobile"
						id="mobile"
						placeholder="Your Mobile Number"
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
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								confirmPassword: e.target.value,
							})
						}
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="Confirm Your Password"
					/>

					<div className="otp-container">
						<div className="otp">
							<span>Genarate OTP</span>
							<span>
								<IoSync />
							</span>
							<span>
								<IoIosCheckmarkCircleOutline />
							</span>
						</div>
						<input
							onChange={(e) =>
								setFormData({
									...formData,
									otp: e.target.value,
								})
							}
							type="text"
							placeholder="we send a code to Email/Phone"
						/>
					</div>
					<div className="form-btns">
						<button type="submit">Register</button>
						<button
							onClick={() => {
								navigate("/landing");
							}}>
							Social Media Login
						</button>
					</div>
					<p>
						Already have an account?{" "}
						<NavLink to="/landing/login">Login</NavLink>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Register;
