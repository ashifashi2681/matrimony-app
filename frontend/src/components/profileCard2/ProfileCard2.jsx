/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../profileCard2/profileCard2.css";

function ProfileCard2({ data, title }) {
	
	return (
		<div className="profile-card2-container">
			<img src={data?.profilePic} />
			<div className="card2-gradient"></div>
			<div className="profile-card2-match">
				<span>{data?.match}% Match</span>
			</div>
			<div className="profile-card2-details">
				<div className="profile-card2-distance">
					<span>{data?.distance} Km away</span>
				</div>
				<div className="profile-card2-name">
					<p>
						{data?.userId?.name}, {data?.age}
					</p>
					<div className="card2-status"></div>
				</div>
				<p>{data?.location}</p>
			</div>
		</div>
	);
}

export default ProfileCard2;
