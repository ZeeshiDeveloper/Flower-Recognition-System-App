import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// for navbar
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./SCreens/LoginScreen";
import SignOutPage from "./SCreens/SignOutPage";
import HomePage from "./SCreens/HomePage";
const Stack = createNativeStackNavigator();

export default function App() {
	console.log("Debug by using console log");
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Login"
					options={{ headerShown: false }}
					component={LoginScreen}
				/>
				<Stack.Screen
					name="Home"
					options={{ headerShown: false }}
					component={HomePage}
				/>
				<Stack.Screen
					name="SignOut"
					options={{ headerShown: false }}
					component={SignOutPage}
				/>
			</Stack.Navigator>
			<StatusBar style="light" />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
