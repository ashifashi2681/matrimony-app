import React, { useEffect, useState } from "react";
import "./AcceptPage.css"; // Ensure this path is correct
import { FiPhoneIncoming, FiPhoneMissed } from "react-icons/fi";
import { BiPhoneOutgoing } from "react-icons/bi";
import { LuPhoneCall } from "react-icons/lu";
import { CiVideoOn } from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import LeftMenu from "../../components/LeftMenu";

import RightMenu from "../../components/RightMenu";
import { toast } from "react-toastify";
import axiosInstance from "../../axio/axiosInstance";

const AcceptPage = () => {
	const [data, setData] = useState();
	// api call
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get("/request/accept");
				setData(res.data.requests);
			} catch (error) {
				console.log(error.message);
				toast(error?.response?.data?.message);
			}
		};

		fetchData();
	}, []);

	// grouping users by first letter
	const groupedUsers = data?.reduce((acc, user) => {
		const firstLetter = user.sender.name[0].toUpperCase();

		if (!acc[firstLetter]) {
			acc[firstLetter] = [];
		}
		acc[firstLetter].push(user);
		return acc;
	}, {});

	const getCallIcon = (status) => {
		switch (status) {
			case "incoming":
				return <FiPhoneIncoming className="call-icon incoming" />;
			case "outgoing":
				return <BiPhoneOutgoing className="call-icon outgoing" />;
			case "missed":
				return <FiPhoneMissed className="call-icon missed" />;
			default:
				return null;
		}
	};

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="accept-requests-container">
					<header className="header">
						<IoSearchCircle className="search-icon" />
						<h1 className="header-title text-white">Accept</h1>
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
														src={user?.sender?.profile?.profilePic}
														alt={user?.sender?.name}
														className="profile-pic"
													/>
													<div className="user-info">
														<div className="user-name">
															{user.sender.name}
														</div>
														<div className="call-details">
															{getCallIcon(
																"incoming"
															)}
															<span className="call-time">
																{
																	"user.callTime"
																}
															</span>
														</div>
													</div>
													<div className="action-icons">
														<LuPhoneCall className="action-icon" />
														<CiVideoOn className="action-icon" />
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

export default AcceptPage;
