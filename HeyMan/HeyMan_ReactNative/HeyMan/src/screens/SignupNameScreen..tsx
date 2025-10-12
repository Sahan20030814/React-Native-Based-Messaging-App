import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useUserRegistration } from '../components/UserContext';
import { validateFirstName, validateLastName } from '../util/Validation';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

type props = NativeStackNavigationProp<RootParamList, "SignupNameScreen">;

export default function SignupNameScreen() {

    const navigator = useNavigation<props>();

    const [firstNameFocus, setFirstNameFocus] = useState<boolean>(false);
    const [lastNameFocus, setLastNameFocus] = useState<boolean>(true);

    const { userData, setUserData } = useUserRegistration();

    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 px-8 pt-16 mt-14">

                <Text className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Create your account
                </Text>
                <Text className="text-center text-gray-500 mb-10 leading-relaxed px-10">
                    Just a few more steps and you're done! We hate paperwork, too.
                </Text>

                <View className="w-full relative mb-8">
                    <View className={`border rounded-xl px-3 py-2 flex-row items-center ${firstNameFocus ? "border-sky-400" : "border-gray-300"}`}>

                        <TextInput
                            className="flex-1 text-lg text-slate-700 dark:text-slate-100"
                            placeholder="Type your first name here"
                            placeholderTextColor="#94a3b8"
                            keyboardType="default"
                            value={userData.firstName}
                            onChangeText={(text) => {
                                setUserData((previous) => ({
                                    ...previous,
                                    firstName: text
                                }));
                            }}
                            maxLength={45}
                            onFocus={() => {
                                setLastNameFocus(false);
                                setFirstNameFocus(true);
                            }}
                            onKeyPress={() => {
                                setLastNameFocus(false);
                                setFirstNameFocus(true);
                            }}
                        />
                    </View>

                    <View className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-1">
                        <Text className={`text-sm font-semibold ${firstNameFocus ? "text-sky-500" : "text-gray-500"}`}>
                            First Name
                        </Text>
                    </View>
                </View>

                <View className="w-full relative">
                    <View className={`border rounded-xl px-3 py-2 flex-row items-center ${lastNameFocus ? "border-sky-400" : "border-gray-300"}`}>

                        <TextInput
                            className="flex-1 text-lg text-slate-700 dark:text-slate-100"
                            placeholder="Type your last name here"
                            placeholderTextColor="#94a3b8"
                            keyboardType="default"
                            value={userData.lastName}
                            onChangeText={(text) => {
                                setUserData((previous) => ({
                                    ...previous,
                                    lastName: text
                                }));
                            }}
                            maxLength={45}
                            onFocus={() => {
                                setFirstNameFocus(false);
                                setLastNameFocus(true);
                            }}
                            onKeyPress={() => {
                                setFirstNameFocus(false);
                                setLastNameFocus(true);
                            }}
                        />
                    </View>

                    <View className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-1">
                        <Text className={`text-sm font-semibold ${lastNameFocus ? "text-sky-500" : "text-gray-500"}`}>
                            Last Name
                        </Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity style={{ marginBottom: 30 }}
                className="absolute bottom-80 right-8 w-16 h-16 rounded-full bg-blue-500 justify-center items-center shadow-xl shadow-blue-500/50"
                activeOpacity={0.8}
                onPress={() => {

                    let validFirstName = validateFirstName(userData.firstName);
                    let validLastName = validateLastName(userData.lastName);

                    if (validFirstName) {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Warning',
                            textBody: validFirstName,
                        })
                    } else if (validLastName) {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Warning',
                            textBody: validLastName,
                        })
                    } else {
                        navigator.navigate("SignupContactScreen");
                    }

                }}
            >
                <Feather name="arrow-right" size={26} color="white" />
            </TouchableOpacity>

            <View className="h-40" />
        </View>
    );
}