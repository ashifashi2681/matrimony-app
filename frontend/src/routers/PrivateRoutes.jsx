import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
	const token = localStorage.getItem("userData");

	return token ? <Outlet /> : <Navigate to="/landing" />;
};

export default PrivateRoutes;
