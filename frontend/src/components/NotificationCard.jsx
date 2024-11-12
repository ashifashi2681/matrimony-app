import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscError } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";


function NotificationCard({ status, subTitle, title, time, msg }) {
	return (
		<div className="bg-[#4b164c] m-3 px-7 py-5 rounded-3xl relative">
			<span className="absolute right-4 top-4 text-fs-md text-[#9dacd3] cursor-pointer hover:bg-[#3a404e] p-1 rounded-full">
				<RxCross2 />
			</span>
			<div className="flex items-center gap-3">
				{status === "success" && (
					<span className="text-green-500 text-fs-md ">
						<IoMdCheckmarkCircleOutline />
					</span>
				)}
				{status === "warning" && (
					<span className="text-yellow-500 text-fs-md ">
						<RiErrorWarningLine />
					</span>
				)}
				{status === "error" && (
					<span className="text-red-500 text-fs-md ">
						<VscError />
					</span>
				)}
				<div className="flex flex-col gap-1">
					<span className="text-fs-sm font-semibold text-[#237fd2]">
						{subTitle}
					</span>
					<span className="text-fs-base text-white">{title}</span>
					<p className="text-fs-sm text-[#bbc9ec]">{msg}</p>
					<span className="text-fs-sm text-[#dbe2f7]">{time}</span>
				</div>
			</div>
		</div>
	);
}

export default NotificationCard;
