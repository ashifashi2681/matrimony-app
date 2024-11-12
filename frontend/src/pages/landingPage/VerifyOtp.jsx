import React, { useContext, useState } from "react";
import "./otp.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axio/axiosInstance";
import OtpContext from "../../context/OtpContext";

function VerifyOtp() {
	const { phoneNumber } = useContext(OtpContext);
	const navigate = useNavigate();

	const [otp, setOtp] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axiosInstance.post("/otp/verify-otp", {
				phoneNumber,
				otp,
			});

			if (res.data.profile) {
				toast(res.data.message);
				navigate("/landing/personal-details");
			}
			if (res.data.home) {
				toast(res.data.message);
				navigate("/");
			} else {
				toast(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast(error.response.data.message);
		}
	};

	return (
		<div className="phoneOtp-container">
			<div className="phoneOtp">
				<p>Verify OTP</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label htmlFor="number">Type otp here.</label>
					<input
						name="number"
						placeholder="otp here"
						onChange={(e) => setOtp(e.target.value)}
					/>
					<div className="form-btns">
						<button type="submit">Verify OTP</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default VerifyOtp;
