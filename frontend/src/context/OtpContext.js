import { createContext, useState } from "react";

const OtpContext = createContext(null);

const OtpProvider = ({ children }) => {
	const [phoneNumber, setPhoneNumber] = useState();

	const getMobileNumber = (number) => {
		setPhoneNumber(number);
	};

	return (
		<OtpContext.Provider value={{ phoneNumber, getMobileNumber }}>
			{children}
		</OtpContext.Provider>
	);
};

export default OtpContext;
export { OtpProvider };
