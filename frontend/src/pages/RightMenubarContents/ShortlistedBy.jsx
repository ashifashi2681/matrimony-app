/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./ShortlisteddBy.css"; // Ensure this path is correct

import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import { toast } from "react-toastify";
import axiosInstance from "../../axio/axiosInstance";

const ShortlistedBy = () => {
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get(
					"/shortlist/shortlisted-by"
				);
        
				setData(res.data.shortlistedByUsers.shortlistedBy);
			} catch (error) {
				console.log(error.message);
				toast(error.response.data.message);
			}
		};

		fetchData();
	}, []);

	// grouping users by first letter
	const groupedUsers = data?.reduce((acc, user) => {
		const firstLetter = user?.name[0].toUpperCase();

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
				<div className="shortlistedby-container">
					<header className="header">
						<IoSearchCircle className="search-icon" />
						<h1 className="header-title">Shortlisted By</h1>
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
														src={user?.profile?.profilePic}
														alt={user?.name}
														className="profile-pic"
													/>
													<div className="user-info">
														<div className="user-name">
															{user?.name}
														</div>
														<div className="user-bio">
															{user?.bio}
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<CiHeart className="text-2xl text-red-500 cursor-pointer hover:text-red-700" />
														<IoClose className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700" />
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

export default ShortlistedBy;
