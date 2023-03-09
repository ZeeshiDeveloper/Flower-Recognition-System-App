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

const HomePage = ({ navigation }: any) => {
	const [selectedImage, setSelectedImage] = useState("");
	const [imageBase64, setImageBase64] = useState("");
	const [result, setResult] = useState("");

	// This function is triggered when the "Gallery" button pressed
	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
			base64: true,
			aspect: [4, 3],
		});
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			// console.log("result : ", result);
			setImageBase64(
				result.assets[0].base64 ? result.assets[0].base64 : "BASE64 error"
			);
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
		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			quality: 1,
			base64: true,
			aspect: [4, 3],
		});
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			// console.log("result : ", result.assets[0].uri);
			setImageBase64(
				result.assets[0].base64 ? result.assets[0].base64 : "BASE64 error"
			);
		} else {
			alert("You did not select any image.");
		}
	};
	console.log("selectedImage : ", selectedImage);

	// to signout the page
	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				navigation.replace("Login");
			})
			.catch((error) => alert(error.message));
	};

	//Upload Image
	const handleUpload = async (e: any) => {
		await fetch("https://be82-119-73-101-73.in.ngrok.io/upload", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify({
				my_image: imageBase64,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setResult(data["message"]);
				console.log(data["message"]);
				// Handle data
			});
	};

	console.log("selectedImage : ", selectedImage);
	console.log("Result ==================== ", result);
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
						<Text style={styles.nameText}>
							Flower Name : <Text style={styles.flowerName}>{result}</Text>
						</Text>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={handleUpload}
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
		marginTop: 15,
		width: "100%",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		backgroundColor: "#000000c0",
	},
	nameText: {
		color: "#fff",
		fontSize: 20,
	},
	flowerName: {
		fontWeight: "bold",
		color: "#07B571",
		fontSize: 22,
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
		paddingVertical: 13,
		paddingHorizontal: 15,
		alignItems: "center",
	},
});
