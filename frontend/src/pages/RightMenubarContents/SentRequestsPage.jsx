import React, { useEffect, useState } from "react";
import "./SentRequestsPage.css"; // Ensure this path is correct
import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import axiosInstance from "../../axio/axiosInstance";
import { toast } from "react-toastify";

const SentRequestsPage = () => {
	const [data, setData] = useState();
	

	const handleDlt = async (requestId) => {
		try {
			const res = await axiosInstance.delete(
				`/request/send/${requestId}`
			);
			toast(res.data.message);
		} catch (error) {
			toast(error.response.data.message);
		}
	};


	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get("/request/send");
				setData(res.data.requests);
			} catch (error) {
				console.log(error.message);
				toast(error?.response?.data?.message);
			}
		};

		return () => {
			fetchData();
		};
	}, [data]);

	// grouping users by first letter
	const groupedUsers = data?.reduce((acc, user) => {
		const firstLetter = user?.receiver?.name[0].toUpperCase();

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
				<div className="sent-requests-container">
					<header className="header">
						<IoSearchCircle className="search-icon" />
						<h1 className="header-title">Sent</h1>
					</header>
					<div className="user-list">
						{groupedUsers &&
							Object.keys(groupedUsers).length > 0 &&
							Object.keys(groupedUsers)
								.sort()
								.map((letter, i) => (
									<div key={i} className="letter-group">
										<h2 className="letter-heading">
											{letter}
										</h2>
										{groupedUsers[letter].map(
											(user, index) => (
												<div
													key={index}
													className="user-card">
													<img
														src={user?.receiver?.profile?.profilePic}
														alt={user?.receiver?.name}
														className="profile-pic"
													/>
													<div className="user-info">
														<div className="user-name">
															{user.receiver.name}
														</div>
														<div className="user-bio">
															{user.receiver.bio}
														</div>
													</div>
													{user.status ===
														"pending" && (
														<div
															className="close-icon cursor-pointer"
															onClick={() => {
																handleDlt(
																	user._id
																);
															}}>
															<IoClose />
														</div>
													)}
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

export default SentRequestsPage;
