import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CountrySelect, { ICountry } from 'react-native-country-select';
import { RootParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useUserRegistration } from '../components/UserContext';
import { validateCountryCode, validatePhoneNo } from '../util/Validation';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { createNewAccount } from '../api/UserService';

type props = NativeStackNavigationProp<RootParamList, "SignupContactScreen">;

export default function SignupContactScreen() {

    const navigator = useNavigation<props>();

    const [loading, setLoading] = useState(false);

    const [countryFocus, setCountryFocus] = useState<boolean>(false);
    const [phoneFocus, setPhoneFocus] = useState<boolean>(true);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const countryRef = useRef({});

    const handleCountrySelect = (country: ICountry) => {
        countryRef.current = country;
        setSelectedCountry(country);

        setUserData((previous) => ({
            ...previous,
            countryCode: country.idd.root
        }));

        setShowPicker(false);
    };

    const { userData, setUserData } = useUserRegistration();

    return (
        <View className="flex-1 bg-white">

            <View className="pl-4 pt-10 flex-row items-center">
                <TouchableOpacity onPress={() => {
                    navigator.goBack();
                }} activeOpacity={0.7} className="pl-2">
                    <Text className="text-2xl text-gray-500 font-bold leading-none">←</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-8 mt-14">

                <Text className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Your phone number
                </Text>
                <Text className="text-center text-gray-500 mb-10 leading-relaxed px-10">
                    Please confirm your country code and enter your phone number.
                </Text>

                <View className="w-full relative mb-7">

                    <View className={`border rounded-xl p-3 flex-row items-center ${countryFocus ? "border-sky-400" : "border-gray-300"}`}>

                        <View className="flex-row items-center justify-between w-full px-10">
                            <Text className="text-lg text-slate-700">{selectedCountry?.flag || ""}  {selectedCountry?.name?.common || "Select country"}</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    setShowPicker(true);
                                    setPhoneFocus(false);
                                    setCountryFocus(true);
                                }}
                            >
                                <AntDesign name="caret-down" size={24} color="black" style={{ marginTop: 5, marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>

                        <CountrySelect
                            visible={showPicker}
                            onClose={() => setShowPicker(false)}
                            onSelect={handleCountrySelect}
                        />

                    </View>

                    <View className="absolute -top-3 left-4 bg-white px-1">
                        <Text className={`text-sm font-semibold ${countryFocus ? "text-sky-500" : "text-gray-500"}`}>
                            Country
                        </Text>
                    </View>
                </View>

                <View className="w-full relative">
                    <View className={`border rounded-xl p-3 flex-row items-center ${phoneFocus ? "border-sky-400" : "border-gray-300"}`}>

                        <TextInput
                            className="w-16 text-center text-lg text-slate-700"
                            keyboardType="phone-pad"
                            value={userData.countryCode}
                            onChangeText={(text) => {
                                setUserData((previous) => ({
                                    ...previous,
                                    countryCode: text
                                }));
                            }}
                            maxLength={5}
                            editable={false}
                            onContentSizeChange={() => {
                                setCountryFocus(false);
                                setPhoneFocus(true);
                            }}
                        />

                        <View className="w-[1px] h-6 bg-slate-300 mx-2" />

                        <TextInput
                            className="flex-1 text-lg text-slate-700 dark:text-slate-100"
                            placeholder="## ### ####"
                            placeholderTextColor="#94a3b8"
                            keyboardType="phone-pad"
                            value={userData.contactNo}
                            onChangeText={(text) => {
                                setUserData((previous) => ({
                                    ...previous,
                                    contactNo: text
                                }));
                            }}
                            maxLength={12}
                            onFocus={() => {
                                setCountryFocus(false);
                                setPhoneFocus(true);
                            }}
                            onKeyPress={() => {
                                setCountryFocus(false);
                                setPhoneFocus(true);
                            }}
                        />
                    </View>

                    <View className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-1">
                        <Text className={`text-sm font-semibold ${phoneFocus ? "text-sky-500" : "text-gray-500"}`}>
                            Phone number
                        </Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity style={{ marginBottom: 30 }}
                className="absolute bottom-80 right-8 w-16 h-16 rounded-full bg-blue-500 justify-center items-center shadow-xl shadow-blue-500/50"
                activeOpacity={0.8}
                disabled={loading ? true : false}
                onPress={async () => {

                    setUserData((previous) => ({
                        ...previous,
                        email: "",
                        vcode: ""
                    }));

                    let validCountryCode = validateCountryCode(userData.countryCode);
                    let validPhoneNo = validatePhoneNo(userData.contactNo);

                    if (validCountryCode) {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Warning',
                            textBody: validCountryCode,
                        })
                    } else if (validPhoneNo) {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Warning',
                            textBody: validPhoneNo,
                        })
                    } else {
                        try {
                            setLoading(true);
                            const response = await createNewAccount(userData);

                            if (response.status) {

                                if (response.message === "no_email_added") {
                                    navigator.navigate("SignupEmailScreen");
                                } else if (response.message === "email_added") {

                                    setUserData((previous) => ({
                                        ...previous,
                                        email: response.email
                                    }));

                                    navigator.navigate("EmailVerificationScreen");
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
                        } finally {
                            setLoading(false);
                        }
                    }
                }}
            >
                <Feather name="arrow-right" size={26} color="white" />
            </TouchableOpacity>

            <View className="h-40" />
        </View>
    );
}