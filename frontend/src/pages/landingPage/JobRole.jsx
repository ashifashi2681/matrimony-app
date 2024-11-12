import React, { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./jobrole.css";
import UserContext from "../../context/UserContexts";

function JobRole() {
	const { jobRole } = useContext(UserContext);
	const [jobTitle, setJobTitle] = useState("");
	const [option, setOption] = useState("Beginner");
	const [active, setActive] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		jobRole({ jobTitle, expertiseLevel: option });
	};
	return (
		<div className="job-role-container">
			<div className="job-role">
				<p>Job Role</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label htmlFor="jobTitle">Title</label>
					<input
						onChange={(e) => setJobTitle(e.target.value)}
						type="text"
						name="jobTitle"
						id="jobTitle"
						placeholder="Job Title"
					/>
					<div className="select-container">
						<button
							type="button"
							onClick={() => setActive(!active)}>
							<span>{option}</span>
							<span>
								<IoIosArrowDown />
							</span>
						</button>
						<ul className={`options ${active && "active"}`}>
							<li
								className="option"
								onClick={(e) => {
									setOption(e.target.innerHTML);
								}}>
								Beginner
							</li>
							<li
								className="option"
								onClick={(e) => {
									setOption(e.target.innerHTML);
								}}>
								Intermediate
							</li>
							<li
								className="option"
								onClick={(e) => {
									setOption(e.target.innerHTML);
								}}>
								Expert
							</li>
						</ul>
					</div>
					<div className="form-btns">
						<button type="submit">Next</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default JobRole;
