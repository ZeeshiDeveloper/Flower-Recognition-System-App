import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from "react-native"; //rnfes
import React, { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const HomePage = ({ navigation }: any) => {
	const [selectedImage, setSelectedImage] = useState("");

	// This function is triggered when the "Gallery" button pressed
	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert("You did not select any image.");
		}
	};
	// This function is triggered when the "Camera" button pressed
	const openCamera = async () => {
		// Ask the user for the permission to access the camera
		const permissionResult = await ImagePicker.getCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("You've refused to allow this appp to access your camera!");
			return;
		}

		const result = await ImagePicker.launchCameraAsync();
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert("You did not select any image.");
		}
	};

	// to signout the page
	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				navigation.replace("Login");
			})
			.catch((error) => alert(error.message));
	};

	//handleSubmit
	let img = "./images/Home.jpg";
	const handleSubmit = (e: any) => {
		const imageData = new FormData();
		imageData.append("file", selectedImage);
		const requestOPt = {
			method: "POST",
			body: imageData,
		};
		fetch("http://127.0.0.1:8000/upload", requestOPt)
			.then((res) => {
				res.json();
				console.log("Response : ", res);
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};

	// const handleSubmit = async () => {
	// 	const res = await axios.get('http://127.0.0.1:8000/msg')
	// 	console.log(res.data)
	// }

	console.log("selectedImage : ", selectedImage);
	return (
		<>
			<View style={styles.container}>
				<ImageBackground
					source={require("../images/spalsh2.webp")}
					resizeMode="cover"
					style={styles.image}
				>
					<Text style={styles.header}></Text>
					<Text style={styles.text}>Flower Identifier</Text>
					<View style={styles.imageContainer}>
						{selectedImage && (
							<Image source={{ uri: selectedImage }} style={styles.tinyLogo} />
						)}
					</View>
					<View style={styles.name}>
						<Text style={styles.nameText}>Flower Name : </Text>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={handleSubmit}
							style={styles.buttonSubmit}
						>
							<Text style={styles.buttonText}>Result</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={pickImageAsync} style={styles.button}>
							<Text style={styles.buttonText}>Gallery</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={openCamera}
							style={[styles.button, styles.buttonOutline]}
						>
							<Text style={[styles.buttonText, styles.buttonTextOutline]}>
								Camera
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleSignOut} style={styles.buttonOut}>
							<Text style={styles.signOut}>Sign out</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingTop: 5,
		backgroundColor: "#000000c0",
	},
	image: {
		flex: 1,
		alignItems: "center",
	},
	text: {
		color: "white",
		fontSize: 37,
		lineHeight: 84,
		paddingLeft: 20,
		// fontFamily: "Pacifico",
		marginTop: 80,
		width: "100%",
		backgroundColor: "#000000c0",
	},
	imageContainer: {
		paddingTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	name: {
		marginTop: 10,
	},
	nameText: {
		color: "#fff",
		fontSize: 18,
	},
	buttonContainer: {
		width: "70%",
		marginTop: 35,
		display: "flex",
		flexDirection: "column",
	},
	button: {
		backgroundColor: "#07B571",
		borderRadius: 10,
		marginTop: 6,
		paddingVertical: 13,
		paddingHorizontal: 15,
		alignItems: "center",
	},
	buttonOutline: {
		backgroundColor: "#fff",
		borderWidth: 2,
		borderColor: "#0782F9",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "700",
	},
	buttonTextOutline: {
		color: "#0782F9",
	},
	buttonOut: {
		backgroundColor: "#f54335",
		borderRadius: 10,
		marginTop: 6,
		paddingVertical: 13,
		paddingHorizontal: 15,
		alignItems: "center",
	},
	signOut: {
		fontWeight: "700",
		color: "#fff",
	},
	tinyLogo: {
		width: 250,
		height: 250,
		borderRadius: 20,
	},
	buttonSubmit: {
		backgroundColor: "#0782F9",
		borderRadius: 10,
		marginTop: 6,
		paddingVertical: 13,
		paddingHorizontal: 15,
		alignItems: "center",
	},
});
