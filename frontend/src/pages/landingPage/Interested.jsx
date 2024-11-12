import React from "react";
import "./interested.css";
import { useNavigate } from "react-router-dom";

function Interested() {
	const navigate = useNavigate();
	return (
		<div className="interested-container">
			<div className="interested">
				<p>Interested</p>
				<div className="form-btns">
					<button
						onClick={() => {
							navigate("/dating");
						}}>
						Dating
					</button>
					<button
						onClick={() => {
							navigate("/");
						}}>
						Matrimony
					</button>
				</div>
			</div>
		</div>
	);
}

export default Interested;
