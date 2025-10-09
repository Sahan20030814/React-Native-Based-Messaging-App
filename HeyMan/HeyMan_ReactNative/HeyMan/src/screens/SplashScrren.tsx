import "../../global.css";
import React, { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { Image, StatusBar, View } from "react-native";

type props = NativeStackNavigationProp<RootParamList, "SplashScreen">;

export default function SplashScreen() {

    const navigator = useNavigation<props>();

    useEffect(() => {
        // Set timeout for screen navigation (2000ms = 2 seconds)
        const navigationTimer = setTimeout(() => {
            // Trigger navigation to the next screen
            navigator.replace("StartMessagingScreen");
        }, 2000);

        // Cleanup function
        return () => clearTimeout(navigationTimer);
    }, []);


    return (
        <View className="flex-1 justify-center items-center bg-white">
            <StatusBar hidden={true} />

            <View className={`rounded-full w-48 h-48 justify-center items-center mt-[-10]`}>
                <Image
                    source={require("../../assets/logo.png")}
                    className="w-full h-full rounded-full shadow-2xl shadow-blue-800/50"
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}
