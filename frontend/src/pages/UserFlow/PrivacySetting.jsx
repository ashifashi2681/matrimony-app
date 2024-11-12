/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { Switch } from "@headlessui/react";
import {
	FiSearch,
	FiHome,
	FiHeart,
	FiStar,
	FiMessageSquare,
} from "react-icons/fi";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import { useNavigate } from "react-router-dom";

const PrivacySettings = () => {
    const navigate = useNavigate()
	const [twoFAEnabled, setTwoFAEnabled] = React.useState(true);
	// const ToggleSwitch = ({ isOn, handleToggle }) => {
	//     return (
	//         <div
	//             onClick={handleToggle}
	//             className={`${isOn ? 'bg-[#4b164c]' : 'bg-gray-500'}
	//                     w-11 h-6 flex items-center rounded-full px-1 cursor-pointer transition-colors`}
	//         >
	//             <div
	//                 className={`${isOn ? 'translate-x-5' : 'translate-x-0'}
	//                       bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
	//             />
	//         </div>
	//     );
	// };

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className=" h-[812px] bg-[#4b164c]  overflow-hidden shadow-xl flex flex-col">
					{/* Top section with title */}
					<div className="flex justify-between items-center px-4 py-2 h-32">
						<button className="w-8 h-8 rounded-full border border-white flex items-center justify-center mr-4 bg-pink-400">
							<FiSearch className="w-6 h-6 text-white " />
						</button>
						<h1 className="text-center text-2xl font-bold text-white  pt-14 ">
							Privacy & Settings
						</h1>
						<div className="w-6"></div>
					</div>

					{/* Main content */}
					<div className="bg-white text-black rounded-t-3xl p-6 space-y-4 flex-grow">
						<div className="space-y-2 flex">
							<p className="font-semibold">Sign-in Email</p>
							<p className="text-sm ml-48">johnsmith@gmail.com</p>
						</div>

						<div className="space-y-3 flex">
							<p className="font-semibold">Password</p>
							<a
								href="#"
								className="text-blue-500 text-sm ml-48 mb-3">
								Change password
							</a>
						</div>

						<div className="flex justify-between items-center">
							<p className="font-semibold">2-FA authentication</p>
							<Switch
								checked={twoFAEnabled}
								onChange={setTwoFAEnabled}
								className={`${
									twoFAEnabled
										? "bg-[#4b164c]"
										: "bg-gray-400"
								} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}>
								<span
									className={`${
										twoFAEnabled
											? "translate-x-6"
											: "translate-x-1"
									} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
								/>
							</Switch>
							{/* <ToggleSwitch
                            isOn={twoFAEnabled}
                            handleToggle={() => setTwoFAEnabled(!twoFAEnabled)}
                        /> */}
						</div>

						<div className="space-y-3">
							<p className="font-semibold">Phone number</p>
							<p className="text-sm">+380 93 123 45 67</p>
						</div>

						<div className="space-y-3">
							<p
								className="font-semibold cursor-pointer"
								onClick={() =>
									navigate("/settings/partner-preference")
								}>
								Partner Preference
							</p>
						</div>

						<div className="space-y-3">
							<p className="font-semibold">Last sign in</p>
							<p className="text-sm">
								today at 18:34, Safari 198.123.23.23
							</p>
						</div>

						<div className="space-y-3">
							<p className="font-semibold">
								Total active sessions (5)
							</p>
							<div className="space-y-1">
								<p className="text-sm">
									DESKTOP-6TIG6EC • Kyiv, Ukraine
								</p>
								<p className="text-xs text-gray-500 italic">
									Chrome • Used right now
								</p>
							</div>
							<div className="space-y-3">
								<p className="text-sm">
									Iphone 11 • Kyiv, Ukraine
								</p>
								<p className="text-xs text-gray-500">
									Chrome • 04/19/2022
								</p>
							</div>
						</div>
						<div>
							<button className="w-1/2 bg-[#4b164c] rounded-md text-white py-2  mt-4 ml-48">
								+ Reset all active sessions
							</button>
						</div>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
};

export default PrivacySettings;
