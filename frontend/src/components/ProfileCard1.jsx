/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axio/axiosInstance";
import { toast } from "react-toastify";

function ProfileCard1({ imgSrc, name, age, location, receiverId }) {
	const [show, setShow] = useState(false);
	// send request
	const handleSendRequest = async () => {
		setShow(false);
		try {
			const res = await axiosInstance.post("/request/send", {
				receiverId,
			});
			toast(res.data.message);
		} catch (error) {
			toast(error.response.data.message);
		}
	};

	const handleShortList = async () => {
		try {
			const res = await axiosInstance.post(`shortlist/${receiverId}`);
			toast(res.data.message);
		} catch (error) {
			toast(error.response.data.message);
		}
	};

	const navigate = useNavigate();
	return (
		<div className=" rounded-3xl h-44 md:h-40 overflow-hidden relative shadow-md">
			<div
				onClick={() => navigate(`/target-profile/${receiverId}`)}
				className="absolute inset-0  custom-gradient"></div>
			<img className="w-full h-full object-cover" src={imgSrc} />
			<div className="absolute top-3 left-3 text-white border px-3 lg:px-2 md:px-1 rounded-xl backdrop-blur text-fs-xs">
				<span>Online</span>
			</div>
			<div className="absolute -right-2 top-[50%] translate-y-[-50%] flex flex-col backdrop-blur bg-[#b9b9b98a] px-3 py-1 lg:py-0 rounded-ss-2xl rounded-l-2xl">
				<span
					onClick={handleShortList}
					className="text-white text-fs-sm w-9 h-6 lg:w-8 grid place-content-center bg-[#ffffff81] rounded-[50%] my-1 cursor-pointer">
					<AiFillLike />
				</span>
				<span
					onClick={() => navigate(`/message/${receiverId}`)}
					className="text-white text-fs-sm w-9 h-6 lg:w-8 grid place-content-center bg-[#ffffff81] rounded-[50%] my-1">
					<BiMessageRounded />
				</span>
				<span
					onClick={() => setShow(!show)}
					className="text-white text-fs-sm w-9 h-6 lg:w-8 grid place-content-center bg-[#ffffff81] rounded-[50%] my-1 relative cursor-pointer">
					<SlOptions />
					<button
						onClick={handleSendRequest}
						className={`absolute right-10 bg-white py-1 px-2 rounded-lg text-gray-500 text-fs-xs border-none whitespace-nowrap shadow-2xl cursor-pointer transition ${
							show ? "visible" : "invisible"
						}`}>
						Send Request
					</button>
				</span>
				<div className="absolute bg-white w-[3px] h-5 rounded-md top-[50%] translate-y-[-50%] left-1"></div>
			</div>
			<div className="absolute bottom-0 flex flex-col items-center w-full">
				<div className="flex w-full justify-around items-center">
					<p className="text-fs-sm text-white leading-3">{name}</p>
					<span className="text-fs-xs text-[#ffffffbe]">
						{age}YRS
					</span>
				</div>
				<span className="text-fs-xs text-[#ffffffbe]">{location}</span>
			</div>
		</div>
	);
}

export default ProfileCard1;
