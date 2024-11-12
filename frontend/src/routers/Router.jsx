/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
	Routes,
	Route,
	useNavigate,
	redirect,
	useLocation,
} from "react-router-dom";
import Subscription from "../pages/Payment/Subscription";
import HomePage from "../pages/Home/HomePage";
import ProfileGridPage from "../pages/ProfileGridPage/ProfileGridPage";
import UserProfile from "../pages/UserFlow/UserProfile";
import EditProfile from "../pages/UserFlow/Edit";
import ChangePassword from "../pages/UserFlow/ChangePassword";
import Settings from "../pages/UserFlow/Settings";
import PrivacySettings from "../pages/UserFlow/PrivacySetting";
import PartnerPreference from "../pages/UserFlow/PartnerPreference";
import PaymentMethod from "../pages/Payment/PaymentMethod";
import AddCard from "../pages/Payment/AddCard";
import TargetUser from "../pages/TargetUser/TargetUser";
import LandingPage from "../pages/landingPage/LandingPage";
import Register from "../pages/landingPage/Register";
import Login from "../pages/landingPage/Login";
import PersonalDetails from "../pages/landingPage/PersonalDetails";
import JobStatus from "../pages/landingPage/JobStatus";
import JobDetails from "../pages/landingPage/JobDetails";
import JobRole from "../pages/landingPage/JobRole";
import RelationshipGoal from "../pages/landingPage/RelationshipGoal";
import Interested from "../pages/landingPage/Interested";
import Otp from "../pages/landingPage/Otp";
import VerifyOtp from "../pages/landingPage/VerifyOtp";
import MessagesPage from "../pages/RightMenubarContents/MessagePage";
import SentRequestsPage from "../pages/RightMenubarContents/SentRequestsPage";
import AcceptPage from "../pages/RightMenubarContents/AcceptPage";
import RejectPage from "../pages/RightMenubarContents/RejectPage";
import ReceivedRequestsPage from "../pages/RightMenubarContents/ReceivedRequestsPage";
import ShortlistedBy from "../pages/RightMenubarContents/ShortlistedBy";
import Shortlist from "../pages/RightMenubarContents/Shortlist";
import Contacted from "../pages/RightMenubarContents/Contacted";
import ViewedMyprofile from "../pages/RightMenubarContents/ViewedMyprofile";
import Notification from "../pages/Notification/Notification";
import axiosInstance from "../axio/axiosInstance";
import { toast } from "react-toastify";
import MessageView from "../pages/Message/MessageView";
import PrivateRoutes from "./PrivateRoutes";
import LandingRoutes from "./LandingRoutes";
function Router() {
	const [location, setLocation] = useState(null);
	const [qualificaion, setQualification] = useState(null);
	const [interest, setInterest] = useState(null);

	// if no user redirect to landing page

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [locationData, qualificaionData, interestData] =
					await Promise.all([
						axiosInstance.get("/user/getUsersByLocation"),
						axiosInstance.get("/user/getUsersByQualification"),
						axiosInstance.get("/user/getUsersByInterest"),
					]);

				setLocation(locationData.data.locationProfiles);
				setQualification(qualificaionData.data.qualificationProfiles);
				setInterest(interestData.data.hobbiesProfiles);
			} catch (error) {
				toast(error?.response?.data?.message);
			}
		};
		fetchData();
	}, []);

	return (
		<Routes>
			{/* private routes */}
			<Route element={<PrivateRoutes />}>
				<Route path="/" element={<HomePage />} exact />
				<Route
					path="/location"
					element={
						<ProfileGridPage data={location} title="Location" />
					}
				/>
				<Route
					path="/qualification"
					element={
						<ProfileGridPage
							data={qualificaion}
							title="Qualification"
						/>
					}
				/>
				<Route
					path="/interest"
					element={
						<ProfileGridPage data={interest} title="Interests" />
					}
				/>
				<Route path="/target-profile/:id" element={<TargetUser />} />

				{/* right sidebar menu */}
				<Route path="/user-profile" element={<UserProfile />} />
				<Route path="/notification" element={<Notification />} />
				<Route
					path="/user-profile/edit-profile"
					element={<EditProfile />}
				/>
				<Route
					path="/user-profile/change-password"
					element={<ChangePassword />}
				/>
				<Route path="/user-profile/settings" element={<Settings />} />
				<Route path="/settings/account" element={<PrivacySettings />} />
				<Route
					path="/settings/partner-preference"
					element={<PartnerPreference />}
				/>
				<Route path="/send-request" element={<SentRequestsPage />} />
				<Route path="/accept-request" element={<AcceptPage />} />
				<Route path="/reject" element={<RejectPage />} />
				<Route path="/received" element={<ReceivedRequestsPage />} />
				<Route path="/short-listed-by" element={<ShortlistedBy />} />
				<Route path="/short-listed" element={<Shortlist />} />
				<Route path="/contacted" element={<Contacted />} />
				<Route path="/viewed-profile" element={<ViewedMyprofile />} />
				<Route path="/message" element={<MessagesPage />} />
				<Route path="/message/:id" element={<MessageView />} />

				<Route path="/subscription" element={<Subscription />} />
				<Route path="/payment" element={<PaymentMethod />} />
				<Route path="/add-card" element={<AddCard />} />
			</Route>

			{/* Landing Routes */}
			<Route element={<LandingRoutes />}>
				<Route path="/landing" element={<LandingPage />}>
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route
						path="personal-details"
						element={<PersonalDetails />}
					/>
					<Route path="job-status" element={<JobStatus />} />
					<Route path="job-details" element={<JobDetails />} />
					<Route path="job-role" element={<JobRole />} />
					<Route path="relationship" element={<RelationshipGoal />} />
					<Route path="interested" element={<Interested />} />
					<Route path="otp" element={<Otp />} />
					<Route path="verify-otp" element={<VerifyOtp />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default Router;
