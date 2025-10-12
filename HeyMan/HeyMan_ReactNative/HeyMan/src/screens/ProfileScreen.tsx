import { Feather, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useUserProfile } from '../socket/UseUserProfile';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../App';
import { AuthContext } from '../components/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfileImage } from '../api/UserService';

type props = NativeStackNavigationProp<RootParamList, "ProfileScreen">;

interface ModalPopoverProps {
    isVisible: boolean;
    onClose: () => void;
}

const { width } = { width: 400 };

interface SettingsItem {
    icon: string;
    label: string;
    description?: string;
}

const accountItems: SettingsItem[] = [
    { icon: '💬', label: 'Chat Settings' },
    { icon: '🔒', label: 'Privacy and Security' },
    { icon: '🔔', label: 'Notifications and Sounds' },
    { icon: '💾', label: 'Data and Storage' },
    { icon: '⚡', label: 'Power Saving' },
];

const helpItems: SettingsItem[] = [
    { icon: '❓', label: 'Ask a Question' },
    { icon: '💡', label: 'HeyMan Features' },
];

const SettingsRow = ({ item }: { item: SettingsItem }) => (
    <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
        <Text className="text-2xl w-8 text-blue-500 mr-4 text-center">{item.icon}</Text>

        <View className="flex-1 border-b border-gray-100 py-1">
            <Text className="text-base text-gray-800">{item.label}</Text>
            {item.description && (
                <Text className="text-sm text-gray-500 mt-0.5">{item.description}</Text>
            )}
        </View>
    </TouchableOpacity>
);

export default function ProfileScreen() {

    const navigator = useNavigation<props>();

    const userProfileData = useUserProfile();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { width: screenWidth } = Dimensions.get('window');
    const headerHeight = screenWidth * 0.7;

    const [image, setImage] = useState<string | null>(null);
    const auth = useContext(AuthContext);

    const ModalPopover: React.FC<ModalPopoverProps> = ({ isVisible, onClose }) => {
        if (!isVisible) return null;

        return (
            <View
                className="absolute inset-0 bg-black/30 z-20"
            >
                <TouchableOpacity
                    className="flex-1"
                    onPress={onClose}
                    activeOpacity={1}
                >
                    <View
                        className="absolute top-12 right-4 bg-white rounded-xl shadow-2xl"
                        style={{
                            minWidth: width * 0.45,
                            maxWidth: width * 0.8
                        }}
                    >

                        {/* MenuItems */}

                        <TouchableOpacity
                            onPress={() => {
                                // navigator.navigate("ProfileUpdateScreen", { firstName: userProfileData?.first_name, lastName: userProfileData?.last_name });
                                navigator.navigate("ProfileUpdateScreen", {
                                    firstName: userProfileData?.first_name ?? "",
                                    lastName: userProfileData?.last_name ?? ""
                                });
                            }}
                            className="flex-row items-center p-3 active:bg-gray-100 min-w-[180px]"
                        >
                            <Text className="text-xl w-6 mr-3">📝</Text>
                            <Text className={`text-base text-gray-800`}>
                                Edit Info
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                pickImage();
                            }}
                            className="flex-row items-center p-3 active:bg-gray-100 min-w-[180px]"
                        >
                            <Text className="text-xl w-6 mr-3">📷</Text>
                            <Text className={`text-base text-gray-800`}>
                                Set Profile Photo
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center p-3 active:bg-gray-100 min-w-[180px]"
                        >
                            <Text className="text-xl w-6 mr-3">🎨</Text>
                            <Text className={`text-base text-gray-800`}>
                                Change profile color
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center p-3 active:bg-gray-100 min-w-[180px]"
                            onPress={() => {
                                if (auth) auth.signOut();
                                onClose();
                            }}
                        >
                            <Text className="text-xl w-6 mr-3">➡️</Text>
                            <Text className={`text-base text-red-600`}>
                                Log Out
                            </Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1">

                <View className="bg-blue-500 overflow-hidden" style={{ height: headerHeight }}>
                    <View className="flex-row items-center justify-between pt-12 p-4 z-10">
                        <TouchableOpacity className="pl-1 pt-2">
                            <Feather name="arrow-left" size={22} color="white" />
                        </TouchableOpacity>
                        <View className="flex-row">

                            <TouchableOpacity className="pt-2 pr-2">
                                <Fontisto name="search" size={20} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity className="pr-0 pl-2 pt-2" onPress={() => setIsModalVisible(true)}>
                                <Ionicons name="ellipsis-vertical" size={22} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="absolute bottom-0 left-0 right-0 items-center pb-6">
                        <View
                            className="w-32 h-32 rounded-full border-4 border-white bg-gray-300 mb-2 overflow-hidden"
                        >
                            {image ? (
                                <Image source={{ uri: image }} className="h-32 w-32 rounded-full border-gray-300 border-2" />
                            ) : userProfileData?.profileImage ? (
                                <Image className="h-32 w-32 rounded-full border-gray-300 border-2"
                                    source={{ uri: userProfileData?.profileImage }} />
                            ) : (
                                <Image source={{ uri: `https://ui-avatars.com/api/?name=${(userProfileData?.first_name + " " + userProfileData?.last_name).replace(" ", "+")}&background=random` }}
                                    className="w-32 h-32 rounded-full" />
                            )}

                        </View>

                        <Text className="text-white text-2xl font-bold">{userProfileData?.first_name} {userProfileData?.last_name}</Text>
                        <Text className="text-white/80 text-base">online</Text>
                    </View>
                </View>

                {isModalVisible && <ModalPopover
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                />}

                <TouchableOpacity className="absolute right-6 top-[22.7%] bg-white w-14 h-14 rounded-full justify-center items-center shadow-lg border border-gray-200 z-30"
                    onPress={() => {
                        pickImage();
                    }}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={25} color="gray" />
                </TouchableOpacity>

                <View className="p-4 pt-6 border-b border-gray-200">
                    <Text className="text-blue-500 text-sm font-semibold mb-3">Account</Text>

                    <TouchableOpacity className="mb-4">
                        <Text className="text-lg font-medium text-gray-900">{userProfileData?.country_code} {userProfileData?.contact_no}</Text>
                        <Text className="text-sm text-gray-500">Tap to change phone number</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mb-4">
                        <Text className="text-lg font-medium text-gray-500">None</Text>
                        <Text className="text-sm text-gray-500">Username</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mb-2">
                        <Text className="text-lg font-medium text-gray-500">Bio</Text>
                        <Text className="text-sm text-gray-500">Add a few words about yourself</Text>
                    </TouchableOpacity>
                </View>

                <View className="pt-4">
                    <Text className="text-blue-500 text-sm font-semibold px-4 mb-1">Settings</Text>
                    {accountItems.map((item, index) => (
                        <SettingsRow key={index} item={item} />
                    ))}
                </View>

                <View className="pt-4 border-t border-gray-200 mt-4">
                    <Text className="text-blue-500 text-sm font-semibold px-4 mb-1">Help</Text>
                    {helpItems.map((item, index) => (
                        <SettingsRow key={index} item={item} />
                    ))}
                </View>

                <View className="h-10"></View>
            </ScrollView>
        </View>
    );
}
