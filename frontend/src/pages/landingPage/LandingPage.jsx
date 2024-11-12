/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import "./landingPaged.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import landingImg from "../../assets/landing.svg";
import axiosInstance from "../../axio/axiosInstance";

function LandingPage() {
	const navigate = useNavigate();
	const handleGoogleLoging = async () => {
		window.open("http://localhost:8080/auth/google", "_self");
	};

	useEffect(() => {
		// Check if the URL has token and user data
		const params = new URLSearchParams(window.location.search);
		const user = params.get("user");

		if (user) {
			localStorage.setItem("userData", JSON.stringify(user));

			// Navigate to the homepage or desired location
			navigate("/");
		}
	}, [navigate]);

	const handlePhoneLoging = () => {
		navigate("/landing/otp");
	};
	return (
		<div className="landing-section">
			<div className="landing">
				<div className="landing-img">
					<img src={landingImg} alt="landing image" />
				</div>
				<div className="landing-details">
					<h4>Let's meeting new people around you</h4>
					<div className="auth-section">
						<button
							className="login-with-phone"
							onClick={handlePhoneLoging}>
							<span>
								<FaPhoneVolume />
							</span>
							Login With Phone
						</button>

						<button
							onClick={handleGoogleLoging}
							className="login-with-google">
							<span>
								<FcGoogle />
							</span>
							Login With Google
						</button>
					</div>
					<p>
						Don't have an account?{" "}
						<NavLink to="register">Sign Up</NavLink>
					</p>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

export default LandingPage;
