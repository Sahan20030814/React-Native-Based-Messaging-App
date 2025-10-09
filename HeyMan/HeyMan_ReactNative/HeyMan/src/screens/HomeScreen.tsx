import { Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

interface Chat {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    avatar: string;
    avatarColor: string;
    isGroup?: boolean;
    isCall?: boolean;
    isChannel?: boolean;
    pinned?: boolean;
    unread?: number;
}

interface SidebarItem {
    name: string;
    icon: string;
}

const chatList: Chat[] = [
    { id: 1, name: 'CALLISTO', lastMessage: 'CS(Cyber Security) GAD(...)', time: 'Tue', avatar: 'C', avatarColor: 'bg-red-600', isGroup: true, unread: 1 },
    { id: 2, name: 'Kehan Aiya', lastMessage: 'Outgoing Call', time: 'Mon', avatar: 'K', avatarColor: 'bg-purple-500', isCall: true },
    { id: 3, name: 'MAIN CHANNEL', lastMessage: 'pinned a mes...', time: 'Jun 29', avatar: 'M', avatarColor: 'bg-black', isChannel: true, pinned: true },
    { id: 4, name: 'Krishan Aiya', lastMessage: 'last seen at 12:45 PM', time: '', avatar: 'K', avatarColor: 'bg-green-500' },
    { id: 5, name: 'Pasindu Aiya', lastMessage: 'last seen at 12:38 AM', time: '', avatar: 'P', avatarColor: 'bg-blue-500' },
    { id: 6, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
    { id: 7, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
    { id: 8, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
    { id: 9, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
    { id: 10, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
    { id: 11, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
    { id: 12, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
    { id: 13, name: 'Anjana Ralahami', lastMessage: 'last seen yesterday at 11:01 PM', time: '', avatar: 'A', avatarColor: 'bg-green-600' },
];

const sidebarItems: SidebarItem[] = [
    { name: 'My Profile', icon: '👤' },
    { name: 'New Group', icon: '👥' },
    { name: 'Contacts', icon: '📞' },
    { name: 'Calls', icon: '📱' },
    { name: 'Saved Messages', icon: '🔖' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Invite Friends', icon: '➕' },
    { name: 'HeyMan Features', icon: '❓' },
];

const ChatListItem = ({ chat }: { chat: Chat }) => {
    return (
        <TouchableOpacity className="flex-row items-center p-3 border-b border-gray-100 active:bg-gray-50">

            <View className={`w-12 h-12 ${chat.avatarColor} rounded-full justify-center items-center mr-3`}>
                <Text className="text-white text-xl font-semibold">{chat.avatar}</Text>
            </View>

            <View className="flex-1">
                <View className="flex-row justify-between items-center">
                    <Text className="font-semibold text-lg text-gray-900">{chat.name}</Text>
                    <Text className="text-xs text-gray-500">{chat.time}</Text>
                </View>
                <View className="flex-row justify-between items-center mt-0.5">
                    <Text className={`text-gray-500 text-sm ${chat.isChannel ? 'font-bold text-gray-800' : ''}`} numberOfLines={1}>
                        {chat.isCall ? '📞 ' : ''}
                        {chat.lastMessage}
                        {chat.pinned && <Text className="text-sm font-bold text-blue-500"> 📌</Text>}
                    </Text>
                    {chat.unread && chat.unread > 0 && (
                        <View className="bg-green-500 rounded-full w-5 h-5 items-center justify-center">
                            <Text className="text-white text-xs">{chat.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const SidebarMenuItem = ({ item }: { item: SidebarItem }) => (
    <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-100">
        <Text className="text-2xl mr-4 text-gray-600">{item.icon}</Text>
        <Text className="text-base text-gray-800">{item.name}</Text>
    </TouchableOpacity>
);

const SidebarContent = ({ onClose }: { onClose: () => void }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        console.log(`Toggled theme to ${!isDarkMode ? 'Dark' : 'Light'}`);
    };

    return (
        <TouchableOpacity
            className="absolute top-0 left-0 w-full h-full bg-black/50 z-20"
            activeOpacity={1}
            onPress={onClose}
        >

            <View className={`absolute top-0 left-0 h-full bg-white shadow-xl`}
                style={{ width: '75%' }}
            >

                <View className="p-4 pt-12 bg-blue-500">
                    <View className="flex-row justify-between items-start">
                        <View style={{ width: 70, height: 70 }} className="rounded-full bg-white border-2 border-white overflow-hidden items-center justify-center">
                            <Text className="text-4xl text-blue-500 text-center leading-none">P</Text>
                        </View>

                        <TouchableOpacity onPress={toggleTheme} className="p-1 mt-3">
                            <MaterialIcons name="light-mode" size={30} color="#fcd34d" />
                        </TouchableOpacity>
                    </View>

                    <Text className="text-white font-semibold text-lg mt-3">Sahan Dilshan</Text>

                    <TouchableOpacity className="flex-row justify-between items-center">
                        <Text className="text-gray-200 text-sm">+94 (77) 523 8185</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1">
                    {sidebarItems.map((item, index) => (
                        <SidebarMenuItem key={index} item={item} />
                    ))}
                </ScrollView>
            </View>
        </TouchableOpacity>
    );
};

type props = NativeStackNavigationProp<RootParamList, "HomeScreen">;

export default function HomeScreen() {

    const navigator = useNavigation<props>();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNewMessage = () => {
        console.log("Starting a new message...");
    };

    // Note: Since we are not using React Navigation, the user's requested useLayoutEffect 
    // structure is commented out, as it is only relevant for native navigators. 
    // We handle the header content directly in the component.

    /*
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text className="text-white text-xl font-semibold">HeyMan</Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={toggleSidebar} className="p-2 ml-1">
                    <Text className="text-white text-2xl">☰</Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={handleSearch} className="p-2 mr-1">
                    <Text className="text-white text-xl">🔍</Text>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3b82f6', // blue-500
            },
        });
    }, [navigation, isSidebarOpen]); 
    */

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

            <ScrollView className="flex-1 mb-14">
                <Text className="text-blue-500 font-semibold p-4 pt-3 pb-2 text-sm">Your contacts on HeyMan</Text>
                {chatList.map(chat => (
                    <ChatListItem key={chat.id} chat={chat} />
                ))}
            </ScrollView>

            <TouchableOpacity
                onPress={handleNewMessage}
                className="absolute bottom-36 right-10 bg-white w-12 h-12 rounded-full justify-center items-center shadow-black"
                style={{ elevation: 5 }}
            >
                <MaterialIcons name="edit" size={22} color="gray" />

            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleNewMessage}
                className="absolute bottom-16 right-8 bg-blue-500 w-16 h-16 rounded-full justify-center items-center shadow-blue-900"
                style={{ elevation: 5 }}
            >
                <Ionicons name="camera" size={24} color="white" />
            </TouchableOpacity>

            {isSidebarOpen && <SidebarContent onClose={toggleSidebar} />}
        </View>
    );
}