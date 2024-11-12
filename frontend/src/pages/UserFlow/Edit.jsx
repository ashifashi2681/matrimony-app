/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from "react";
import {
	AiOutlineArrowLeft,
	AiOutlinePlus,
	AiOutlineCamera,
} from "react-icons/ai";
import Avatar from "../../assets/Avatar.png";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axio/axiosInstance";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContexts";

const EditProfile = () => {

	const { profileEdit } = useContext(UserContext);
	const navigate = useNavigate()

	//====================================================

	const [userData, setUserData] = useState(null)
	// console.log(userData)

	const fetchData = async () => {
		try {
			const res = await axiosInstance.get("/user");
			setUserData(res.data);
		} catch (error) {
			toast(error.response.data.message);
			console.log(error.message);
		}
	}

	useEffect(() => {
		fetchData()

	}, [])

	const morePics = userData?.user?.profile?.morePics ?? [];

	//========================================================
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		mobile: "",
		bio: "",
		morePics: [],
		profilePic: null
	});


	const handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("name", formData.name || userData?.user?.name);
		data.append("username", formData.username || userData?.user?.username);
		data.append("email", formData.email || userData?.user?.email);
		data.append("mobile", formData.mobile || userData?.user?.mobile);
		data.append("bio", formData.bio || userData?.user?.bio);

		if (formData.profilePic) {
			data.append("profilePic", formData.profilePic);
		}
		// else if (userData?.user?.profile?.profilePic) {
		// 	data.append("profilePic", userData?.user?.profile?.profilePic);
		// }

		if (formData.morePics.length > 0) {
			Array.from(formData.morePics).forEach((file) => {
				data.append("morePics", file);
			});
		}
		//  else if (userData?.user?.profile?.morePics?.length > 0) {
		// 	userData.user.profile.morePics.forEach((pic) => {
		// 		data.append("morePics", pic);
		// 	});
		// }

		profileEdit(data);
	};


	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="w-full  bg-[#4b164c]  overflow-hidden shadow-xl">
						{/* Header section */}
						<div className="px-6 py-4 h-32">
							<div className="flex items-center">
								<button
									className="w-8 h-8 rounded-full border border-white flex items-center justify-center mr-4"
									onClick={() => navigate(-1)}>
									<AiOutlineArrowLeft className="w-5 h-5 text-white" />
								</button>
								<h1 className="text-2xl font-bold text-white ml-4  pt-14 pl-14">
									Edit My Profile
								</h1>
							</div>
						</div>

						{/* Form section */}
						<div className="bg-white text-black rounded-t-3xl p-6">
							<div className="flex items-center mb-6">
								<div className="relative mr-4">
									<img
										src={userData?.user?.profile?.profilePic}
										alt="Profile"
										className="w-20 h-20 rounded-full object-cover"
									/>
									<label
										htmlFor="profile-image-upload"
										className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer transition-opacity opacity-0 hover:opacity-100">
										<AiOutlineCamera className="w-8 h-8 text-white" />
									</label>
									<input
										id="profile-image-upload"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(e) =>
											setFormData({
												...formData,
												profilePic: e.target.files[0],
											})
										}
									/>
								</div>
								<div>
									<h2 className="text-xl font-bold">
										{userData?.user?.name}
									</h2>
									<p className="text-gray-500"></p>
								</div>
							</div>

							<p className="text-sm text-gray-600 mb-6">
								All your account information can be accessed and
								edited here, but your email will remain uneditable.
							</p>



							<div>
								<label className="block text-sm font-medium mb-1">
									Name
								</label>
								<input
									type="text"
									placeholder={userData?.user?.name}

									name="name"
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
									className="w-full border-b-2 border-[#4b164c] focus:border-[#4b164c] outline-none py-1"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									Username
								</label>
								<input
									type="text"
									name="username"
									placeholder={userData?.user?.username}
									onChange={(e) =>
										setFormData({
											...formData,
											username: e.target.value,
										})
									}
									className="w-full border-b-2 border-[#4b164c] focus:border-[#4b164c] outline-none py-1"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									Email
								</label>
								<input
									type="email"
									name="email"
									placeholder={userData?.user?.email}

									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									className="w-full border-b-2 border-[#4b164c] focus:border-[#4b164c] outline-none py-1"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									PhoneNumber
								</label>
								<input
									type="text"
									name="phonenumber"
									placeholder={userData?.user?.mobile}
									onChange={(e) =>
										setFormData({
											...formData,
											mobile: e.target.value,
										})
									}
									className="w-full border-b-2 border-[#4b164c] focus:border-[#4b164c] outline-none py-1"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									Bio
								</label>
								<input
									type="text"
									name="bio"
									placeholder={userData?.user?.bio}
									onChange={(e) =>
										setFormData({
											...formData,
											bio: e.target.value,
										})
									}
									className="w-full border-b-2 border-[#4b164c] focus:border-[#4b164c] outline-none py-1"
								/>
							</div>


							<div>
								<label className="block text-sm font-medium mb-2">
									Images
								</label>
								<div className="flex space-x-2">
									{morePics.length > 0 ? (
										morePics.map((imageSrc, index) => (
											<img
												key={index}
												src={imageSrc}
												alt={`User image ${index}`}
												className="w-12 h-12 rounded-full"
											/>
										))
									) : (
										<p>No additional images available</p>
									)}
									<label className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
										<input
											type="file"
											className="opacity-0 absolute cursor-pointer"
											multiple
											accept="image/*"
											onChange={(e) =>
												setFormData({
													...formData,
													morePics: [
														...formData.morePics,
														...e.target.files,
													],
												})
											}
										/>
										<AiOutlinePlus className="w-6 h-6 text-gray-600" />
									</label>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Reels
								</label>
								<div className="flex space-x-2">
									{[1, 2].map((i) => (
										<img
											key={i}
											src={Avatar}
											alt="Reel"
											className="w-12 h-12 rounded-full"
										/>
									))}
									<button
										type="button"
										className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
										<AiOutlinePlus className="w-6 h-6 text-gray-600" />
									</button>
								</div>
							</div>

							<button
								type="button"
								className="text-black font-medium"
								onClick={() =>
									navigate("/user-profile/change-password")
								}>
								Change Password
							</button>
							<div className="flex justify-center mt-6">
								<button
									type="submit"
									className="px-4 py-2 w-56 h-14 bg-[#4b164c] text-white rounded-full text-sm font-bold">
									Update
								</button>
							</div>

						</div>
					</div>
				</form>
			</div>
			<RightMenu />
		</div>
	);
};

export default EditProfile;
