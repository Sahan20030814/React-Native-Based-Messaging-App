import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { RootParamList } from '../../App';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

type props = NativeStackNavigationProp<RootParamList, "SignupEmailScreen">;

export default function SignupEmailScreen() {

    const navigator = useNavigation<props>();

    const [email, setEmail] = useState('');

    return (
        <View className="flex-1 bg-white">

            <View className="p-4 pt-10 flex-row items-center">
                <TouchableOpacity onPress={() => {
                    navigator.goBack();
                }} activeOpacity={0.7} className="p-2">
                    <Text className="text-2xl text-gray-500 font-bold leading-none">←</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-8 items-center">

                <Text className="text-6xl mb-6">📬</Text>

                <Text className="text-2xl font-semibold text-center text-gray-800 mb-2">
                    Choose a login email
                </Text>
                <Text className="text-center text-gray-500 mb-10 leading-relaxed">
                    You will receive HeyMan login codes via email and not SMS. Please enter an email address to which you have access.
                </Text>

                <View className="w-full relative">
                    <View className={`border rounded-xl p-3 flex-row items-center border-sky-400`}>

                        <TextInput
                            className="flex-1 text-lg text-slate-700"
                            placeholder="abc@gmail.com"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                    </View>

                    <View className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-1">
                        <Text className={`text-sm font-semibold text-sky-500`}>
                            Email Address
                        </Text>
                    </View>
                </View>

                <View className='flex-row justify-between mt-6'>
                    <View className='flex-col me-20'>

                        <View className="flex-row items-center mt-10 mb-4">
                            <View className="flex-1 h-[1px] bg-gray-300" />
                            <Text className="mx-3 text-gray-400">or</Text>
                            <View className="flex-1 h-[1px] bg-gray-300" />
                        </View>

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

                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigator.navigate("EmailVerificationScreen");
                            }}
                            className=" w-16 h-16 rounded-full bg-blue-500 justify-center items-center shadow-xl shadow-blue-500/50"
                            activeOpacity={0.8}
                        >
                            <Feather name="arrow-right" size={26} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <View className="h-40" />
        </View>
    );
}