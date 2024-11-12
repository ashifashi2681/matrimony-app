/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import { useNavigate } from "react-router-dom";

function PaymentMethod() {
	const navigate = useNavigate();
	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="px-5 py-5 md:pb-16">
					<div className="flex items-center justify-between">
						<span
							className="text-fs-lg cursor-pointer"
							onClick={() => navigate(-1)}>
							<RxCross2 />
						</span>
						<button className="cursor-pointer text-fs-base font-semibold">
							Done
						</button>
					</div>
					<div className="">
						<p className="text-center text-fs-lg font-semibold mt-12 mb-5">
							Payment methods
						</p>
					</div>
					<div>
						<p className="text-fs-base text-center">
							choose desired payment type. We offer easy ways for
							payments on our app
						</p>
					</div>
					<div className=" flex flex-col gap-5 items-center my-6">
						<div className="flex items-center justify-center gap-8 border border-red-500 w-[360px]  py-5 px-8 rounded-lg">
							<img
								className="w-20"
								src="https://brand.mastercard.com/content/dam/mccom/brandcenter/brand-history/brandhistory_mc1979_100_2x.png"
							/>
							<div className="">
								<p className="font-bold text-fs-sm m-0">
									***********4444
								</p>
								<p className="m-0 text-fs-xs">Expires 01/23</p>
							</div>
						</div>
						<div className="flex items-center justify-center gap-8 border shadow-lg w-[360px] py-5 px-8 rounded-lg">
							<img
								className="w-20"
								src="https://static.vecteezy.com/system/resources/previews/020/975/570/non_2x/visa-logo-visa-icon-transparent-free-png.png"
							/>
							<div className="">
								<p className="font-bold text-fs-sm m-0">
									***********3356
								</p>
								<p className="m-0 text-fs-xs">Expires 01/23</p>
							</div>
						</div>
						<div className="flex items-center justify-center gap-8 border shadow-lg w-[360px] py-5 px-8 rounded-lg">
							<img
								className="w-20"
								src="https://logos-world.net/wp-content/uploads/2020/08/PayPal-Symbol-500x281.png"
							/>
							<div className="">
								<p className="font-bold text-fs-sm m-0">
									Petra-stark@gmail.com
								</p>
							</div>
						</div>
					</div>

					<p className="text-fs-sm font-semibold text-center leading-10">
						CURRENT METHOD
					</p>
					<div className="flex justify-center my-5">
						<div className="flex items-center justify-between border shadow-lg w-[360px] py-5 px-8 rounded-lg">
							<span className="bg-[#ffab01] py-2 px-5 rounded-md text-white text-fs-lg">
								<HiCurrencyDollar />
							</span>
							<div className="">
								<p className="font-bold text-fs-sm m-0">
									***********3356
								</p>
								<p className="m-0 text-fs-xs">Expires 01/23</p>
							</div>
							<span className="bg-[#123b70] text-white text-fs-base p-2 rounded-xl">
								<FaAngleDown />
							</span>
						</div>
					</div>
					<div className="flex justify-center">
						<button
							className=" text-fs-sm bg-[#4b164c] text-white py-2 px-20 rounded-lg cursor-pointer my-5"
							onClick={() => navigate("/add-card")}>
							ADD PAYMENT METHOD
						</button>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
}

export default PaymentMethod;
