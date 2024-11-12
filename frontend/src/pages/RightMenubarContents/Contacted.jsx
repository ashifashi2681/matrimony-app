import React, { useEffect, useState } from "react";
import "./Contacted.css";
import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import axiosInstance from "../../axio/axiosInstance";
import { toast } from "react-toastify";

const Contacted = () => {
	const navigate = useNavigate();
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get("/message/get/contact");
				setData(res.data.requestAcceptedConversations);
			} catch (error) {
				console.log(error.message);
				toast(error?.response?.data?.message);
			}
		};

		fetchData();
	}, []);

	console.log(data);
	// grouping users by first letter
	const groupedUsers = data?.reduce((acc, user) => {
		const firstLetter = user?.participants[0].name[0].toUpperCase();

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
				<div className="contacted-container">
					<header className="header">
						<IoSearchCircle className="search-icon" />
						<h1 className="header-title">Contacted</h1>
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
															user
																?.participants[0]
																?.profile
																.profilePic
														}
														alt={
															user
																?.participants[0]
																?.name
														}
														className="profile-pic"
													/>
													<div className="user-info">
														<div className="user-name">
															{
																user
																	?.participants[0]
																	?.name
															}
														</div>
														<div className="user-bio">
															{
																user
																	?.participants[0]
																	?.bio
															}
														</div>
													</div>

													{/* <div className="flex items-center space-x-4">
														<CiHeart className="text-2xl text-red-500 cursor-pointer hover:text-red-700" />
														<IoClose className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700" />
													</div> */}
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

export default Contacted;
