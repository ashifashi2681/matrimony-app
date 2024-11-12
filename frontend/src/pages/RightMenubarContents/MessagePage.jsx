import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";

import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import axiosInstance from "../../axio/axiosInstance";
import { NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const MessagePage = () => {
	const navigate = useNavigate()
	const [conversation, setConversation] = useState();
	// get all conversations by user
	useEffect(() => {
		const conversations = async () => {
			try {
				const res = await axiosInstance("/message");
				setConversation(res.data.conversations);
			} catch (error) {
				console.log(error.response.data);
			}
		};

		conversations();
	}, []);

	const extractTime = (timestamp) => {
		// Create a Date object from the timestamp
		const date = new Date(timestamp);

		// Extract the time from the Date object
		const time = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});

		return time;
	};

	return (
		<div className="flex bg-white min-h-screen">
			<LeftMenu />
			<div className="w-full text-white overflow-hidden">
				<div className="max-w-6xl mx-auto">
					{/* Purple Background Section */}
					<div className="bg-[#4b164c] w-full min-h-[min-h-screen]  p-0">
						{/* Header */}
						<div className="flex items-center justify-between py-4 border-b border-gray-200">
							<FaArrowLeft
								className="text-xl cursor-pointer"
								onClick={() => navigate(-1)}
							/>
							<h1 className="text-2xl font-bold text-center flex-1">
								Messages
							</h1>
						</div>

						{/* Sub-Header */}
						<div className="py-2">
							<h2 className="text-xl">Recent Messages</h2>
						</div>

						{/* Scrollable Profile Section */}
						<div className="relative ">
							<Swiper slidesPerView={"auto"} className="!px-4">
								{conversation?.map((user, index) => (
									<SwiperSlide
										key={index}
										className="!w-fit py-4">
										<div
											className={`relative w-24 h-24 bg-gray-200 rounded-lg mr-2 snap-center transition-transform transform hover:scale-105 hover:shadow-lg overflow-hidden`}>
											<img
												src={
													user.participants[0].profile
														?.profilePic
												}
												alt={user.participants[0].name}
												className="w-full h-full object-cover rounded-lg "
											/>
											<div className="absolute inset-0 flex flex-col items-center justify-center bg-red-600 bg-opacity-50 rounded-lg text-white opacity-0 hover:opacity-100 transition-opacity">
												<FaHeart className="text-3xl mb-2" />
												<div className="text-xl font-bold">
													32
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>

					{/* Messages List Section */}
					<div className="bg-white p-5 mt-4 rounded-lg ">
						{conversation?.map((user, index) => (
							<NavLink
								to={`/message/${user.participants[0]._id}`}>
								<div
									key={index}
									className="flex items-center mb-4 p-2 border border-gray-200 rounded-lg bg-white">
									<img
										src={
											user.participants[0].profile
												?.profilePic
										}
										alt={user.participants[0].name}
										className="w-12 h-12 rounded-full object-cover mr-4"
									/>
									<div className="flex-1">
										<div className="font-bold text-gray-800">
											{user.participants[0].name}
										</div>
										<div className="text-gray-600">
											{user.messages[0]?.message}
										</div>
									</div>
									<div className="flex flex-col items-center">
										{user.unread && (
											<span className="w-2.5 h-2.5 bg-pink-500 rounded-full mb-1"></span>
										)}
										<div className="text-gray-600">
											{extractTime(
												user.messages[0]?.createdAt
											)}
										</div>
									</div>
								</div>
							</NavLink>
						))}
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
};

export default MessagePage;
