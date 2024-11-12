import React, { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import ProfileCard2 from "../../components/profileCard2/ProfileCard2";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";

function ProfileGridPage({ data, title }) {

	
	
	const navigate = useNavigate();
	const [openFilter, setOpenFilter] = useState(false);
	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full my-0 mx-auto px-3 relative">
				<div className="sticky top-0 z-10 bg-[#fdf7fd] py-3">
					<div className="flex items-center justify-between mb-3">
						<span
							className=" text-fs-lg border-2 p-1 rounded-full cursor-pointer"
							onClick={() => {
								navigate("/");
							}}>
							<FiChevronLeft />
						</span>
						<p className="text-fs-lg font-bold">{title}</p>
						<span
							className="text-fs-lg border-2 p-1 rounded-full cursor-pointer"
							onClick={() => setOpenFilter(true)}>
							<VscSettings />
						</span>
					</div>
					<p className="text-fs-md font-medium ">
						Your Matches{" "}
						<span className="text-[#dd88cf]">{data?.length}</span>
					</p>
				</div>
				<div className="grid grid-cols-5 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-3 ">
					{data?.map((user, i) => (
						<ProfileCard2 key={i} data={user} />
					))}
				</div>
				<div
					className={`fixed inset-0 bg-[#0000003d] md:bg-[#4b164c] md:after:content-['Filter'] text-white text-fs-lg md:after:flex md:after:justify-center md:after:my-10 z-10  transition duration-400 ${
						openFilter ? "visible" : "invisible"
					}`}></div>
				<Filter openFilter={openFilter} setOpenFilter={setOpenFilter} />
			</div>
			<RightMenu />
		</div>
	);
}

export default ProfileGridPage;
