import React, { useContext, useState } from "react";
import "./jobStatus.css";
import UserContext from "../../context/UserContexts";
function JobStatus() {
	const { jobStatus } = useContext(UserContext);
	const [formData, setFormData] = useState({
		employer: false,
		employee: false,
		jobSeeker: false,
	});
	const handleChange = (event) => {
		const { name, checked } = event.target;
		setFormData({ ...formData, [name]: checked });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		jobStatus(formData)
	};

	return (
		<div className="JobStatus-container">
			<div className="JobStatus">
				<p>Job Status</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label>
						<input
							type="checkbox"
							name="employer"
							checked={formData.employer}
							onChange={handleChange}
						/>
						Employer
					</label>
					<label>
						<input
							type="checkbox"
							name="employee"
							checked={formData.employee}
							onChange={handleChange}
						/>
						Employee
					</label>
					<label>
						<input
							type="checkbox"
							name="jobSeeker"
							checked={formData.jobSeeker}
							onChange={handleChange}
						/>
						Job Seeker
					</label>
					<div className="form-btns">
						<button type="submit">Next</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default JobStatus;
