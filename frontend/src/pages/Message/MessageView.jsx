import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import { CiCircleChevLeft, CiPhone } from "react-icons/ci";
import { ImAttachment } from "react-icons/im";
import { CiMicrophoneOn } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axio/axiosInstance";
import { toast } from "react-toastify";
import { TbSend2 } from "react-icons/tb";
import { SocketContext } from "../../context/socketContext";

function MessageView() {
	const lastMessageRef = useRef();
	const navigate = useNavigate();
	const { socket } = useContext(SocketContext);
	const { id: receiverId } = useParams();
	const [conversation, setConversation] = useState([]);
	const [hasMessage, setHasMessage] = useState(true);
	const [message, setMessage] = useState("");
	const [receiverName, setReceiverName] = useState("");

	console.log(socket);
	// scroll to the latest message
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [conversation]);

	// listen for new incoming messages
	useEffect(() => {
		if (socket) {
			socket.on("newMessage", (newMessage) => {
				setConversation((prev) => [...prev, newMessage]);
			});
		}

		return () => {
			if (socket) {
				socket.off("newMessage");
			}
		};
	}, [socket]);

	// get conversations
	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axiosInstance.get(`/message/${receiverId}`);
				setHasMessage(res.data.success);
				setConversation(res.data.messages);
				setReceiverName(res.data.receiverName.name);
			} catch (error) {
				setHasMessage(error.response.data.success);
				setReceiverName(error.response.data.receiverName.name);
			}
		};
		getConversations();
	}, [receiverId,message]);

	// send message
	const handleSendMsg = useCallback(async () => {
		try {
			const res = await axiosInstance.post(`/message/${receiverId}`, {
				message,
			});

			if (res.data.success) {
				setMessage("");
			}
		} catch (error) {
			toast(error.response.data.message);
		}
	}, [message]);

	// send message by ender key
	const handleKeyPress = (e) => {
		if (e.key === "Enter" && message.trim()) {
			handleSendMsg();
		}
	};

	const extractTime = (timestamp) => {
		// Create a Date object from the timestamp
		const date = new Date(timestamp);

		// Extract the time from the Date object
		const time = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});

		return time;
	};

	return (
		<div className="flex ">
			<LeftMenu />

			<div className="w-full  overflow-hidden ">
				<div className="bg-[#4b164c] text-white flex items-center justify-between px-6 py-12 lg:py-8 md:py-6 ">
					<span
						className="text-fs-xl cursor-pointer"
						onClick={() => navigate(-1)}>
						<CiCircleChevLeft />
					</span>
					<p className="text-fs-md">{receiverName}</p>
					<span className="text-fs-xl cursor-pointer">
						<CiPhone />
					</span>
				</div>
				<div className="bg-re-400 rounded-t-3xl overflow-x-hidden relative pb-16 h-[80vh] corner-shadow">
					{/* messages layout */}
					{conversation?.map((message) => (
						<div
							ref={lastMessageRef}
							key={message._id}
							className={`w-fit max-w-[700px] my-4 py-5 px-8 pr-16 md:py-4 relative shadow-md ${
								receiverId === message.receiverId
									? "ml-auto bg-[#e8f1ff] rounded-l-xl"
									: "mr-auto bg-[#8c6a8d] rounded-r-xl text-white"
							} `}>
							<p className=" break-words text-fs-sm font-bold">
								{message.message}
							</p>
							<p className="text-fs-xs font-normal absolute right-3 bottom-0 whitespace-nowrap">
								{extractTime(message.createdAt)}
							</p>
						</div>
					))}

					{!hasMessage && (
						<p className="text-center font-bold text-fs-md mt-10">
							Send Message to Start Conversation
						</p>
					)}

					{/* messages input */}
					<div className="flex items-center border fixed bottom-4 left-[50%] translate-x-[-50%] lg:left-[40%] lg:max-w-[400px] md:left-[50%] md:max-w-[500px] w-[95%] max-w-[500px] rounded-3xl overflow-hidden px-1 bg-[#f5f9ff] ">
						<input
							type="text"
							placeholder="Message"
							className="w-full py-3 px-5 outline-none border-none bg-transparent peer"
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							value={message}
							required
						/>
						<label
							htmlFor="attach"
							className=" text-fs-base px-3 cursor-pointer">
							<ImAttachment />
							<input type="file" id="attach" hidden />
						</label>
						<span className="bg-blue-600 text-white p-2 rounded-full cursor-pointer text-fs-md peer-focus:hidden peer-valid:hidden ">
							<CiMicrophoneOn />
						</span>
						<span
							onClick={handleSendMsg}
							className="bg-blue-600 text-white p-2 rounded-full cursor-pointer text-fs-md hidden peer-focus:block peer-valid:block">
							<TbSend2 />
						</span>
					</div>
				</div>
			</div>

			<RightMenu />
		</div>
	);
}

export default MessageView;
