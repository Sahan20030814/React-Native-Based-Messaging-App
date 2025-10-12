import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CountrySelect, { ICountry } from 'react-native-country-select';
import { useChatList } from '../socket/UseChatList';
import { Chat } from '../socket/chat';
import { formatChatTime } from '../util/DataFormatter';
import { useSendNewContact } from '../socket/UseSendNewContact';
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNo } from '../util/Validation';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

type props = NativeStackNavigationProp<RootParamList, "NewContactRegistrationScreen">;

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

export default function NewContactRegistrationScreen() {
    const navigator = useNavigation<props>();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openNewContactModal = () => setIsModalVisible(true);

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

    const newContact = useSendNewContact();
    const sendNewContact = newContact.sendNewContact;
    const responseStatus = newContact.responseStatus;

    const sendData = () => {
        sendNewContact({
            id: 0,
            first_name: firstName,
            last_name: lastName,
            country_code: countryCode,
            contact_no: phoneNumber,
            email: "",
            createdAt: "",
            updatedAt: "",
            status: ""
        });

        if (responseStatus) {
            setFirstName("");
            setLastName("");
            setCountryCode("");
            setPhoneNumber("");

            setTimeout(() => {
                setIsModalVisible(false);
            }, 2000);
        }
    };

    const { height: screenHeight } = Dimensions.get('window');

    const chatList = useChatList();

    const filterChats = [...chatList].sort(
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

            <View className={`w-12 h-12 rounded-full justify-center items-center mr-3 overflow-hidden`}>
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

    return (
        <View className="flex-1 bg-white">

            <View className="p-3 pt-12 bg-blue-500 flex-row items-center justify-between shadow-md">
                <View className="flex-row items-center">

                    <TouchableOpacity className="pl-1 pr-2 pb-1 -ml-1 mr-3"
                        onPress={() => {
                            navigator.goBack();
                        }}>
                        <Feather name="arrow-left" size={22} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-semibold pb-1">New Message</Text>
                </View>


                <View className="flex-row items-center">
                    <TouchableOpacity className="pr-2 pb-1"
                        onPress={() => {
                            navigator.navigate("ContactSearchScreen");
                        }}>
                        <Fontisto name="search" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="pr-2 pb-2 pl-4">
                        <Text className="text-white text-2xl">☰</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-1 mb-16">
                <ActionButtons onNewContactPress={openNewContactModal} />

                <FlatList data={filterChats} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />

            </View>

            <TouchableOpacity
                className="absolute bottom-24 right-6 bg-blue-500 w-16 h-16 rounded-full justify-center items-center shadow-lg shadow-blue-800"
                onPress={openNewContactModal}
            >
                <Feather name="user-plus" size={24} color="white" />
            </TouchableOpacity>

            {/* modal */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >

                <AlertNotificationRoot>

                    <TouchableOpacity
                        className="flex-1 bg-black/50 justify-end"
                        activeOpacity={1}
                        onPress={() => setIsModalVisible(false)}
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
                                placeholder="Last name (required)"
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
                                    placeholder="## ### ####"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>

                            <TouchableOpacity
                                className="bg-blue-500 rounded-lg py-3 items-center"
                                onPress={() => {

                                    let validFirstName = validateFirstName(firstName);
                                    let validLastName = validateLastName(lastName);
                                    let validCountryCode = validateCountryCode(countryCode);
                                    let validPhoneNo = validatePhoneNo(phoneNumber);

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
                                    } else if (validCountryCode) {
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
                                        sendData();
                                    }

                                }}
                            >
                                <Text className="text-white text-lg font-semibold">Create Contact</Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>

                </AlertNotificationRoot>

            </Modal>

        </View>
    );
}
