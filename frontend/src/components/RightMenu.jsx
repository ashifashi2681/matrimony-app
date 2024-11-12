/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axiosInstance from "../axio/axiosInstance";
import { toast } from "react-toastify";


function RightMenu() {
	const [userData, setUserData] = useState(null)
	// console.log(userData)

	const fetchData = async () => {
		try {
			const res = await axiosInstance.get("/user");
			setUserData(res.data);
		} catch (error) {
			toast(error?.response?.data?.message);
			console.log(error.message);	
		}
	}

	useEffect(()=>{
		fetchData()

	},[])

	const location = useLocation();
	const navigate = useNavigate();
	const menuRef = useRef(null);
	const [openIndex, setOpenIndex] = useState(1);
	const [userShow, setUserShow] = useState(false);
	// const [notificationShow, setNotificationShow] = useState(false);
	const [menuShow, setMenuShow] = useState(false);
	const [clickCount, setClickCount] = useState(1);

	/* if url is not homepage then hide the navigation bar on mobile devices */
	const isHomePage = location.pathname !== "/";

	/* keep open sidbar dropdown once for a time */
	const handleClick = (index) => {
		setOpenIndex(index === openIndex ? "null" : index);
	};

	/* controll click on user profile icon mobile and desktop view */
	const isDesktopDevice = window.innerWidth >= 767;


	//logout function
	const logoutHandle = async () => {
		try {
			const res = await axiosInstance.post("/user/logout");
			toast(res.data.message);
			localStorage.removeItem("userData");
			navigate("/landing");
		} catch (error) {
			toast(error?.response?.data?.message);
			console.log(error.message);
		}
	}


	const handleProfileClick = () => {
		setClickCount(clickCount + 1);
		if (clickCount === 1) {
			setUserShow(true);
		}
		if (clickCount === 2) {
			setUserShow(false);
			navigate("/user-profile");
			setClickCount(1);
		}
		if (isDesktopDevice) {
			navigate("/user-profile");
			setUserShow(false);
		}
	};

	return (
		<div
			className={`bg-[#4b164c] w-[30%] lg:w-[40%] md:w-0 relative ${
				isHomePage ? "md:hidden" : ""
			}`}>
			<div
				className={` md:backdrop-blur-lg md:fixed inset-0 ${
					menuShow ? "md:block" : "hidden"
				} ${userShow ? "md:block" : "hidden"}`}></div>
			<div
				className={`sticky top-0 md:fixed md:top-2 md:left-0 md:right-0 h-screen md:h-auto overflow-y-auto${
					userShow
						? " md:left-8 md:rounded-lg glassmorhism-panel"
						: ""
				}`}>
				<span
					className={`hidden fixed text-white text-fs-xl top-4 right-4 cursor-pointer z-50 ${
						userShow ? "md:block" : ""
					} ${menuShow ? "md:block left-4 w-fit" : ""}`}
					onClick={() => {
						setUserShow(false);
						setMenuShow(false);
						setClickCount(1);
					}}>
					<IoIosCloseCircleOutline />
				</span>
				<div
					className={`flex items-center justify-around mt-6 mb-8 md:m-0 md:mx-3 md:relative ${
						userShow
							? "md:justify-start md:gap-3 md:pt-5 md:mb-5"
							: "md:justify-end"
					} ${menuShow ? "md:invisible" : ""}`}>
					{/* profile icon */}
					<div
						className="w-12 h-12 rounded-full border-4 border-[#fc5678] overflow-hidden"
						onClick={() => handleProfileClick()}>
						<img
							src={userData?.user?.profile?.profilePic}
							className="w-full h-full"
						/>
					</div>
					{/* profile name */}
					<div className={`${userShow ? "md:block" : "md:hidden"}`}>
						<p className="text-[#fa5075]">{userData?.user?.name}</p>
						<div className="flex items-center gap-2 text-nowrap text-[#f4c73e] text-fs-sm">
							<span>
								<FaCrown />
							</span>
							<span>Prime Member</span>
						</div>
						<p className="text-fs-xs text-green-400">Online</p>
					</div>
					{/* bell icon */}
					<div
						onClick={() => navigate("/notification")}
						className="relative border border-[#ffffff96] p-2 rounded-full md:absolute md:right-16 md:p-3 md:hidden">
						<span className="text-white text-fs-md">
							<CiBellOn />
						</span>
						<div className="w-2 h-2 rounded-full bg-red-500 absolute top-3 right-3"></div>
					</div>
				</div>

				{/* profile */}
				<ul
					className={`mx-4 mb-2 overflow-hidden ${
						userShow ? "md:h-auto" : "md:h-0"
					} `}>
					<li className=" text-white mb-2 ">
						<p
							className="bg-[#7a3557] text-fs-base py-2 px-4 rounded-md cursor-pointer "
							onClick={() => handleClick(1)}>
							My Profile
						</p>
						<ul
							className={`overflow-hidden ${
								1 === openIndex ? "open" : "close"
							}`}>
							<li>
								<NavLink
									to="/send-request"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Send Request
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/viewed-profile"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Viewed My Profile
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/accept-request"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Accept Request
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/reject"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Reject
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/received"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Received
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/short-listed-by"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Shortlisted By
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/short-listed"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Shortlisted
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/contacted"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Contacted
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/message"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Message
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/user-profile/settings"
									className={({ isActive }) =>
										isActive
											? "hover:bg-[#a486a4] bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
											: "hover:bg-[#a486a4] text-fs-sm  py-2 px-4 rounded-md transition w-full h-full block my-1"
									}>
									Settings
								</NavLink>
							</li>
						</ul>
					</li>
					{/* more options */}
					<li
						className={`text-white md:fixed  ${
							menuShow
								? "glassmorhism-panel backdrop-blur-sm md:right-8 md:top-2 md:left-0 md:rounded-lg md:pt-12 md:pb-4"
								: "md:left-3 md:top-4"
						}`}>
						<p
							className="bg-[#7a3557] text-fs-base py-2 px-4 rounded-md cursor-pointer md:hidden"
							onClick={() => handleClick(2)}>
							More
						</p>
						<span
							className={`text-fs-lg text-[#7a3557] font-bold after:content-['BuddyPair'] hidden md:flex md:items-center md:gap-2 absolute top-0 -z-10  ${
								userShow ? "invisible" : ""
							} ${menuShow ? "md:blur" : ""}`}
							onClick={() => setMenuShow(true)}>
							<GiHamburgerMenu />
						</span>
						<ul
							ref={menuRef}
							className={`overflow-hidden md:flex md:flex-col md:items-center md:px-3 ${
								2 === openIndex ? "open" : "close"
							} ${
								menuShow
									? "menu-open"
									: "menu-close md:invisible"
							}`}>
							<li className="hover:bg-[#a486a4] text-fs-sm py-2 px-4 rounded-md transition md:py-5 md:w-full md:text-center">
								<NavLink to="/dating">Dating</NavLink>
							</li>
							<li className="hover:bg-[#a486a4] text-fs-sm py-2 px-4 rounded-md transition md:py-5 md:w-full md:text-center">
								<NavLink to="/matrimony">Matrimony</NavLink>
							</li>
							<li className="hover:bg-[#a486a4] text-fs-sm py-2 px-4 rounded-md transition md:py-5 md:w-full md:text-center">
								<NavLink to="/ecommerce">E commerce</NavLink>
							</li>
							<li className="hover:bg-[#a486a4] text-fs-sm py-2 px-4 rounded-md transition md:py-5 md:w-full md:text-center">
								<NavLink to="/study-abroad">
									Study Abroad
								</NavLink>
							</li>
							<li className="hover:bg-[#a486a4] text-fs-sm py-2 px-4 rounded-md transition md:py-5 md:w-full md:text-center">
								<NavLink to="/job-portal">Job Portal</NavLink>
							</li>
						</ul>
					</li>
				</ul>

				{/* logout */}
				<div
				onClick={logoutHandle}
					className={`text-white flex items-center gap-3 justify-center text-fs-base border border-[#b65786] p-2 mx-4 rounded-md cursor-pointer hover:bg-[#7a3557] md:overflow-hidden ${
						!userShow ? "md:hidden" : "md:mb-6"
					} `}>
					<span>
						<MdLogout />
					</span>
					<p>Logout</p>
				</div>
			</div>
		</div>
	);
}

export default RightMenu;
