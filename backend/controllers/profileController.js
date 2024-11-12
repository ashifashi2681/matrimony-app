const Profile = require("../models/profile");
const RelationshipGoal = require("../models/relationShipGoal");
const User = require("../models/user");
const Job = require("../models/job");

// const profile = async (req, res) => {

// 	try {
// 		const {
// 			userId,
// 			age,
// 			dob,
// 			location,
// 			hobbies,
// 			interests,
// 			smoking,
// 			drinking,
// 			qualification,
// 		} = req.body;

// 		const { profilePic, morePics } = req.files;

// 		// check the user exist
// 		const user = await User.findOne({ _id: req.user._id }).select(
// 			"-password -confirmPassword"
// 		);
// 		if (!user) {
// 			return res
// 				.status(400)
// 				.json({ success: false, message: "user not found" });
// 		}

// 		// convert buffer data to base64 string
// 		const profilePicString =
// 			req.files.profilePic[0].buffer.toString("base64");
// 		// console.log(profilePicString);

// 		// save the profile details
// 		const newProfile = new Profile({
// 			userId: user.id,
// 			age,
// 			dob,
// 			location,
// 			hobbies,
// 			interests,
// 			smoking,
// 			drinking,
// 			qualification,

// 			profilePic: {
// 				data: profilePicString,
// 				contentType: profilePic[0].mimetype,
// 			},
// 			morePics: morePics?.map((file) => ({
// 				data: file.buffer,
// 				contentType: file.mimetype,
// 			})),
// 		});
// 		await newProfile.save();

// 		await user.updateOne({ profile: newProfile._id });
// 		const updatedUser = await User.findOne({ _id: req.user._id }).select(
// 			"-password -confirmPassword"
// 		).populate("profile");

// 		if(updatedUser.profile.profilePic){
// 			updatedUser.profile.profilePic={
// 				data:updatedUser.profile.profilePic.data.toString('base64'),
// 				contentType:updatedUser.profile.profilePic.contentType,
// 			};
// 		}

// 		console.log("updateduser==",updatedUser);

// 		return res.status(200).json({
// 			success: true,
// 			message: "Profile created",
// 			user: updatedUser,
// 		});
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// };

//===============================================================================
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a buffer to Cloudinary
const uploadFromBuffer = (buffer) => {
	return new Promise((resolve, reject) => {
		let stream = cloudinary.uploader.upload_stream((error, result) => {
			if (result) {
				resolve(result);
			} else {
				reject(error);
			}
		});
		streamifier.createReadStream(buffer).pipe(stream);
	});
};

const profile = async (req, res) => {
	try {
		const {
			age,
			dob,
			location,
			hobbies,
			interests,
			smoking,
			drinking,
			qualification,
		} = req.body;

		// Upload profile picture
		let profilePicUrl = null;
		if (req.files.profilePic) {
			const profilePicResult = await uploadFromBuffer(
				req.files.profilePic[0].buffer
			);
			profilePicUrl = profilePicResult.secure_url;
		}

		// Upload more pictures
		let morePicsUrls = [];
		if (req.files.morePics) {
			for (let i = 0; i < req.files.morePics.length; i++) {
				const morePicResult = await uploadFromBuffer(
					req.files.morePics[i].buffer
				);
				morePicsUrls.push(morePicResult.secure_url);
			}
		}

		// Create a new profile
		const newProfile = new Profile({
			userId: req.user._id,
			age,
			dob,
			location,
			hobbies,
			interests,
			smoking,
			drinking,
			qualification,
			profilePic: profilePicUrl,
			morePics: morePicsUrls,
		});

		await newProfile.save();

		// Update the user's profile reference
		await User.findByIdAndUpdate(req.user._id, { profile: newProfile._id });

		res.status(200).json({
			success: true,
			message: "Profile created",
			user: newProfile,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};

//====================================================================


const profileEdit = async (req, res) => {
	console.log('Entering profile edit =====');
	try {
		const { name, username, email, mobile, bio } = req.body;

		console.log(`Looking for profile with userId: ${req.user._id}`);

		const updatedProfile = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{
				...(name && { name }),
				...(username && { username }),
				...(email && { email }),
				...(mobile && { mobile }),
				...(bio && { bio })
			},
			{ new: true, upsert: false }
		);


		let profilePicUrl
		let morePicsUrls

		if (req.files.profilePic) {
			const profilePicResult = await uploadFromBuffer(req.files.profilePic[0].buffer);
			profilePicUrl = profilePicResult.secure_url;
		}

		if (req.files.morePics) {
			const uploadPromises = req.files.morePics.map(async (file) => {
				const morePicResult = await uploadFromBuffer(file.buffer);
				return morePicResult.secure_url;
			});
			morePicsUrls = await Promise.all(uploadPromises);
		}

		
		const updatedProfileImages = await Profile.findOneAndUpdate(
			{
				userId: req.user._id
			},
			{
				profilePic: profilePicUrl,
				$push: { morePics: { $each: morePicsUrls } }
			},
			{ new: true, upsert: false }
		);

		if (!updatedProfileImages) {
			console.log("images potti")
		}


		res.status(200).json({ success: true, message: 'Profile updated', profile: updatedProfile });
	} catch (error) {
		console.error('Error updating profile:', error.message);
		res.status(500).json({ success: false, message: 'Error updating profile' });
	}
};



// relationship goal create
const relationshipGoal = async (req, res) => {
	try {
		const { userId, shortTerm, longTerm } = req.body;
		// check the user exist
		const user = await User.findOne({ _id: req.user._id }).select(
			"-password -confirmPassword"
		);
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "user not found" });
		}
		// check the user has already saved the relationship goal
		const relationship = await RelationshipGoal.findOne({
			userId: user._id,
		});

		if (relationship) {
			return res.status(400).json({
				success: false,
				message: "user already has a relationship goal",
			});
		}

		// save the relationship goal details
		const newRelationship = new RelationshipGoal({
			userId: user._id,
			shortTerm,
			longTerm,
		});
		await newRelationship.save();
		await user.updateOne({ relationshipGoal: newRelationship._id });
		const updatedUser = await User.findOne({ _id: req.user._id })
			.select("-password -confirmPassword")
			.populate("job")
			.populate("profile")
			.populate("relationshipGoal");

		return res.status(200).json({
			success: true,
			message: "Relationship goal created",
			user: updatedUser,
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { profile, relationshipGoal, profileEdit };
