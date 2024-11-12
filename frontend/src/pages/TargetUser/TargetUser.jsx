import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { LuMousePointer2 } from "react-icons/lu";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import axiosInstance from "../../axio/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function TargetUser() {
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const { id } = useParams();

	const user = data?.find((user) => user._id === id);
	// console.log(user)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosInstance.get("/user/users");

				setData(res.data.users);
			} catch (error) {
				console.log(error.message);
				toast(error.response.data.message);
			}
		};
		fetchData();
	}, []);

	const [activeTab, setActiveTab] = useState("tab1");

	const handleTabClick = (tabName) => {
		console.log(`Switching to ${tabName}`);
		setActiveTab(tabName);
	};

	// const backgroundImageUrl = "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
	const backgroundImageUrl = user?.profile?.profilePic;
	console.log(backgroundImageUrl);

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full h-full">
				<div className="h-screen flex flex-col ">
					<div
						className="flex flex-col justify-between h-2/3"
						style={{
							backgroundImage: `url(${backgroundImageUrl})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}>
						<div className="flex justify-between">
							<button
								onClick={() => navigate(-1)}
								className="m-2 bg-white/10 backdrop-blur-lg border-slate-50 border-2 rounded-2xl">
								<IoIosArrowBack color="white" size="30px" />{" "}
							</button>
							<button className="bg-white/10 backdrop-blur-lg flex p-1 m-2 text-gray-50 border-slate-50 border-2 rounded-2xl">
								<LuMousePointer2
									style={{ transform: "scaleX(-1)" }}
									color="white"
									size="20px"
								/>
								2.5 Km
							</button>
						</div>
						<div
							className="pb-4 flex flex-col justify-center items-center"
							style={{
								background:
									"linear-gradient(to bottom, rgba(0, 0, 255, 0), rgb(134,25,143,0.9)",
							}}>
							<p className="text-3xl text-gray-50">
								{user?.name} ,<span>{user?.profile?.age}</span>
							</p>
							<p className="text-xl text-gray-50">
								{user?.profile?.location}
							</p>

							{/* <div className=' text-gray-50 bg-fuchsia-800 px-4 py-1 border-2 border-fuchsia-400 rounded-xl'><span>80%</span> match</div> */}

							<div className="flex items-center justify-center bg-purple-900 rounded-full px-4 py-1 border-2">
								<div className="relative">
									<div className="w-10 h-10 rounded-full bg-[conic-gradient(theme(colors.fuchsia.400)_80%,theme(colors.purple.800)_0%)] flex items-center justify-center">
										<div className="bg-purple-900 rounded-full py-2 px-0.5 text-xs text-white">
											80%
										</div>
									</div>
								</div>
								<span className="ml-3 text-white">Match</span>
							</div>
						</div>
					</div>

					<div className="bg-fuchsia-800 h-1/3  flex">
						<div className="w-full bg-white rounded-t-xl p-2">
							{/* Tabs Header */}
							<div className="flex border-b p-1 bg-fuchsia-200 border-gray-200 rounded-xl">
								<button
									className={`flex-1  text-center rounded-xl z-50 ${
										activeTab === "tab1"
											? "bg-white text-black"
											: "text-gray-500"
									} hover:border-blue-500 focus:outline-none`}
									onClick={() => handleTabClick("tab1")}>
									About
								</button>
								<button
									className={`flex-1  text-center rounded-xl z-50 ${
										activeTab === "tab2"
											? "bg-white text-black"
											: "text-gray-500"
									} hover:border-blue-500 focus:outline-none`}
									onClick={() => handleTabClick("tab2")}>
									Contact info
								</button>
							</div>
							{/* Tabs Content */}
							<div className="p-4 h-4/5 overflow-auto">
								{activeTab === "tab1" && (
									<div
										id="content-1"
										className="flex h-full flex-col">
										<div className="">
											<p className="text-sm sm:text-base">
												A good listener. I love having a
												good talk to know each other's
												side
											</p>
										</div>

										<div className="pt-3">
											<p className="text-slate-500 mb-3">
												Interest
											</p>
											<div className="flex flex-wrap justify-around">
												<div className="border-gray-300 border-2 py-1 px-4 rounded-xl">
													🍃 Nature
												</div>
												<div className="border-gray-300 border-2 py-1 px-4 rounded-xl">
													🌴 Travel
												</div>
												<div className="border-gray-300 border-2 py-1 px-4 rounded-xl">
													✍️ Writing
												</div>
											</div>
										</div>
									</div>
								)}
								{activeTab === "tab2" && (
									<div className="" id="content-2">
										<div className="">
											<p>Address</p>
											<p>
												House Name :{" "}
												<span>Manjali House</span>
											</p>
											<p>
												Address :{" "}
												<span>
													Thopumpadi PO, Ernakulam,
													Pin 620112
												</span>
											</p>
											<p>
												Mobile : <span>2596351248</span>
											</p>
											<p>
												Parent Contact :{" "}
												<span>4595351278</span>
											</p>
											<p>
												xxxxx :{" "}
												<span>xxxxxxxxxxxxx</span>
											</p>
											<p>
												xxxxx :{" "}
												<span>xxxxxxxxxxxxx</span>
											</p>
											<p>
												xxxxx :{" "}
												<span>xxxxxxxxxxxxx</span>
											</p>
										</div>
										<div>
											<p>Family Details</p>
											<p>
												xxxxx :{" "}
												<span>xxxxxxxxxxxxx</span>
											</p>
											<p>
												xxxxx :{" "}
												<span>xxxxxxxxxxxxx</span>
											</p>
											<p>
												xxxxx :{" "}
												<span>xxxxxxxxxxxxx</span>
											</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
}

export default TargetUser;
