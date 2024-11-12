import { Outlet, Navigate } from "react-router-dom";

const LandingRoutes = () => {
	const token = localStorage.getItem("userData");
	return !token ? <Outlet /> : <Navigate to="/" />;
};

export default LandingRoutes;
