import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Dimensions, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CountrySelect, { ICountry } from 'react-native-country-select';

type props = NativeStackNavigationProp<RootParamList, "NewContactRegistrationScreen">;

interface Contact {
    id: number;
    name: string;
    lastSeen: string;
    avatar: string;
    avatarColor: string;
}

interface Section {
    title: string;
    data: Contact[];
}

const contactSections: Section[] = [
    {
        title: 'Sorted by name',
        data: [
            { id: 1, name: 'Anjana Ralahami', lastSeen: 'last seen Oct 07 at 11:01 PM', avatar: 'AN', avatarColor: 'bg-green-500' },
            { id: 2, name: 'Deshika Sir (Exam Departm...', lastSeen: 'last seen Oct 02 at 6:28 PM', avatar: 'DE', avatarColor: 'bg-red-500' },
            { id: 3, name: 'Dilantha Sir1', lastSeen: 'last seen May 31 at 11:06 PM', avatar: 'DS', avatarColor: 'bg-purple-500' },
        ],
    },
    {
        title: 'K',
        data: [
            { id: 4, name: 'Keerthi malli', lastSeen: 'last seen 05.10.24 at 6:52 PM', avatar: 'K', avatarColor: 'bg-orange-500' },
            { id: 5, name: 'Kehan Aiya', lastSeen: 'last seen recently', avatar: 'KA', avatarColor: 'bg-green-600' },
            { id: 6, name: 'Krishan Aiya', lastSeen: 'last seen yesterday at 12:45 PM', avatar: 'KR', avatarColor: 'bg-blue-500' },
            { id: 7, name: 'Kuriya Service', lastSeen: 'last seen recently', avatar: 'KU', avatarColor: 'bg-teal-500' },
        ],
    },
    {
        title: 'L',
        data: [
            { id: 8, name: 'Lakshan', lastSeen: 'last seen recently', avatar: 'L', avatarColor: 'bg-pink-500' },
        ],
    },
];

const ContactListItem = ({ contact }: { contact: Contact }) => {

    const isImage = contact.avatar.length > 2;

    return (
        <TouchableOpacity className="flex-row items-center p-3 active:bg-gray-100">

            <View className={`w-12 h-12 ${contact.avatarColor} rounded-full justify-center items-center mr-3 overflow-hidden`}>
                {isImage ? (
                    <Text className="text-sm text-white">Image</Text>
                ) : (
                    <Text className="text-white text-lg font-semibold">{contact.avatar}</Text>
                )}
            </View>

            <View className="flex-1">
                <Text className="font-semibold text-lg text-gray-900">{contact.name}</Text>
                <Text className="text-gray-500 text-sm" numberOfLines={1}>
                    {contact.lastSeen}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const ActionButtons = ({ onNewContactPress }: { onNewContactPress: () => void }) => (
    <View className="mb-2 border-b border-gray-200">

        <TouchableOpacity className="flex-row items-center p-3 active:bg-gray-100">
            <View className="w-12 h-12 bg-blue-500/10 rounded-full justify-center items-center mr-3">
                <MaterialIcons name="group" size={24} color="gray" />
            </View>
            <Text className="text-lg text-gray-900">New Group</Text>
        </TouchableOpacity>

        <TouchableOpacity
            className="flex-row items-center p-3 active:bg-gray-100"
            onPress={onNewContactPress}
        >
            <View className="w-12 h-12 bg-blue-500/10 rounded-full justify-center items-center mr-3">
                <FontAwesome6 name="user-plus" size={18} color="gray" />
            </View>
            <Text className="text-lg text-gray-900">New Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-3 active:bg-gray-100">
            <View className="w-12 h-12 bg-blue-500/10 rounded-full justify-center items-center mr-3">
                <MaterialCommunityIcons name="bullhorn" size={24} color="gray" />
            </View>
            <Text className="text-lg text-gray-900">New Channel</Text>
        </TouchableOpacity>
    </View>
);

const NewContactModal = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [countryCode, setCountryCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const countryRef = useRef({});

    const handleCountrySelect = (country: ICountry) => {
        countryRef.current = country;
        setSelectedCountry(country);
        setCountryCode(country.idd.root);
        setShowPicker(false);
    };

    const handleCreateContact = () => {
        if (firstName && phoneNumber) {
            console.log("Creating new contact:", { firstName, lastName, phoneNumber });
            onClose();
        } else {
            console.log("First Name and Phone number are required.");
        }
    };

    const { height: screenHeight } = Dimensions.get('window');

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                className="flex-1 bg-black/50 justify-end"
                activeOpacity={1}
                onPress={onClose}
            >
                <View
                    className="bg-white rounded-t-xl p-6 shadow-2xl"
                    onTouchStart={(e) => e.stopPropagation()}
                    style={{ maxHeight: screenHeight * 0.7 }}
                >
                    <Text className="text-xl font-bold mb-4">New Contact</Text>

                    <TextInput
                        className="border-b border-blue-500 py-3 mb-4 text-lg"
                        placeholder="First name (required)"
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <TextInput
                        className="border-b border-gray-300 py-3 mb-4 text-lg"
                        placeholder="Last name (optional)"
                        value={lastName}
                        onChangeText={setLastName}
                    />

                    <View className="w-full relative mb-3 py-1 mt-6">
                        <View className={`border rounded-xl p-3 flex-row items-center border-gray-300`}>
                            <View className="flex-row items-center justify-between w-full px-10">
                                <Text className="text-lg text-slate-700">{selectedCountry?.flag || ""}  {selectedCountry?.name?.common || "Select country"}</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        setShowPicker(true);
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
                            <Text className={`text-lg text-gray-500`}>
                                Country
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center border-b border-gray-300 py-3 mb-8">
                        <View className="flex-row items-center pr-3 mr-3 border-r border-gray-300">
                            <Text className="text-lg font-medium ml-1">{countryCode}</Text>
                        </View>

                        <TextInput
                            className="flex-1 text-lg"
                            placeholder="00 000 0000"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>

                    <TouchableOpacity
                        className="bg-blue-500 rounded-lg py-3 items-center"
                        onPress={handleCreateContact}
                    >
                        <Text className="text-white text-lg font-semibold">Create Contact</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default function NewContactRegistrationScreen() {
    const navigator = useNavigation<props>();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openNewContactModal = () => setIsModalVisible(true);

    return (
        <View className="flex-1 bg-white">

            <View className="p-3 pt-12 bg-blue-500 flex-row items-center justify-between shadow-md">
                <View className="flex-row items-center">

                    <TouchableOpacity className="pl-1 pr-2 pb-1 -ml-1 mr-3">
                        <Feather name="arrow-left" size={22} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-semibold pb-1">New Message</Text>
                </View>


                <View className="flex-row items-center">
                    <TouchableOpacity className="pr-2 pb-1">
                        <Fontisto name="search" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="pr-2 pb-2 pl-4">
                        <Text className="text-white text-2xl">☰</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 mb-16">
                <ActionButtons onNewContactPress={openNewContactModal} />

                {contactSections.map((section, index) => (
                    <View key={index}>
                        <Text className="text-blue-500 text-sm font-semibold pt-3 px-3 pb-1">
                            {section.title}
                        </Text>
                        {section.data.map(contact => (
                            <ContactListItem key={contact.id} contact={contact} />
                        ))}
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                className="absolute bottom-24 right-6 bg-blue-500 w-16 h-16 rounded-full justify-center items-center shadow-lg shadow-blue-800"
                onPress={openNewContactModal}
            >
                <Feather name="user-plus" size={24} color="white" />
            </TouchableOpacity>

            <NewContactModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </View>
    );
}
