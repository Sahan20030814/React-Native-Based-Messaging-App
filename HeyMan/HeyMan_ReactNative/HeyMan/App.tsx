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
import { AuthContext, AuthProvider } from "./src/components/AuthProvider";
import { useContext } from "react";
import { UserRegistrationProvider } from "./src/components/UserContext";
import { ThemeProvider } from "./src/theme/TheameProvider";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";
import SignupNameScreen from "./src/screens/SignupNameScreen.";

export type RootParamList = {
  SplashScreen: undefined;
  StartMessagingScreen: undefined;
  SignupNameScreen: undefined;
  SignupContactScreen: undefined;
  SignupEmailScreen: undefined;
  EmailVerificationScreen: undefined;
  HomeScreen: undefined;
  ChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
  ContactSearchScreen: undefined;
  NewContactRegistrationScreen: undefined;
  ProfileScreen: undefined;
  ProfileUpdateScreen: {
    firstName: string;
    lastName: string;
  };
};

const Stack = createNativeStackNavigator<RootParamList>();

function HeyMan() {

  const auth = useContext(AuthContext);

  return (
    <WebSocketProvider userId={auth ? Number(auth.userId) : 0}>
      <ThemeProvider>
        <UserRegistrationProvider>

          <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ animation: 'fade' }}>

              {auth?.isLoading ? (
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
              ) : auth?.userId === null ? (
                <Stack.Group>
                  <>
                    <Stack.Screen name="StartMessagingScreen" component={StartMessagingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignupNameScreen" component={SignupNameScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignupContactScreen" component={SignupContactScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignupEmailScreen" component={SignupEmailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} options={{ headerShown: false }} />
                  </>
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ContactSearchScreen" component={ContactSearchScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="NewContactRegistrationScreen" component={NewContactRegistrationScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} options={{ headerShown: false }} />
                  </>
                </Stack.Group>
              )}

            </Stack.Navigator>
          </NavigationContainer>

        </UserRegistrationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default function App() {
  return (
    <AlertNotificationRoot>
      <AuthProvider>
        <HeyMan />
      </AuthProvider>
    </AlertNotificationRoot>
  );
}
