import React, { useContext, useState } from "react";
import "./relationship.css";
import UserContext from "../../context/UserContexts";

function RelationshipGoal() {
	const { relationship } = useContext(UserContext);
	const [formData, setFormData] = useState({
		shortTerm: false,
		longTerm: false,
	});
	const handleChange = (e) => {
		const { name, checked } = e.target;
		setFormData({
			...formData,
			[name]: checked,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		relationship(formData);
	};
	return (
		<div className="relationship-container">
			<div className="relationship">
				<p>Relationship Goals</p>
				<form className="form-container" onSubmit={handleSubmit}>
					<label>
						<input
							type="checkbox"
							name="shortTerm"
							checked={formData.shortTerm}
							onChange={handleChange}
						/>
						Short Term Relationship
					</label>
					<label>
						<input
							type="checkbox"
							name="longTerm"
							checked={formData.longTerm}
							onChange={handleChange}
						/>
						Long Term Relationship
					</label>
					<div className="form-btns">
						<button type="submit">Next</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default RelationshipGoal;
