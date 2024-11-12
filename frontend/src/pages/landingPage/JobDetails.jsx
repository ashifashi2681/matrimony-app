import React, { useContext, useState } from "react";
import "./JobDetails.css";
import UserContext from "../../context/UserContexts";

function JobDetails() {
	const { jobDetails } = useContext(UserContext);
	const [formData, setFormData] = useState({
		companyName: "",
		designation: "",
		location: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		jobDetails(formData);
	};
	return (
		<div className="job-details-container">
			<div className="job-details">
				<p>Job Details</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label htmlFor="company-name">Company Name</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								companyName: e.target.value,
							})
						}
						type="text"
						name="company-name"
						id="company-name"
						placeholder="Company Name"
					/>

					<label htmlFor="designation">Designation</label>
					<input
						onChange={(e) =>
							setFormData({
								...formData,
								designation: e.target.value,
							})
						}
						type="text"
						name="designation"
						id="designation"
						placeholder="Designation"
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
						placeholder="Location"
					/>

					<div className="form-btns">
						<button type="submit">Next</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default JobDetails;
