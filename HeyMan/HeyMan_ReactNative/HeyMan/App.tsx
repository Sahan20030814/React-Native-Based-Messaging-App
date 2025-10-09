import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./src/screens/SplashScrren";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import StartMessagingScreen from "./src/screens/StartMessagingScreen";
import SignupContactScreen from "./src/screens/SignupContactScreen";
import SignupEmailScreen from "./src/screens/SignupEmailScreen";
import EmailVerificationScreen from "./src/screens/EmailVerificationScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ContactSearchScreen from "./src/screens/ContactSearchScreen";
import ChatScreen from "./src/screens/ChatScreen";
import NewContactRegistrationScreen from "./src/screens/NewContactRegistrationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ProfileUpdateScreen from "./src/screens/ProfileUpdateScreen";

export type RootParamList = {
  SplashScreen: undefined;
  StartMessagingScreen: undefined;
  SignupContactScreen: undefined;
  SignupEmailScreen: undefined;
  EmailVerificationScreen: undefined;
  HomeScreen: undefined;
  ChatScreen: undefined;
  ContactSearchScreen: undefined;
  NewContactRegistrationScreen: undefined;
  ProfileScreen: undefined;
  ProfileUpdateScreen: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

function HeyMan() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ animation: 'fade' }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StartMessagingScreen" component={StartMessagingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupContactScreen" component={SignupContactScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupEmailScreen" component={SignupEmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ContactSearchScreen" component={ContactSearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewContactRegistrationScreen" component={NewContactRegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AlertNotificationRoot>
      <HeyMan />
    </AlertNotificationRoot>
  );
}
