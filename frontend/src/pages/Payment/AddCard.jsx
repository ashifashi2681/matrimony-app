import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuScanLine } from "react-icons/lu";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";

function AddCard() {
	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<div className="px-5 py-5 md:pb-16">
					<span className="text-fs-lg">
						<FaArrowLeftLong />
					</span>
					<p className="text-center text-fs-lg font-semibold mt-12 mb-5">
						Add credit card
					</p>
					<div className="flex justify-center">
						<form className="w-[800px] shadow-lg p-8">
							<label className="block text-fs-sm my-1" htmlFor="">
								Name
							</label>
							<input
								type="text"
								placeholder="your name"
								className="outline-none border-b w-full py-2 text-fs-base font-bold border-black mb-7"
							/>
							<label className="block text-fs-sm my-1" htmlFor="">
								Credit card number
							</label>
							<input
								type="text"
								placeholder="Credit card number"
								className="outline-none border-b w-full py-2 text-fs-base font-bold border-black"
							/>

							<div className="flex items-center gap-3 bg-[#4b164c] w-fit text-white py-2 px-5 rounded-md my-6 cursor-pointer">
								<span className="text-fs-base">
									<LuScanLine />
								</span>
								<span>Scan card</span>
							</div>

							<div className="flex gap-8">
								<div>
									<label
										className="block text-fs-sm my-1"
										htmlFor="">
										Express
									</label>
									<input
										type="text"
										placeholder="Express"
										className="outline-none border-b w-full py-2 text-fs-base font-bold border-black"
									/>
								</div>
								<div>
									<label
										className="block text-fs-sm my-1"
										htmlFor="">
										CVV
									</label>
									<input
										type="password"
										placeholder="CVV"
										className="outline-none border-b w-full py-2 text-fs-base font-bold border-black"
									/>
								</div>
							</div>
							<p>
								Debit cards are accepted at some locations and
								for some categories.
							</p>
						</form>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
}

export default AddCard;
