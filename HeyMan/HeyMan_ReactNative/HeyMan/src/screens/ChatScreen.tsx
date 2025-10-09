import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RootParamList } from "../../App";

type props = NativeStackNavigationProp<RootParamList, "ChatScreen">;

interface Message {
    id: number;
    text: string;
    sender: 'self' | 'other';
    time: string;
    read?: boolean;
    reactions?: string; // Mock for reactions like '❤️'
}

const mockMessages: Message[] = [
    { id: 1, text: 'unmggggya', sender: 'other', time: '9:51 PM' },
    { id: 2, text: 'FJhvhhb', sender: 'self', time: '9:51 PM', read: true },
    { id: 3, text: 'jdfjdjjkjlkas', sender: 'other', time: '9:51 PM' },
    { id: 4, text: 'Vbbbnb', sender: 'self', time: '9:51 PM', read: true },
    { id: 5, text: 'gfgfgs', sender: 'other', time: '9:51 PM' },
    { id: 6, text: 'Vbbkkcc', sender: 'self', time: '9:51 PM', read: true },
    { id: 7, text: 'sddssdsd', sender: 'other', time: '9:51 PM' },
    { id: 8, text: 'Fhjjcjb', sender: 'self', time: '9:51 PM', read: true },
    { id: 9, text: 'fdfdfdf', sender: 'other', time: '9:51 PM', reactions: '❤️' },
    { id: 10, text: 'Vb vb', sender: 'self', time: '9:51 PM', read: true },
    { id: 11, text: 'ffsfsf', sender: 'other', time: '9:51 PM' },
    { id: 12, text: 'Ccghj', sender: 'self', time: '9:51 PM', read: true },
    { id: 13, text: 'dffgfs', sender: 'other', time: '9:51 PM' },
    { id: 14, text: 'Vhcv', sender: 'self', time: '9:51 PM', read: true },
    { id: 15, text: '5647s897ss', sender: 'other', time: '9:51 PM' },
    { id: 16, text: 'Vbb', sender: 'self', time: '9:51 PM', read: true },
    { id: 17, text: 'Vvcxxxmdj', sender: 'self', time: '9:51 PM', read: true },
];

interface MessageBubbleProps {
    message: Message;
    isSelected: boolean;
    onLongPress: (messageId: number) => void;
    onSelectToggle: (messageId: number) => void;
    isSelectionMode: boolean;
}

const MessageBubble = ({ message, isSelected, onLongPress, onSelectToggle, isSelectionMode }: MessageBubbleProps) => {
    const isSelf = message.sender === 'self';
    const bubbleClass = isSelf
        ? 'bg-green-100 self-end rounded-tl-xl rounded-bl-xl rounded-br-lg'
        : 'bg-white self-start rounded-tr-xl rounded-br-xl rounded-bl-lg';

    const selectionStyle = isSelected ? 'bg-blue-300/30' : '';

    const handlePress = () => {
        if (isSelectionMode) {
            onSelectToggle(message.id);
        }
    };

    return (
        <View className={`flex-row items-end my-1 px-3 ${isSelf ? 'justify-end' : 'justify-start'}`}>

            {isSelectionMode && (
                <TouchableOpacity
                    onPress={() => onSelectToggle(message.id)}
                    className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-400'} items-center justify-center mr-2 mb-2`}
                >
                    {isSelected && <Text className="text-white text-xs">✓</Text>}
                </TouchableOpacity>
            )}

            <TouchableOpacity
                onLongPress={() => onLongPress(message.id)}
                onPress={handlePress}
                className={`max-w-[75%] px-3 py-2 shadow-sm ${bubbleClass} ${selectionStyle}`}
                activeOpacity={isSelectionMode ? 1.0 : 0.7}
            >
                <View>
                    <Text className="text-gray-800 text-base">{message.text}</Text>

                    {message.reactions && (
                        <View className="absolute -bottom-3 -right-3 bg-white p-[2px] rounded-full shadow-md">
                            <Text className="text-sm">{message.reactions}</Text>
                        </View>
                    )}

                    <View className="flex-row justify-end items-center mt-1">
                        <Text className="text-xs text-gray-500 ml-2">{message.time}</Text>
                        {isSelf && (
                            <Text className="text-xs text-blue-500 ml-1">
                                {message.read ? '✓✓' : '✓'}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default function ChatScreen() {

    const navigator = useNavigation<props>();

    const [text, setText] = useState('');
    const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);

    const isSelectionMode = selectedMessageIds.length > 0;
    const selectionCount = selectedMessageIds.length;

    const toggleMessageSelection = (messageId: number) => {
        if (!isSelectionMode) {
            setSelectedMessageIds([messageId]);
        } else if (selectedMessageIds.includes(messageId)) {
            const newSelection = selectedMessageIds.filter(id => id !== messageId);
            setSelectedMessageIds(newSelection);
            if (newSelection.length === 0) {
                setSelectedMessageIds([]);
            }
        } else {
            setSelectedMessageIds([...selectedMessageIds, messageId]);
        }
    };

    const exitSelectionMode = () => {
        setSelectedMessageIds([]);
    };

    const renderHeader = () => {
        if (isSelectionMode) {
            return (
                <View className="flex-row items-center justify-between p-3 pt-12 bg-white">
                    <TouchableOpacity onPress={exitSelectionMode} className="pl-2 pb-1">
                        <Text className="text-2xl" style={{ color: "#64748b" }}>✕</Text>
                    </TouchableOpacity>
                    <Text className="text-xl font-bold pr-14" style={{ color: "#64748b" }}>{selectionCount}</Text>
                    <View className="flex-row">

                        <TouchableOpacity className="pr-7 py-2">
                            <MaterialIcons name="edit" size={24} color="#64748b" />
                        </TouchableOpacity>

                        <TouchableOpacity className="pr-7 py-2">
                            <MaterialIcons name="content-copy" size={24} color="#64748b" />
                        </TouchableOpacity>

                        <TouchableOpacity className="pr-7 py-2">
                            <FontAwesome name="mail-forward" size={24} color="#64748b" />
                        </TouchableOpacity>

                        <TouchableOpacity className="pr-2 pt-1">
                            <MaterialIcons name="delete-outline" size={26} color="#64748b" />
                        </TouchableOpacity>

                    </View>
                </View>
            );
        }

        return (
            <View className="flex-row items-center justify-between p-3 pt-12 bg-blue-500 shadow-md">
                <View className="flex-row items-center">

                    <TouchableOpacity className="pl-2 pr-3 -ml-1">
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>

                    <View className="w-14 h-14 bg-pink-500 rounded-full justify-center items-center ml-2">
                        <Text className="text-white text-lg font-semibold">L</Text>
                    </View>

                    <View className="ml-3 mb-2">
                        <Text className="text-white text-lg font-semibold">Lakshan</Text>
                        <Text className="text-white/70 text-xs">last seen recently</Text>
                    </View>
                </View>

                <View className="flex-row space-x-4">
                    <TouchableOpacity className="p-2">
                        <MaterialIcons name="call" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="py-2 pr-1 pl-3">
                        <Ionicons name="ellipsis-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderInputBar = () => {
        if (isSelectionMode) {
            return (
                <View className="flex-row justify-around py-3 border-t border-gray-200 bg-white">
                    <TouchableOpacity className="flex-row items-center">
                        <Entypo name="reply" size={24} color="#0ea5e9" />
                        <Text className="text-base font-semibold pl-1" style={{ color: "#0ea5e9" }}>Reply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center">
                        <Entypo name="forward" size={24} color="#0ea5e9" />
                        <Text className="text-base font-semibold pl-1" style={{ color: "#0ea5e9" }}>Forward</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View className="flex-row items-center p-2 bg-white border-t border-gray-200">
                <TouchableOpacity className="pl-2 pr-1">
                    <Entypo name="attachment" size={24} color="#94a3b8" />
                </TouchableOpacity>

                <TextInput
                    className="flex-1 px-4 py-3 mx-2 bg-gray-100 rounded-full text-base"
                    placeholder="Message"
                    placeholderTextColor="#9ca3af"
                    value={text}
                    onChangeText={setText}
                />

                <TouchableOpacity className="pl-1 pr-2">
                    {text.trim().length > 0 ? (
                        <AntDesign name="send" size={26} color="#0ea5e9" />
                    ) : (
                        <Feather name="mic" size={24} color="#94a3b8" />
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-gray-200 mb-16">
            {renderHeader()}

            <KeyboardAvoidingView className="" style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView
                    className="flex-1 p-2"
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {mockMessages.map(message => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            isSelected={selectedMessageIds.includes(message.id)}
                            onLongPress={toggleMessageSelection}
                            onSelectToggle={toggleMessageSelection}
                            isSelectionMode={isSelectionMode}
                        />
                    ))}
                </ScrollView>

                {renderInputBar()}
            </KeyboardAvoidingView>
        </View>
    );
}