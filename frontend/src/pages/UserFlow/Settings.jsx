/* eslint-disable no-unused-vars */
import React from "react";
import {
	AiOutlineSearch,
	AiOutlineRight,
	AiOutlineHome,
	AiOutlineHeart,
	AiOutlineStar,
	AiOutlineMessage,
} from "react-icons/ai";
import {
	FiKey,
	FiBell,
	FiHelpCircle,
	FiDatabase,
	FiUserPlus,
} from "react-icons/fi";
import { TbMobiledata } from "react-icons/tb";
import { BsChatDots } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import { MdQrCodeScanner } from "react-icons/md";
import { GoKey } from "react-icons/go";
import Ellipse from "../../assets/Ellipse.png";
import Avatar from "../../assets/Avatar.png";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import { useNavigate } from "react-router-dom";

const Settings = () => {
	const navigate = useNavigate();
	const settingsItems = [
		{
			name: "Account",
			description: "Privacy, security, change number",
			icon: GoKey,
			link: "/settings/account",
		},
		{
			name: "Chat",
			description: "Chat history, theme, wallpapers",
			icon: BsChatDots,
			link: "",
		},
		{
			name: "Notifications",
			description: "Messages, group and others",
			icon: FiBell,
			link: "",
		},
		{
			name: "Help",
			description: "Help center, contact us, privacy policy",
			icon: GoQuestion,
			link: "",
		},
		{
			name: "Storage and data",
			description: "Network usage, storage usage",
			icon: TbMobiledata,
			link: "",
		},
		{ name: "Invite a friend", description: "", icon: FiUserPlus },
	];
	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="w-full h-[812px] bg-[#4b164c] overflow-hidden shadow-xl flex flex-col">
					{/* Header section */}
					<div className="px-4 pt-4 pb-0 h-32">
						<div className="flex items-center mb-4">
							<button className="w-8 h-8 rounded-full border border-white flex items-center justify-center mr-4 bg-pink-400">
								<AiOutlineSearch
									size={30}
									className="w-6 h-6 text-white"
								/>{" "}
							</button>
							<h1 className="text-2xl font-bold text-white flex-grow text-center pt-14 pr-16">
								Settings
							</h1>
						</div>
					</div>

					{/* Form section with curved top */}
					<div className="bg-white text-black rounded-t-3xl p-6 pt-8 flex-grow">
						<div className="flex items-center mb-4">
							<img
								src={Ellipse}
								alt="Profile"
								className="w-16 h-16 rounded-full mr-4"
							/>
							<div className="flex items-center justify-between">
								<div>
									<h2 className="text-xl font-bold">
										Nazrul Islam
									</h2>
									<p className="text-gray-500">
										Never give up 💪
									</p>
								</div>
								<div className="ml-32 text-green-950">
									<MdQrCodeScanner size={30} />
								</div>
							</div>
						</div>

						{/* <form className="space-y-4">
                        {['Name', 'Username', 'Email', 'Phone Number', 'Bio'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium mb-1">{field}</label>
                                <input type="text" className="w-full border-b-2 border-[#4b164c] focus:border-[#4b164c] outline-none py-1" />
                            </div>
                        ))}

                        <div>
                            <label className="block text-sm font-medium mb-2">Images</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <img key={i} src={Avatar} alt="User image" className="w-12 h-12 rounded-full" />
                                ))}
                                <button type="button" className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <AiOutlinePlus className="w-6 h-6 text-gray-600" /> 
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Reels</label>
                            <div className="flex space-x-2">
                                {[1, 2].map((i) => (
                                    <img key={i} src={Avatar} alt="Reel" className="w-12 h-12 rounded-full" />
                                ))}
                                <button type="button" className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <AiOutlinePlus className="w-6 h-6 text-gray-600" /> 
                                </button>
                            </div>
                        </div>

                        <button type="button" className="text-black font-medium">Change Password</button>
                        <div className='flex justify-center'>
                            <button type="submit" className="px-4 py-2 w-56 h-14 bg-[#4b164c] text-white rounded-full text-sm font-bold">
                                Update
                            </button>
                        </div>
                    </form> */}
						<div className="px-6 py-2 space-y-2">
							{settingsItems.map((item, index) => (
								<button
									key={index}
									className="flex items-center w-full py-3 border-b"
									onClick={() => navigate(item.link)}>
									<div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
										<item.icon className="w-5 h-5 text-gray-500" />
									</div>
									<div className="text-left">
										<h3 className="font-medium">
											{item.name}
										</h3>
										{item.description && (
											<p className="text-sm text-gray-500">
												{item.description}
											</p>
										)}
									</div>
									<AiOutlineRight className="w-5 h-5 ml-auto text-gray-400" />
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
};

export default Settings;
