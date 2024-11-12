import React, { useEffect, useState } from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import RightMenu from "../../components/RightMenu";
import LeftMenu from "../../components/LeftMenu";
import ProfileCard1 from "../../components/ProfileCard1";
import axiosInstance from "../../axio/axiosInstance";
import { toast } from "react-toastify";

const HomePage = () => {
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	// console.log(data);


	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get("/user/users");

				setData(res.data.users);
			} catch (error) {
				console.log(error.message);
				toast(error?.response?.data?.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="mainpage ">
					<header className="header#">
						{/* <div className="logo">Buddy Pair</div> */}
						<div className="icons">
							{/* Placeholder for header icons */}
							{/* <div className="icon">Icon1</div> */}
							{/* <div className="icon">Icon2</div> */}
							{/* <div className="icon">Icon3</div> */}
						</div>
					</header>
					<div className="welcome-banner">
						{/* <h1>Welcome back, Eva!</h1> */}
						{/* <input type="text" className="search-bar" placeholder="Search..." /> */}

						{/* Tab Bar Container */}
						<div className="tab-bar-container">
							<nav className="tab-bar">
								<button
									onClick={() => navigate("/location")}
									className="tab">
									Location
								</button>
								<button
									onClick={() => navigate("/interest")}
									className="tab">
									Interests
								</button>
								<button
									onClick={() => navigate("/qualification")}
									className="tab">
									Qualification
								</button>
							</nav>
						</div>
						{/* <button className="find-matches">Find Matches</button> */}

						<section className="featured-profiles">
							{/* <h2>Featured Profiles</h2> */}
							<div className="grid grid-cols-4 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
								{data?.map((user) => (
									<ProfileCard1
										receiverId={user?._id}
										key={user?._id}
										imgSrc={user?.profile?.profilePic}
										name={user?.name}
										age={user.profile?.age}
										location={user?.profile?.location}
									/>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
};

export default HomePage;
