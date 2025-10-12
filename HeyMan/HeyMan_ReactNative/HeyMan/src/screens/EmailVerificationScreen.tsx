import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { RootParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useUserRegistration } from '../components/UserContext';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { verifyAccount } from '../api/UserService';
import { AuthContext } from '../components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const INPUT_WIDTH = (width - (2 * 32) - (3 * 10)) / 4;

type props = NativeStackNavigationProp<RootParamList, "EmailVerificationScreen">;

export default function EmailVerificationScreen() {

    const navigator = useNavigation<props>();

    const auth = useContext(AuthContext);

    const { userData, setUserData } = useUserRegistration();

    const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = async (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 4) {
            inputs.current[index + 1]?.focus();
        }

        if (newOtp.every((digit) => digit !== "")) {
            const otpValue = newOtp.join("");

            setUserData((previous) => ({
                ...previous,
                vcode: otpValue
            }));

            try {
                const response = await verifyAccount(userData);

                if (response.status) {
                    const id = response.userId;
                    const name = response.userName;
                    const countryCode = response.countryCode;
                    const contactNo = response.contactNo;
                    if (auth) {

                        try {
                            await AsyncStorage.setItem("username", JSON.stringify(response.userName));
                            await AsyncStorage.setItem("countryCode", JSON.stringify(response.countryCode));
                            await AsyncStorage.setItem("contactNo", JSON.stringify(response.contactNo));
                        } catch (error) {
                            console.log(error);
                        }

                        await auth.signUp(String(id));
                    }
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Warning',
                        textBody: response.message,
                    })
                }
            } catch (error) {
                console.log(error);
            }

        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="flex-1 bg-white">

            <View className="p-4 pt-10 flex-row items-center">
                <TouchableOpacity activeOpacity={0.7} className="p-2"
                    onPress={() => {
                        navigator.goBack();
                    }}>
                    <Text className="text-2xl text-gray-500 font-bold leading-none">←</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-8 items-center pt-4">
                <Image source={require("../../assets/email.png")} className='mb-7' style={{ width: 120, height: 90 }} />

                <Text className="text-2xl font-semibold text-center text-gray-800 mb-2">
                    Check Your Email
                </Text>
                <Text className="text-center text-gray-500 mb-8 leading-relaxed">
                    Please enter the code we have sent to your email <Text className="font-semibold text-gray-800">{userData.email}</Text>.
                </Text>

                <View className="flex-row justify-between w-64 self-center">
                    {otp.map((value, index) => {
                        const isFocused = inputs.current[index]?.isFocused?.() ?? false;
                        return (
                            <TextInput
                                key={index}
                                ref={el => { inputs.current[index] = el; }}
                                value={value}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                className={`w-12 h-12 text-center text-lg rounded-xl border py-1 
              ${isFocused ? "border-blue-400" : "border-gray-300"}`}
                            />
                        );
                    })}
                </View>

                <TouchableOpacity className="mt-8"
                    onPress={() => {
                        navigator.goBack();
                    }}
                >
                    <Text className="text-base text-blue-500">
                        Can't access this email?
                    </Text>
                </TouchableOpacity>

                <Text className="text-center text-gray-400 mt-6 mb-4">or</Text>

                <TouchableOpacity
                    className="flex-row items-center justify-center p-2 rounded-lg active:bg-gray-100"
                >
                    <Image source={require("../../assets/google_icon.png")}
                        style={{ width: 24, height: 24 }}
                        className='mr-2'
                    />
                    <Text className="text-base text-blue-500 font-semibold">Sign in with Google</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}