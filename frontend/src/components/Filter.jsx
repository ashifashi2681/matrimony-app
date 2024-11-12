import React from "react";

function Filter({ openFilter, setOpenFilter }) {
	return (
		<div
			className={` bg-white fixed z-10 right-0 top-0 md:top-28 bottom-0 md:left-0 md:w-full w-[24%] lg:w-[31%] py-10  px-5 h-screen overflow-y-scroll transition-transform duration-300 md:rounded-tl-3xl md:rounded-tr-3xl md:pb-48  ${
				openFilter
					? " md:translate-y-0 translate-x-0"
					: "md:translate-y-full translate-x-full "
			}`}>
			<div className="hidden absolute top-0 w-10 h-2 rounded-lg bg-[#e6e6e6]"></div>
			<p className="text-fs-base font-semibold">Sort By</p>
			<div className="my-4 flex flex-col gap-3">
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Newest Members
					<input type="radio" name="sort" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Last Active
					<input type="radio" name="sort" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Distance
					<input type="radio" name="sort" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Popularity
					<input type="radio" name="sort" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Age
					<input type="radio" name="sort" />
				</label>
			</div>

			<p className="text-fs-base font-semibold">Filter By</p>
			<div className="mt-5 flex flex-col gap-3">
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Gender
					<input type="checkbox" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Location
					<input type="checkbox" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Interests/Hobbies
					<input type="checkbox" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Languages Spoken
					<input type="checkbox" />
				</label>
				<label className="flex items-center justify-between border-b py-1 text-fs-sm">
					Relationship Goal
					<input type="checkbox" />
				</label>
			</div>
			<div className="flex gap-4 justify-center my-5">
				<button
					className="text-fs-base text-white bg-[#ff6480] border-2 border-[#c00f0c] py-1 px-2 rounded-lg cursor-pointer"
					onClick={() => {
						setOpenFilter(false);
					}}>
					Cancel
				</button>
				<button className="text-fs-base text-white bg-[#4b164c] border-2 border-black py-1 px-2 rounded-lg cursor-pointer">
					Apply
				</button>
			</div>
		</div>
	);
}

export default Filter;
