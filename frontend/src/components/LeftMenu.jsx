import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { LuMessageCircle } from "react-icons/lu";
import { NavLink, useLocation } from "react-router-dom";

function LeftMenu() {
	const location = useLocation();
	const validLocation = location.pathname.startsWith("/message/");
	return (
		<div
			className={`bg-[#4b164c] w-[30%] lg:w-fit relative ${validLocation ? "md:hidden": ""}`}>
			<div className="sticky top-5 md:fixed md:bottom-3 md:top-auto md:left-[50%] md:translate-x-[-50%] md:z-50 ">
				<p className="text-white text-fs-lg my-5 mx-6 after:content-['BuddiePair'] lg:after:content-['BP'] md:hidden"></p>

				<div className=" flex flex-col gap-1 px-2 md:flex-row md:bg-white md:shadow-md md:rounded-full md:overflow-hidden md:gap-5 md:py-1 sm:gap-3">
					<NavLink
						className={({ isActive }) =>
							isActive
								? "bg-[#a486a4] rounded-md md:bg-[#a486a4] md:rounded-full"
								: ""
						}
						to="/search">
						<div className="flex items-center gap-5 text-white cursor-pointer hover:bg-[#a486a4] transition p-3 rounded-md lg:justify-center md:rounded-full md:bg-[#dd88cf] md:w-5 md:h-5 md:p-6">
							<span className=" text-fs-lg">
								<IoSearchOutline />
							</span>
							<span className=" text-fs-base lg:hidden ">
								Search
							</span>
						</div>
					</NavLink>
					<NavLink
						to="/favourite"
						className={({ isActive }) =>
							isActive
								? "bg-[#a486a4] rounded-md md:bg-[#a486a4] md:rounded-full"
								: ""
						}>
						<div className="flex items-center gap-5 text-white cursor-pointer hover:bg-[#a486a4] transition p-3 rounded-md lg:justify-center md:rounded-full md:bg-[#dd88cf] md:w-5 md:h-5 md:p-6">
							<span className=" text-fs-md">
								<FaRegHeart />
							</span>
							<span className=" text-fs-base lg:hidden">
								Favourite
							</span>
						</div>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive
								? "bg-[#a486a4] rounded-md md:bg-[#a486a4] md:rounded-full"
								: ""
						}
						to="/">
						<div className="flex items-center gap-5 text-white cursor-pointer hover:bg-[#a486a4] transition p-3 rounded-md lg:justify-center md:rounded-full md:bg-[#dd88cf] md:w-5 md:h-5 md:p-6">
							<span className=" text-fs-md">
								<GoHomeFill />
							</span>
							<span className=" text-fs-base lg:hidden">
								Home
							</span>
						</div>
					</NavLink>

					<NavLink
						to="/rated"
						className={({ isActive }) =>
							isActive
								? "bg-[#a486a4] rounded-md md:bg-[#a486a4] md:rounded-full"
								: ""
						}>
						<div className="flex items-center gap-5 text-white cursor-pointer hover:bg-[#a486a4] transition py-3 px-3 rounded-md lg:justify-center md:rounded-full md:bg-[#dd88cf] md:w-5 md:h-5 md:p-6">
							<span className=" text-fs-md">
								<FaRegStar />
							</span>
							<span className=" text-fs-base lg:hidden">
								Rated
							</span>
						</div>
					</NavLink>

					<NavLink
						to="/message"
						className={({ isActive }) =>
							isActive
								? "bg-[#a486a4] rounded-md md:bg-[#a486a4] md:rounded-full"
								: ""
						}>
						<div className="flex items-center gap-5 text-white cursor-pointer hover:bg-[#a486a4] transition py-3 px-3 rounded-md lg:justify-center md:rounded-full md:bg-[#dd88cf] md:w-5 md:h-5 md:p-6">
							<span className=" text-fs-md">
								<LuMessageCircle />
							</span>
							<span className=" text-fs-base lg:hidden">
								Chat
							</span>
						</div>
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default LeftMenu;
