import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";

const PartnerPreference = () => {
	const [age, setAge] = useState([18, 35]);
	const [gender, setGender] = useState("");
	const [locations, setLocations] = useState(["Kochi", "Kollam", "Aluva"]);
	const [hobbies, setHobbies] = useState(["yoga", "jazz", "reading"]);
	const [educationLevel, setEducationLevel] = useState("");
	const [height, setHeight] = useState([100, 220]);
	const [weight, setWeight] = useState([40, 150]);
	const [lifestyleChoices, setLifestyleChoices] = useState("");
	const [religion, setReligion] = useState("");
	const [occupation, setOccupation] = useState("");

	const handleLocationRemove = (location) => {
		setLocations(locations.filter((loc) => loc !== location));
	};

	const handleHobbyRemove = (hobby) => {
		setHobbies(hobbies.filter((hob) => hob !== hobby));
	};

	const handleAddLocation = (e) => {
		if (e.key === "Enter" && e.target.value) {
			setLocations([...locations, e.target.value]);
			e.target.value = "";
		}
	};

	const handleAddHobby = (e) => {
		if (e.key === "Enter" && e.target.value) {
			setHobbies([...hobbies, e.target.value]);
			e.target.value = "";
		}
	};

	return (
		<div className="flex">
			<LeftMenu />
			<div className="w-full">
				<style>
					{`
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: black;
      cursor: pointer;
      margin-top: -6px;
    }
    input[type="range"]::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: black;
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #ddd;
      border-radius: 2px;
    }
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #ddd;
      border-radius: 2px;
    }
  `}
				</style>
				<div className="w-full h-[1196px] bg-[#4b164c] overflow-hidden shadow-xl flex flex-col">
					<header className="flex justify-between items-center px-4 py-2 h-32  ">
						<button className="w-8 h-8 rounded-full border border-white flex items-center justify-center mr-4 bg-pink-400">
							<FiSearch className="w-6 h-6 text-white " />
						</button>
						<h1 className="text-center text-2xl font-bold text-white  pt-14 mr-24">
							Privacy & Settings
						</h1>
					</header>

					<div className="bg-white text-black rounded-t-3xl p-6 space-y-4 flex-grow">
						<h2 className="text-lg font-semibold mb-4 flex justify-center ">
							Partner Preference
						</h2>

						<div className="mb-4">
							<label className="block mb-2">
								Age: {age[0]} - {age[1]}
							</label>
							<input
								type="range"
								min="18"
								max="35"
								value={age[0]}
								onChange={(e) =>
									setAge([parseInt(e.target.value), age[1]])
								}
								className="w-full mb-2"
							/>
							<input
								type="range"
								min="18"
								max="35"
								value={age[1]}
								onChange={(e) =>
									setAge([age[0], parseInt(e.target.value)])
								}
								className="w-full"
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-2">Gender</label>
							<select
								className="w-full bg-white p-2 rounded"
								value={gender}
								onChange={(e) => setGender(e.target.value)}>
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div className="mb-4">
							<label className="block mb-2">Locations</label>
							<div className="flex flex-wrap gap-2 mb-2">
								{locations.map((location) => (
									<span
										key={location}
										className="bg-gray-600 px-2 py-1 rounded-full text-sm text-white">
										{location}
										<button
											onClick={() =>
												handleLocationRemove(location)
											}
											className="ml-1">
											×
										</button>
									</span>
								))}
							</div>
							<input
								type="text"
								placeholder="Add location and press Enter"
								onKeyPress={handleAddLocation}
								className="w-full bg-white p-2 rounded"
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-2">
								Interest & Hobbies
							</label>
							<div className="flex flex-wrap gap-2 mb-2">
								{hobbies.map((hobby) => (
									<span
										key={hobby}
										className="bg-gray-600 px-2 py-1 rounded-full text-sm text-white">
										{hobby}
										<button
											onClick={() =>
												handleHobbyRemove(hobby)
											}
											className="ml-1">
											×
										</button>
									</span>
								))}
							</div>
							<input
								type="text"
								placeholder="Add hobby and press Enter"
								onKeyPress={handleAddHobby}
								className="w-full bg-white p-2 rounded"
							/>
						</div>

						{[
							{
								label: "Education Level",
								state: educationLevel,
								setState: setEducationLevel,
							},
							{
								label: "Lifestyle Choices",
								state: lifestyleChoices,
								setState: setLifestyleChoices,
							},
							{
								label: "Religion",
								state: religion,
								setState: setReligion,
							},
							{
								label: "Occupation",
								state: occupation,
								setState: setOccupation,
							},
						].map(({ label, state, setState }) => (
							<div key={label} className="mb-4">
								<label className="block mb-2">{label}</label>
								<select
									className="w-full bg-white p-2 rounded"
									value={state}
									onChange={(e) => setState(e.target.value)}>
									<option value="">Select {label}</option>
									<option value="option1">Option 1</option>
									<option value="option2">Option 2</option>
									<option value="option3">Option 3</option>
								</select>
							</div>
						))}

						<div className="mb-4">
							<label className="block mb-2 ">
								Height: {height[0]}cm - {height[1]}cm
							</label>
							<input
								type="range"
								min="100"
								max="220"
								value={height[0]}
								onChange={(e) =>
									setHeight([
										parseInt(e.target.value),
										height[1],
									])
								}
								className="w-full mb-2"
							/>
							<input
								type="range"
								min="100"
								max="220"
								value={height[1]}
								onChange={(e) =>
									setHeight([
										height[0],
										parseInt(e.target.value),
									])
								}
								className="w-full"
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-2">
								Weight: {weight[0]}kg - {weight[1]}kg
							</label>
							<input
								type="range"
								min="40"
								max="150"
								value={weight[0]}
								onChange={(e) =>
									setWeight([
										parseInt(e.target.value),
										weight[1],
									])
								}
								className="w-full mb-2 "
							/>
							<input
								type="range"
								min="40"
								max="150"
								value={weight[1]}
								onChange={(e) =>
									setWeight([
										weight[0],
										parseInt(e.target.value),
									])
								}
								className="w-full"
							/>
						</div>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
	);
};

export default PartnerPreference;
