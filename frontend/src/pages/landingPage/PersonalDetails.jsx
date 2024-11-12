import React, { useContext, useState } from "react";
import "./PersonalDetails.css";
import UserContext from "../../context/UserContexts";

function PersonalDetails() {
	const { profileInformation } = useContext(UserContext);
	const [formData, setFormData] = useState({
		age: "",
		dob: "",
		location: "",
		hobbies: "",
		interests: "",
		smoking: "",
		drinking: "",
		qualification: "",
		profilePic: null,
		morePics: [],
	});


	const handleSubmit = async (e) => {
		e.preventDefault();
	
		const data = new FormData();
		data.append("age", formData.age);
		data.append("dob", formData.dob);
		data.append("location", formData.location);
		data.append("hobbies", formData.hobbies);
		data.append("interests", formData.interests);
		data.append("smoking", formData.smoking);
		data.append("drinking", formData.drinking);
		data.append("qualification", formData.qualification);
		data.append("profilePic", formData.profilePic);
		if (formData.morePics.length > 0) {
			Array.from(formData.morePics).forEach((file) => {
				data.append("morePics", file);
			});
		}

		profileInformation(data);
	};

	return (
		<div className="p-details-container">
			<div className="p-details">
				<p>Personal Details</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label htmlFor="age">Age</label>
					<input
						value={formData.age}
						onChange={(e) =>
							setFormData({ ...formData, age: e.target.value })
						}
						type="text"
						name="age"
						id="age"
						placeholder="Your Age"
					/>

					<label htmlFor="dob">DOB</label>
					<input
						onChange={(e) =>
							setFormData({ ...formData, dob: e.target.value })
						}
						type="date"
						name="dob"
						id="dob"
						placeholder="Your dob"
					/>

					<label htmlFor="location">Location</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								location: e.target.value,
							})
						}
						type="text"
						name="location"
						id="location"
						placeholder="Your location"
					/>

					<label htmlFor="hobbies">Hobbies</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								hobbies: e.target.value,
							})
						}
						type="text"
						name="hobbies"
						id="hobbies"
						placeholder="Your hobbies"
					/>

					<label htmlFor="interests">Interests</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								interests: e.target.value,
							})
						}
						type="text"
						name="interests"
						id="interests"
						placeholder="Your interests"
					/>

					<label htmlFor="smoking">Smoking Habits</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								smoking: e.target.value,
							})
						}
						type="text"
						name="smoking"
						id="smoking"
						placeholder="Your habits"
					/>

					<label htmlFor="drinking">Drinking Habits</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								drinking: e.target.value,
							})
						}
						type="text"
						name="drinking"
						id="drinking"
						placeholder="Your habits"
					/>

					<label htmlFor="qualification">Qualifications</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								qualification: e.target.value,
							})
						}
						type="text"
						name="drqualificationinking"
						id="qualification"
						placeholder="Your qualification"
					/>
					<label htmlFor="profile-pic">Profile Pic</label>
					<input
						type="file"
						name="profile-pic"
						id="profile-pic"
						onChange={(e) =>
							setFormData({
								...formData,
								profilePic: e.target.files[0],
							})
						}
					/>

					<label htmlFor="images">More images</label>
					<input
						type="file"
						name="images"
						id="images"
						multiple
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

					<div className="form-btns">
						<button type="submit">Next</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PersonalDetails;
