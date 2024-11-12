import React, { useEffect, useState } from "react";
import "./RejectPage.css"; // Ensure this path is correct
import { IoClose, IoSearchCircle } from "react-icons/io5";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import axiosInstance from "../../axio/axiosInstance";
import { toast } from "react-toastify";

const RejectPage = () => {
	const [data, setData] = useState();

	// api call
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get("/request/reject");
				setData(res.data.requests);
			} catch (error) {
				console.log(error.message);
				toast(error.response.data.message);
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

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="reject-container">
					<header className="header">
						<IoSearchCircle className="search-icon" />
						<h1 className="header-title">Reject</h1>
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

export default RejectPage;
