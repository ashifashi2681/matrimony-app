import { createContext, useState } from "react";
import axiosInstance from "../axio/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	console.log(loading);

	// const [userData, setUserData] = useState(() => {
	// 	const savedUserData = localStorage.getItem("userData");
	// 	return savedUserData ? JSON.parse(savedUserData) : null;
	// });
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (userData) {
	// 		localStorage.setItem("userData", JSON.stringify(userData));
	// 	}
	// }, [userData]);

	const registerUser = async (data) => {
		try {
			const res = await axiosInstance.post("user/signup", data);
			setLoading(true);
			if (res.data.success) {
				localStorage.setItem("userData", JSON.stringify(res.data.user));
				setLoading(false);
				toast(res.data.message);
				navigate("/landing/personal-details");
			} else {
				toast(res.data.message);
			}
		} catch (error) {
			if (error.response.data.success === false) {
				toast(error.response.data.message);
			}
		}
	};

	const loginUser = async (data) => {
		try {
			const res = await axiosInstance.post("user/login", data);
			if (res.data.success) {
				setLoading(true);
				localStorage.setItem("userData", JSON.stringify(res.data.user));
				toast(res.data.message);
				setLoading(false);
				navigate("/");
			}
		} catch (error) {
			setLoading(false);
			if (error.response.data.success === false) {
				toast(error.response.data.message);
			}
		}
	};

	const profileInformation = async (data) => {
		try {
			const res = await axiosInstance.post("profile", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setLoading(true);
			if (res.data.success) {
				localStorage.setItem("userData", JSON.stringify(res.data.user));
				setLoading(false);
				toast(res.data.message);
				navigate("/landing/job-status");
			}
		} catch (error) {
			setLoading(false);
			if (!error.response.data.success) {
				toast(error.response.data.message);
			}
		}
	};

	//============================================

	const profileEdit = async (data) => {
		try {
			const res = await axiosInstance.post("profile/edit", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (res.data.success) {
				toast(res.data.message);
			}
		} catch (error) {
			if (!error.response.data.success) {
				toast(error.response.data.message);
			}
		}
	}

	//=======================================================

	const jobStatus = async (data) => {
		try {
			const res = await axiosInstance.post("job", data);
			// setUserData(res.data);
			if (res.data.success) {
				toast(res.data.message);
				navigate("/landing/job-details");
			}
		} catch (error) {
			if (!error.response.data.success) {
				toast(error.response.data.message);
			}
		}
	};

	const jobDetails = async (data) => {
		try {
			const res = await axiosInstance.put("job/job-details", data);
			// setUserData(res.data);
			if (res.data.success) {
				toast(res.data.message);
				navigate("/landing/job-role");
			}
		} catch (error) {
			if (!error.response.data.success) {
				toast(error.response.data.message);
			}
		}
	};

	const jobRole = async (data) => {
		try {
			const res = await axiosInstance.put("job/job-role", data);
			// setUserData(res.data);
			if (res.data.success) {
				toast(res.data.message);
				navigate("/landing/relationship");
			}
		} catch (error) {
			if (!error.response.data.success) {
				toast(error.response.data.message);
			}
		}
	};

	const relationship = async (data) => {
		try {
			const res = await axiosInstance.post("profile/relationship", data);
			// setUserData(res.data);
			if (res.data.success) {
				toast(res.data.message);
				navigate("/landing/interested");
			}
		} catch (error) {
			if (!error.response.data.success) {
				toast(error.response.data.message);
			}
		}
	};
	return (
		<UserContext.Provider
			value={{
				registerUser,
				loginUser,
				profileInformation,
				profileEdit,
				jobStatus,
				jobDetails,
				jobRole,
				relationship,
				// userData,
				// setUserData,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
export { UserProvider };
