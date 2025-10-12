import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DataFormatter";

type props = NativeStackNavigationProp<RootParamList, "ContactSearchScreen">;

export default function ContactSearchScreen() {

    const navigator = useNavigation<props>();

    const chatList = useChatList();

    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(true);

    const filterChats = [...chatList].filter((chat) => {
        return (
            chat.friendName.toLowerCase().includes(searchText.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
        );
    }).sort(
        (a, b) =>
            new Date(b.lastTimeStamp).getTime() -
            new Date(a.lastTimeStamp).getTime()
    );

    const renderItem = ({ item }: { item: Chat }) => (
        <TouchableOpacity className="flex-row items-center p-3 active:bg-gray-100"
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
                <Text className="font-semibold text-lg text-gray-900">{item.friendName}</Text>
                <Text className="text-gray-500 text-sm" numberOfLines={1}>
                    {formatChatTime(item.lastTimeStamp)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const handleClearSearch = () => {
        setSearchText('');
    };


    return (
        <KeyboardAvoidingView
            behavior="padding"
            className="flex-1 bg-white"
        >
            <View className="pl-4 pt-8 bg-blue-500 flex-row items-center shadow-md">

                <TouchableOpacity onPress={() => {
                    navigator.goBack();
                }} className="pl-2 pr-2 -ml-1">
                    <Feather name="arrow-left" size={22} color="white" />
                </TouchableOpacity>

                <TextInput
                    className="flex-1 text-white text-lg font-regular ml-3 h-20"
                    placeholder="Search"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoFocus={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="white"
                    cursorColor="white"
                />

                {searchText.length > 0 && (
                    <TouchableOpacity onPress={handleClearSearch} className="pr-6 pl-4 pb-1 -mr-1">
                        <Text className="text-white text-xl">✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View className="flex-1">
                {filterChats.length > 0 ? (
                    <FlatList data={filterChats} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />
                ) : (
                    <View className="p-4 items-center mt-10">
                        <Text className="text-gray-500 text-base">No results found yet!</Text>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}