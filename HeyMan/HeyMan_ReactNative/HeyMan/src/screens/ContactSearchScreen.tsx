import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

type props = NativeStackNavigationProp<RootParamList, "ContactSearchScreen">;

interface Contact {
    id: number;
    name: string;
    status: string;
    avatar: string;
    avatarColor: string;
}

const contactList: Contact[] = [
    { id: 1, name: 'Kehan Aiya', status: 'last seen recently', avatar: 'K', avatarColor: 'bg-red-500' },
    { id: 2, name: 'Krishan Aiya', status: 'last seen at 12:45 PM', avatar: 'K', avatarColor: 'bg-green-500' },
    { id: 3, name: 'Tharu akka', status: 'last seen recently', avatar: 'T', avatarColor: 'bg-blue-500' },
    { id: 4, name: 'Thushara aiya', status: 'last seen recently', avatar: 'T', avatarColor: 'bg-pink-500' },
    { id: 5, name: 'Pasindu Aiya', status: 'last seen at 12:38 AM', avatar: 'P', avatarColor: 'bg-indigo-500' },
    { id: 6, name: 'Anjana Ralahami', status: 'last seen yesterday at 11:01 PM', avatar: 'A', avatarColor: 'bg-teal-500' },
    { id: 7, name: 'Aishwarya', status: 'last seen a long time ago', avatar: 'A', avatarColor: 'bg-purple-500' },
    { id: 8, name: 'Vishwa Sir', status: 'last seen Oct 05 at 9:15 AM', avatar: 'V', avatarColor: 'bg-orange-500' },
    { id: 9, name: 'Deshika Sir (Exam Department)', status: 'last seen Oct 02 at 6:28 PM', avatar: 'D', avatarColor: 'bg-red-600' },
    { id: 10, name: 'Deshika Sir (Exam Department)', status: 'last seen Oct 02 at 6:28 PM', avatar: 'D', avatarColor: 'bg-red-600' },
    { id: 11, name: 'Deshika Sir (Exam Department)', status: 'last seen Oct 02 at 6:28 PM', avatar: 'D', avatarColor: 'bg-red-600' },
    { id: 12, name: 'Deshika Sir (Exam Department)', status: 'last seen Oct 02 at 6:28 PM', avatar: 'D', avatarColor: 'bg-red-600' },
];

const ContactListItem = ({ contact }: { contact: Contact }) => {
    return (
        <TouchableOpacity className="flex-row items-center p-3 active:bg-gray-100">
            <View className={`w-12 h-12 ${contact.avatarColor} rounded-full justify-center items-center mr-3`}>
                <Text className="text-white text-xl font-semibold">{contact.avatar}</Text>
            </View>

            <View className="flex-1">
                <Text className="font-semibold text-lg text-gray-900">{contact.name}</Text>
                <Text className="text-gray-500 text-sm" numberOfLines={1}>
                    {contact.status}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function ContactSearchScreen() {

    const navigator = useNavigation<props>();

    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(true);

    const filteredContacts = contactList.filter(contact =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleClearSearch = () => {
        setSearchText('');
    };

    const handleBack = () => {
        console.log("Navigating back...");
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

            <ScrollView className="flex-1">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                        <ContactListItem key={contact.id} contact={contact} />
                    ))
                ) : (
                    <View className="p-4 items-center mt-10">
                        <Text className="text-gray-500 text-base">No results found for "{searchText}"</Text>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}