import {
  ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = ({navigation}:any) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  
	// Firebase User Configuration
	const HandleSignUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials: { user: any }) => {
				alert("Register Successfully");

				const user = userCredentials.user;
				console.log(user.email);
			})
			.catch((error: { message: any }) => alert(error.message));
	};

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        alert("Login Successfully")
        navigation.replace("Home")

        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

	return (
    <View style={styles.container}>
    <ImageBackground
					source={require("../images/login2.jpg")}
					resizeMode="cover"
					style={styles.image}
				>
		<KeyboardAvoidingView
			style={styles.keyboardView}
			enabled
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
					inputMode={"email"}
					keyboardType={"email-address"}
				/>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={(pas) => setPassword(pas)}
					style={styles.input}
					secureTextEntry
				/>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity 
        onPress={handleLogin} 
        style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={HandleSignUp}
					style={[styles.button, styles.buttonOutline]}
				>
					<Text style={[styles.buttonText, styles.buttonTextOutline]}>
						Register
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
    </ImageBackground>
    </View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  image: {
		flex: 1,
    alignItems:"center"
	},
  keyboardView:{
    flex:1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
  },
	inputContainer: {
		width: "80%",
	},
	input: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginTop: 6,
		borderRadius: 10,
		backgroundColor: "#fff",
	},
	buttonContainer: {
		width: "40%",
		marginTop: 35,
	},
	button: {
		backgroundColor: "#0782F9",
		borderRadius: 10,
		marginTop: 6,
		paddingVertical: 10,
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
});
