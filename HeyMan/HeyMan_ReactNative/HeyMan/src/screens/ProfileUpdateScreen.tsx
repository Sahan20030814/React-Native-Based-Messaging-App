import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUserProfile } from '../socket/UseUserProfile';
import { RootParamList } from '../../App';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type props = NativeStackScreenProps<RootParamList, "ProfileUpdateScreen">;

export default function ProfileUpdateScreen({
    route,
    navigation
}: props) {

    const { firstName, lastName } = route.params;

    const userProfileData = useUserProfile();

    const [first_ame, setFirstName] = useState(firstName);
    const [last_name, setLastName] = useState(lastName);
    const [channel, setChannel] = useState('Personal channel');
    const [bio, setBio] = useState('');
    const [birthday, setBirthday] = useState('');
    const MAX_BIO_LENGTH = 70;
    const currentBioLength = bio.length;

    const handleBioChange = (text: string) => {
        if (text.length <= MAX_BIO_LENGTH) {
            setBio(text);
        }
    };

    const showDatePicker = () => {
        console.log('Opening date picker for birthday');
    };

    const removeBirthday = () => {
        console.log('Action: Remove Birthday');
    };

    return (
        <View className='flex-1'>

            <View className="bg-white border-b border-gray-200">
                <View className="flex-row items-center justify-between px-4 py-3 bg-blue-500 pt-12 p-4 z-10">

                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} className="p-1">
                        <Feather name="arrow-left" size={22} color="white" />
                    </TouchableOpacity>

                    <Text className="text-white text-xl font-medium">Profile Info</Text>

                    <TouchableOpacity onPress={() => console.log('Save profile')} className="p-1">
                        <Text className="text-white text-xl font-medium">✓</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                className="flex-1 bg-gray-100"
                behavior="padding"
            >

                <ScrollView className="flex-1">

                    <Text className="text-sm text-blue-500 font-medium px-4 pt-4 pb-2">Your name</Text>
                    <View className="bg-white border-y border-gray-200">

                        <View className="flex-row justify-between items-center py-3 px-4 bg-white">
                            <TextInput
                                className="w-full text-lg text-gray-800 flex-1"
                                placeholder="First Name (required)"
                                value={first_ame}
                                onChangeText={setFirstName}
                            />
                        </View>

                        <View className="h-px bg-gray-200 ml-4" />

                        <View className="flex-row justify-between items-center py-3 px-4 bg-white">
                            <TextInput
                                className="w-full text-lg text-gray-800 flex-1"
                                placeholder="Last Name (optional)"
                                value={last_name}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>

                    <Text className="text-sm text-blue-500 font-medium px-4 pt-6 pb-2">Your channel</Text>
                    <View className="bg-white border-y border-gray-200">
                        <View className="flex-row justify-between items-center py-3 px-4">
                            <Text className="text-base text-gray-800 flex-1">{channel}</Text>
                            <TouchableOpacity onPress={() => console.log('Action: Add channel')}>
                                <Text className="text-blue-500 text-base">Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text className="text-sm text-blue-500 font-medium px-4 pt-6 pb-2">Your bio</Text>
                    <View className="bg-white border-y border-gray-200">
                        <View className="flex-row justify-between items-center py-3 px-4 bg-white">
                            <View className="relative w-full flex-1">
                                <TextInput
                                    className="w-full text-lg text-gray-800 min-h-[80px] p-0 pr-6"
                                    placeholder="Write about yourself..."
                                    value={bio}
                                    onChangeText={handleBioChange}
                                    maxLength={MAX_BIO_LENGTH}
                                    multiline
                                    textAlignVertical="top"
                                />

                                <Text className={`absolute top-0 right-0 text-xs ${currentBioLength === MAX_BIO_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
                                    {currentBioLength}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Text className="text-xs text-gray-500 px-4 pt-2">
                        You can add a few lines about yourself. Choose who can see your bio in
                        <Text className="text-blue-500" onPress={() => console.log('Action: Go to settings')}> Settings.</Text>
                    </Text>

                    <Text className="text-sm text-blue-500 font-medium px-4 pt-6 pb-2">Your birthday</Text>
                    <View className="bg-white border-y border-gray-200">

                        <TouchableOpacity onPress={showDatePicker} className="flex-row justify-between items-center py-3 px-4 bg-white">
                            <View className="flex-1">
                                <Text className={`text-sm mb-1 text-gray-400`}>
                                    Date of Birth
                                </Text>
                                <TextInput
                                    className={`text-base text-gray-800 p-0`}
                                    placeholder="Add your birthday"
                                    value={birthday}
                                    onChangeText={setBirthday}
                                    keyboardType="numeric"
                                />

                            </View>
                            <View />
                        </TouchableOpacity>

                        <View className="h-px bg-gray-200 ml-4" />

                        <TouchableOpacity onPress={removeBirthday} className="py-3 px-4 bg-white active:bg-gray-50">
                            <Text className="text-red-600 text-base font-medium">Remove Date of Birth</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-xs text-gray-500 px-4 pt-2">
                        Only your contacts can see your birthday.
                        <Text className="text-blue-500" onPress={() => console.log('Action: Change privacy settings')}> Change {'>'}</Text>
                    </Text>

                    <View className="h-10" />
                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    );
}