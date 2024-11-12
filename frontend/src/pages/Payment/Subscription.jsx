import React from "react";
import { FaAngleLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";

function Subscription() {
	const navigate = useNavigate();
	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full bg-black">
				<div className="bg-[#4b164c] py-8 grid grid-cols-3 lg:px-4">
					<span
						onClick={() => navigate(-1)}
						className="w-10 h-10 rounded-full grid place-content-center text-fs-lg  text-white border border-white cursor-pointer ">
						<FaAngleLeft />
					</span>
					<p className=" text-white text-fs-lg whitespace-nowrap place-self-center">
						Subscription Plan
					</p>
				</div>
				<div className="bg-[#4b164c] ">
					<div className=" px-8 bg-black text-white rounded-t-3xl pt-8 pb-24">
						<div className="flex items-center gap-5 md:flex-col md:items-start md:gap-1 md:pl-4">
							<p className="text-fs-lg leading-snug whitespace-nowrap">
								Prime Member
							</p>
							<span className="text-fs-xxl font-bold whitespace-nowrap">
								$79
								<span className="font-normal text-fs-xl">
									/-month
								</span>
							</span>
						</div>
						<div>
							<div className="border-b py-4 mt-3">
								<div className="flex items-center gap-2">
									<span className="text-fs-base">
										<FaCheckCircle />
									</span>
									<p className="text-fs-sm text-[#ffffffc0] ">
										Daily Limits
									</p>
								</div>
								<ul className="pl-10">
									<li className="text-fs-sm text-[#ffffffc0]">
										View up to 15 profiles per day
									</li>
									<li className="text-fs-sm text-[#ffffffc0]">
										send up to 15 requests per day
									</li>
								</ul>
							</div>
							<div className="border-b py-4">
								<div className="flex items-center gap-2">
									<span className="text-fs-base">
										<FaCheckCircle />
									</span>
									<p className="text-fs-sm text-[#ffffffc0] ">
										Weekly Limits
									</p>
								</div>
								<ul className="pl-10">
									<li className="text-fs-sm text-[#ffffffc0]">
										View up to 90 profiles per day
									</li>
									<li className="text-fs-sm text-[#ffffffc0]">
										send up to 90 requests per day
									</li>
								</ul>
							</div>
							<div className="border-b py-4">
								<div className="flex items-center gap-2">
									<span className="text-fs-base">
										<FaCheckCircle />
									</span>
									<p className="text-fs-sm text-[#ffffffc0] ">
										Monthly Limits
									</p>
								</div>
								<ul className="pl-10">
									<li className="text-fs-sm text-[#ffffffc0]">
										View up to 300 profiles per day
									</li>
									<li className="text-fs-sm text-[#ffffffc0]">
										send up to 300 requests per day
									</li>
								</ul>
							</div>
							<div className="border-b py-4 last:border-none">
								<div className="flex items-center gap-2">
									<span className="text-fs-base">
										<FaCheckCircle />
									</span>
									<p className="text-fs-sm text-[#ffffffc0] ">
										Premium Features
									</p>
								</div>
								<ul className="pl-10">
									<li className="text-fs-sm text-[#ffffffc0]">
										Unlock Unlimited Messages
									</li>
									<li className="text-fs-sm text-[#ffffffc0]">
										Unlock Shortilst Page
									</li>
									<li className="text-fs-sm text-[#ffffffc0]">
										View Profiles who Shortilsted You
									</li>
									<li className="text-fs-sm text-[#ffffffc0]">
										Sort & filter Profiles
									</li>
								</ul>
							</div>
						</div>

						<div className="flex justify-center py-10">
							<button className="bg-[#323232] text-fs-md text-[#989898] font-semibold py-2 px-20 rounded-lg cursor-pointer">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
}

export default Subscription;
