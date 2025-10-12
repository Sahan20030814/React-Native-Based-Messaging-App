import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useChatList } from '../socket/UseChatList';
import { Chat } from '../socket/chat';
import { formatChatTime } from '../util/DataFormatter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

type props = NativeStackNavigationProp<RootParamList, "HomeScreen">;

export default function HomeScreen() {

    const [getUserName, setUserDName] = useState<string>("");
    const [getCountryCode, setCountryCode] = useState<string>("");
    const [getContactNo, setContactNo] = useState<string>("");

    const navigator = useNavigation<props>();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const username = await AsyncStorage.getItem("username");
                if (username != null) {
                    setUserDName(JSON.parse(username));
                }
                const countryCode = await AsyncStorage.getItem("countryCode");
                if (countryCode != null) {
                    setCountryCode(JSON.parse(countryCode));
                }
                const contactNo = await AsyncStorage.getItem("contactNo");
                if (contactNo != null) {
                    setContactNo(JSON.parse(contactNo));
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkUser();
    }, [navigator]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const chatList = useChatList();

    const filterChats = [...chatList].sort(
        (a, b) =>
            new Date(b.lastTimeStamp).getTime() -
            new Date(a.lastTimeStamp).getTime()
    );

    const renderItem = ({ item }: { item: Chat }) => (

        <TouchableOpacity className="flex-row items-center p-3 border-b border-gray-100 active:bg-gray-50"
            onPress={() => {
                navigator.navigate("ChatScreen", {
                    chatId: item.friendId,
                    friendName: item.friendName,
                    lastSeenTime: formatChatTime(item.lastTimeStamp),
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`,
                });
            }}>

            <View className={`w-12 h-12 rounded-full justify-center items-center mr-3`}>
                {item.profileImage ? (
                    <Image source={{ uri: item.profileImage }} className="w-12 h-12 rounded-full" />
                ) : (
                    <Image source={{ uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random` }}
                        className="w-12 h-12 rounded-full" />
                )}
            </View>

            <View className="flex-1">
                <View className="flex-row justify-between items-center">
                    <Text className="font-semibold text-lg text-gray-900">{item.friendName}</Text>
                    <Text className="text-xs text-gray-500">{formatChatTime(item.lastTimeStamp)}</Text>
                </View>
                <View className="flex-row justify-between items-center mt-0.5">
                    <Text className={`text-gray-500 text-sm`} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View className="bg-green-500 rounded-full w-5 h-5 items-center justify-center">
                            <Text className="text-white text-xs">{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>

    );

    return (
        <View className="flex-1 bg-white">

            <View className="p-4 pt-10 bg-blue-500 flex-row items-center justify-between shadow-md">

                <TouchableOpacity onPress={toggleSidebar} className="p-2 -ml-1">
                    <Text className="text-white text-2xl">☰</Text>
                </TouchableOpacity>

                <Text className="text-white text-xl font-semibold">HeyMan</Text>

                <TouchableOpacity onPress={() => {
                    navigator.navigate("ContactSearchScreen");
                }}
                    className="p-2 -mr-1">
                    <Fontisto name="search" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 mb-14">
                <Text className="text-blue-500 font-semibold p-4 pt-3 pb-2 text-sm">Your contacts on HeyMan</Text>

                <FlatList data={filterChats} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />

            </View>

            <TouchableOpacity
                className="absolute bottom-36 right-10 bg-white w-12 h-12 rounded-full justify-center items-center shadow-black"
                style={{ elevation: 5 }}
                onPress={() => {
                    navigator.navigate("NewContactRegistrationScreen");
                }}
            >
                <MaterialIcons name="edit" size={22} color="gray" />

            </TouchableOpacity>

            <TouchableOpacity
                className="absolute bottom-16 right-8 bg-blue-500 w-16 h-16 rounded-full justify-center items-center shadow-blue-900"
                style={{ elevation: 5 }}
            >
                <Ionicons name="camera" size={24} color="white" />
            </TouchableOpacity>

            {isSidebarOpen &&
                <TouchableOpacity
                    className="absolute top-0 left-0 w-full h-full bg-black/50 z-20"
                    activeOpacity={1}
                    onPress={toggleSidebar}
                >

                    <View className={`absolute top-0 left-0 h-full bg-white shadow-xl`}
                        style={{ width: '75%' }}
                    >

                        <View className="p-4 pt-12 bg-blue-500">
                            <View className="flex-row justify-between items-start">
                                <View style={{ width: 70, height: 70 }} className="rounded-full bg-white border-2 border-white overflow-hidden items-center justify-center">
                                    {/* <Text className="text-4xl text-blue-500 text-center leading-none"></Text> */}
                                    <Image source={{ uri: `https://ui-avatars.com/api/?name=${getUserName.replace(" ", "+")}&background=random` }}
                                        className="rounded-full" style={{ width: 70, height: 70 }} />
                                </View>

                                <TouchableOpacity className="p-1 mt-3">
                                    <MaterialIcons name="light-mode" size={30} color="#fcd34d" />
                                </TouchableOpacity>
                            </View>

                            <Text className="text-white font-semibold text-lg mt-3">{getUserName}</Text>

                            <TouchableOpacity className="flex-row justify-between items-center">
                                <Text className="text-gray-200 text-sm">{getCountryCode} {getContactNo}</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="flex-1">

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100"
                                onPress={() => {
                                    navigator.navigate("ProfileScreen");
                                }}>
                                <Text className="text-2xl mr-4 text-gray-600">👤</Text>
                                <Text className="text-base text-gray-800">My Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
                                <Text className="text-2xl mr-4 text-gray-600">👥</Text>
                                <Text className="text-base text-gray-800">New Group</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
                                <Text className="text-2xl mr-4 text-gray-600">📞</Text>
                                <Text className="text-base text-gray-800">Contacts</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
                                <Text className="text-2xl mr-4 text-gray-600">📱</Text>
                                <Text className="text-base text-gray-800">Calls</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
                                <Text className="text-2xl mr-4 text-gray-600">🔖</Text>
                                <Text className="text-base text-gray-800">Saved Messages</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
                                <Text className="text-2xl mr-4 text-gray-600">⚙️</Text>
                                <Text className="text-base text-gray-800">Settings</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
                                <Text className="text-2xl mr-4 text-gray-600">➕</Text>
                                <Text className="text-base text-gray-800">Invite Friends</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
                                <Text className="text-2xl mr-4 text-gray-600">❓</Text>
                                <Text className="text-base text-gray-800">HeyMan Features</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>
                </TouchableOpacity>}
        </View>
    );
}