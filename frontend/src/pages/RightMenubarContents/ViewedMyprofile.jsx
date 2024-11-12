/* eslint-disable no-unused-vars */
import React from "react";
import "./ViewedMyprofile.css"; // Ensure this path is correct
import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";

// Sample user data for demonstration purposes
const users = [
	{
		name: "Sithara Nair",
		bio: "A passionate traveler and foodie.",
		img: "1.webp",
	},
	{
		name: "Akhil Kumar",
		bio: "Tech enthusiast and cricket lover.",
		img: "3.jpeg",
	},
	{
		name: "Meera Patel",
		bio: "Yoga instructor and nature lover.",
		img: "1.webp",
	},
	{
		name: "Ravi Menon",
		bio: "Photographer and art enthusiast.",
		img: "3.jpeg",
	},
	{ name: "Anjali Nair", bio: "Bookworm and music fan.", img: "1.webp" },
];

// Function to group users by their first letter
const groupUsersByLetter = (users) => {
	return users.reduce((acc, user) => {
		const letter = user.name.charAt(0).toUpperCase();
		if (!acc[letter]) acc[letter] = [];
		acc[letter].push(user);
		return acc;
	}, {});
};

const ViewedMyprofile = () => {
	const navigate = useNavigate();

	const handleNavigation = (page) => {
		navigate(`/${page}`);
	};

	const groupedUsers = groupUsersByLetter(users);

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="viewedmyprofile-container">
					<header className="header">
						<IoSearchCircle className="search-icon" />
						<h1 className="header-title">Viewed My profile</h1>
					</header>
					<div className="user-list">
						{Object.keys(groupedUsers)
							.sort()
							.map((letter) => (
								<div key={letter} className="letter-group">
									<h2 className="letter-heading">{letter}</h2>
									{groupedUsers[letter].map((user, index) => (
										<div key={index} className="user-card">
											<img
												src={require(`../../assets/${user.img}`)}
												alt={user.name}
												className="profile-pic"
											/>
											<div className="user-info">
												<div className="user-name">
													{user.name}
												</div>
												<div className="user-bio">
													{user.bio}
												</div>
											</div>
											<div className="flex items-center space-x-4">
												<CiHeart className="text-2xl text-red-500 cursor-pointer hover:text-red-700" />
												<IoClose className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700" />
											</div>
										</div>
									))}
								</div>
							))}
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
};

export default ViewedMyprofile;
