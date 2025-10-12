import "../../global.css";
import React, { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { Image, StatusBar, View } from "react-native";
import { useWebSocketPing } from "../socket/UseWebSocketPing";

type props = NativeStackNavigationProp<RootParamList, "SplashScreen">;

export default function SplashScreen() {

    const navigator = useNavigation<props>();

    useWebSocketPing(240000); //4 MINUTES

    useEffect(() => {
        const navigationTimer = setTimeout(() => {
        }, 2000);

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
