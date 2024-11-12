import React, { useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import LeftMenu from '../../components/LeftMenu';
import RightMenu from '../../components/RightMenu';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {
  const navigate = useNavigate()
  // State variables for passwords
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State variables for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for handling form errors
  const [error, setError] = useState('');

  // Handler for updating the password
  const handleUpdate = (e) => {
    e.preventDefault();

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    // Mock API call
    // You can replace this with your actual API call
    console.log('Password updated successfully!');
    setError('');
    // Reset fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
		<div className='flex'>
			<LeftMenu />
			<div className="w-full">
				<div className="h-[812px] bg-[#4b164c] overflow-hidden shadow-xl flex flex-col ">
					{/* Top section with title */}
					<div className="p-6 pb-8 h-32">
						<div className="flex items-center">
							<button className="text-white p-1 rounded-full bg-[#4b164c] border border-white" onClick={()=>navigate(-1)}>
								<HiChevronLeft size={30} />
							</button>
							<h1 className="text-white text-xl font-bold ml-4  pt-14 pl-14">
								Change Password
							</h1>
						</div>
					</div>

					{/* Bottom section with curved top */}
					<div className="bg-white rounded-t-[40px] p-6 flex-grow flex flex-col">
						<div className="bg-purple-100 rounded-lg p-4 text-black mb-4 text-sm">
							<p>
								Feeling worried about your account being easily
								preyed on? Then change that password now!
							</p>
						</div>

						{/* Display error messages */}
						{error && (
							<div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
								{error}
							</div>
						)}

						<form
							className="flex-grow flex flex-col justify-between"
							onSubmit={handleUpdate}>
							<div>
								<div className="mb-6">
									<label className="block mb-2 text-gray-700">
										Current Password
									</label>
									<div className="relative">
										<input
											type={
												showCurrentPassword
													? "text"
													: "password"
											}
											className="w-full border-b-2 border-[#4b164c] focus:border-purple-500 outline-none py-1"
											value={currentPassword}
											onChange={(e) =>
												setCurrentPassword(
													e.target.value
												)
											}
										/>
										<button
											type="button"
											className="absolute right-0 bottom-2 text-gray-500"
											onClick={() =>
												setShowCurrentPassword(
													!showCurrentPassword
												)
											}>
											{showCurrentPassword ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.345.262-2.626.736-3.825M6.513 6.513A9.973 9.973 0 0112 5c5.523 0 10 4.477 10 10 0 1.345-.262 2.626-.736 3.825M9.172 9.172a4 4 0 015.656 5.656"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
											)}
										</button>
									</div>
								</div>

								<div className="mb-6">
									<label className="block mb-2 text-gray-700">
										New Password
									</label>
									<div className="relative">
										<input
											type={
												showNewPassword
													? "text"
													: "password"
											}
											className="w-full border-b-2 border-[#4b164c] focus:border-purple-500 outline-none py-1"
											value={newPassword}
											onChange={(e) =>
												setNewPassword(e.target.value)
											}
										/>
										<button
											type="button"
											className="absolute right-0 bottom-2 text-gray-500"
											onClick={() =>
												setShowNewPassword(
													!showNewPassword
												)
											}>
											{showNewPassword ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.345.262-2.626.736-3.825M6.513 6.513A9.973 9.973 0 0112 5c5.523 0 10 4.477 10 10 0 1.345-.262 2.626-.736 3.825M9.172 9.172a4 4 0 015.656 5.656"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
											)}
										</button>
									</div>
								</div>

								<div className="mb-6">
									<label className="block mb-2 text-gray-700">
										Confirm Password
									</label>
									<div className="relative">
										<input
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											className="w-full border-b-2 border-[#4b164c] focus:border-purple-500 outline-none py-1"
											value={confirmPassword}
											onChange={(e) =>
												setConfirmPassword(
													e.target.value
												)
											}
										/>
										<button
											type="button"
											className="absolute right-0 bottom-2 text-gray-500"
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword
												)
											}>
											{showConfirmPassword ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.345.262-2.626.736-3.825M6.513 6.513A9.973 9.973 0 0112 5c5.523 0 10 4.477 10 10 0 1.345-.262 2.626-.736 3.825M9.172 9.172a4 4 0 015.656 5.656"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
											)}
										</button>
									</div>
								</div>
							</div>
							<div className="flex justify-center">
								<button
									type="submit"
									className="px-4 py-2 w-56 h-14 bg-[#4b164c] text-white rounded-full text-sm font-bold">
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<RightMenu />
		</div>
  );
};

export default ChangePassword;
