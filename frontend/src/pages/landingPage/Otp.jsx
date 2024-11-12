import React, { useContext, useState } from "react";
import "./otp.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axio/axiosInstance";
import OtpContext from "../../context/OtpContext";


function Otp() {
	const { getMobileNumber } = useContext(OtpContext);
	const navigate = useNavigate();

	const [phoneNumber, setPhoneNumber] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axiosInstance.post("/otp", {phoneNumber});
			getMobileNumber(phoneNumber)
			if (res.data.success) {
				
				toast(res.data.message);
				navigate("/landing/verify-otp");
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
				<p>Send OTP</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label htmlFor="number">Type your phone number</label>
					<input
						name="number"
						type="number"
						// value={phoneNumber}
						placeholder="phone number"
						onChange={(e) => {
							setPhoneNumber(e.target.value);
						}}
					/>
					<div className="form-btns">
						<button type="submit">Send OTP</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Otp;
