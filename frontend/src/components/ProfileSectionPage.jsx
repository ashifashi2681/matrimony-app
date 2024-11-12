import React from "react";
import UserListCard4 from "./UserListCard4";
import { CiSearch } from "react-icons/ci";
import UserListCard3 from "./UserListCard3";
import UserListCard2 from "./UserListCard2";
import UserListCard1 from "./UserListCard1";


function ProfileSectionPage({title,data, card}) {
	const groupedUsers = data.reduce((acc, user) => {
		const firstLetter = user.name[0].toUpperCase();

		if (!acc[firstLetter]) {
			acc[firstLetter] = [];
		}
		acc[firstLetter].push(user);
		return acc;
	}, {});

	return (
		<div className="relative w-full bg-[#4b164c]">
			<div className="sticky top-0 z-20 bg-[#4b164c] py-8 drop-shadow-2xl grid grid-cols-3">
				<span className="bg-[#dd88cf] w-10 h-10 rounded-full grid place-content-center text-fs-lg  text-white border border-white cursor-pointer ">
					<CiSearch />
				</span>
				<p className=" text-white text-fs-lg whitespace-nowrap place-self-center">
					{title}
				</p>
			</div>
			<div className="px-6 bg-white rounded-3xl pt-12 pb-8">
				{Object.keys(groupedUsers)
					.sort()
					.map((letter) => (
						<div key={letter}>
							<p className="font-bold">{letter}</p>
							<div>
								{groupedUsers[letter].map((user, i) => (
									<div>
										{card === "userListCard1" && (
											<UserListCard1
												key={i}
												data={user}
											/>
										)}
										{card === "userListCard2" && (
											<UserListCard2
												key={i}
												data={user}
											/>
										)}
										{card === "userListCard3" && (
											<UserListCard3
												key={i}
												data={user}
											/>
										)}
										{card === "userListCard4" && (
											<UserListCard4
												key={i}
												data={user}
											/>
										)}
									</div>
								))}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default ProfileSectionPage;
