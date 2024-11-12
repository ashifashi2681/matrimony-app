import { IoIosArrowBack } from "react-icons/io";
import { LuMousePointer2 } from "react-icons/lu";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../axio/axiosInstance";

function UserProfile() {

	const [userData, setUserData] = useState(null);

	const fetchData = async () => {
		try {
			const res = await axiosInstance.get("/user");
			setUserData(res.data);
		} catch (error) {
			toast(error.response.data.message);
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);


	const navigate = useNavigate();
	// const backgroundImageUrl ="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
	const backgroundImageUrl = userData?.user?.profile?.profilePic
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
								className="m-2 bg-white/10 backdrop-blur-lg border-slate-50 border-2 rounded-2xl"
								onClick={() => navigate(-1)}>
								<IoIosArrowBack color="white" size="30px" />{" "}
							</button>
							<button
								className="bg-white/10 backdrop-blur-lg flex p-1 m-2 text-gray-50 border-slate-50 border-2 rounded-2xl"
								onClick={() =>
									navigate("/user-profile/edit-profile")
								}>
								<LuMousePointer2
									style={{ transform: "scaleX(-1)" }}
									color="white"
									size="20px"
								/>
								Edit
							</button>
						</div>
						<div
							className="pb-4 flex flex-col justify-center items-center"
							style={{
								background:
									"linear-gradient(to bottom, rgba(0, 0, 255, 0), rgb(134,25,143,0.9)",
							}}>
							<p className="text-3xl text-gray-50">
								{userData?.user?.name} ,
								<span>{userData?.user?.profile?.age}</span>
							</p>
							<p className="text-xl text-gray-50">
								{userData?.user?.profile?.location}
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
								<span className="ml-3 text-white">
									Profile Complete
								</span>
							</div>
						</div>
					</div>

					<div className="bg-fuchsia-800 h-1/3  flex">
						<div className="w-full bg-white rounded-t-xl p-2">
							<div className="p-4 h-4/5 overflow-auto">
								<div
									id="content-1"
									className="flex h-full flex-col">
									<div className="">
										<p className="text-sm sm:text-base">
											A good listener. I love having a
											good talk to know each other's side
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
							</div>
						</div>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
}

export default UserProfile;
