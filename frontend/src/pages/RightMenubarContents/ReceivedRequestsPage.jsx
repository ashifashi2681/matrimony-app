import React, { useEffect, useState } from "react";
import "./ReceivedRequestsPage.css"; // Ensure this path is correct
import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import axiosInstance from "../../axio/axiosInstance";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ReceivedRequestsPage = () => {
	const navigate = useNavigate();

	const [data, setData] = useState();

	// api call
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get("/request/received");
				setData(res.data.requests);
			} catch (error) {
				console.log(error.message);
				toast(error?.response?.data?.message);
			}
		};

		fetchData();
	}, [data]);

	// accept request
	const handleAccept = async (requestId) => {
		try {
			const res = await axiosInstance.post(
				`/request/accept/${requestId}`
			);
			toast.success(res.data.message);
		} catch (error) {
			console.log(error.message);
			toast(error.response.data.message);
		}
	};

	// reject request
	const handleReject = async (requestId) => {
		try {
			const res = await axiosInstance.post(
				`/request/reject/${requestId}`
			);
			toast.success(res.data.message);
		} catch (error) {
			console.log(error.message);
			toast(error.response.data.message);
		}
	};

	// grouping users by first letter
	const groupedUsers = data?.reduce((acc, user) => {
		const firstLetter = user.sender.name[0].toUpperCase();

		if (!acc[firstLetter]) {
			acc[firstLetter] = [];
		}
		acc[firstLetter].push(user);
		return acc;
	}, {});

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="received-requests-container">
					<header className="header">
						<IoSearchCircle className="search-icon" />
						<h1 className="header-title">Received</h1>
					</header>
					<div className="user-list">
						{groupedUsers &&
							Object.keys(groupedUsers).length > 0 &&
							Object.keys(groupedUsers)
								.sort()
								.map((letter) => (
									<div key={letter} className="letter-group">
										<h2 className="letter-heading">
											{letter}
										</h2>
										{groupedUsers[letter].map(
											(user, index) => (
												<div
													key={index}
													className="user-card">
													<img
														src={
															user?.sender
																?.profile
																?.profilePic
														}
														alt={user?.sender?.name}
														className="profile-pic"
													/>
													<div className="user-info">
														<div className="user-name">
															{user.sender.name}
														</div>
														<div className="user-bio">
															{user.sender.bio}
														</div>
													</div>
													<div className="flex items-center space-x-4">
														{user.status !==
															"rejected" && (
															<>
																{user.status ===
																"accepted" ? (
																	<FaHeart className="text-xl text-red-500 cursor-pointer hover:text-red-700" />
																) : (
																	<FaRegHeart
																		className="text-xl text-red-500 cursor-pointer hover:text-red-700"
																		onClick={() =>
																			handleAccept(
																				user._id
																			)
																		}
																	/>
																)}

																{user.status !==
																	"accepted" && (
																	<IoClose
																		className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
																		onClick={() =>
																			handleReject(
																				user._id
																			)
																		}
																	/>
																)}
															</>
														)}
													</div>
												</div>
											)
										)}
									</div>
								))}
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
};

export default ReceivedRequestsPage;
