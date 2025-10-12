import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native';
import { RootParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const data = [
    { id: '1', imageUrl: require('../../assets/messaging_start_image_1.png'), title: 'HeyMan', text1: "The world's fastest messaging app.", text2: "It is free and secure." },
    { id: '2', imageUrl: require('../../assets/messaging_start_image_2.png'), title: 'Fast', hightlight: "HeyMan", text1: " delivers messages fasters than any other application.", text2: "" },
    { id: '3', imageUrl: require('../../assets/messaging_start_image_3.png'), title: 'Free', hightlight: "HeyMan", text1: " provides free unlimited cloud storage for chats and media.", text2: "" },
    { id: '4', imageUrl: require('../../assets/messaging_start_image_4.png'), title: 'Powerful', hightlight: "HeyMan", text1: " has no limits on the size of your media and chats.", text2: "" },
    { id: '5', imageUrl: require('../../assets/messaging_start_image_5.png'), title: 'Secure', hightlight: "HeyMan", text1: " keeps your messages safe from hacker attacks.", text2: "" },
    { id: '6', imageUrl: require('../../assets/messaging_start_image_6.png'), title: 'Cloud-Based', hightlight: "HeyMan", text1: " lets you access your messages from multiple devices.", text2: "" },
];

const { width } = Dimensions.get("window");

type props = NativeStackNavigationProp<RootParamList, "StartMessagingScreen">;

export default function StartMessagingScreen() {

    const navigator = useNavigation<props>();

    let [index, setIndex] = useState<number>(0);

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        setIndex(Math.round(offsetX / width));
    };

    return (
        <View className='flex-1 bg-white'>
            <TouchableOpacity
                className="absolute top-10 right-6 z-10 p-2 rounded-full" // Use absolute positioning
                activeOpacity={0.7}
            >
                <MaterialIcons name="light-mode" size={30} color="#3b82f6" />
            </TouchableOpacity>

            <View className="flex-1 items-center justify-between pt-20 pb-10">

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (

                        <View className="justify-center items-center px-10 mt-48" style={{ width: width }}>

                            <View className="mb-5">
                                <View className="w-40 h-40 bg-white justify-center items-center">
                                    <Image
                                        source={item.imageUrl}
                                        className="w-full h-full shadow-2xl shadow-blue-100/50"
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                            <Text className="text-3xl font-bold text-gray-800 mb-2">
                                {item.title}
                            </Text>

                            <Text className="text-center text-base text-gray-400 leading-relaxed max-w-xs">
                                {item.hightlight ? (
                                    <Text className='font-bold'>{item.hightlight}</Text>
                                ) : (
                                    <Text></Text>
                                )}
                                {item.text1}
                            </Text>

                            <Text className="text-center text-base text-gray-400 leading-relaxed max-w-xs">
                                {item.text2}
                            </Text>

                        </View>

                    )}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    snapToAlignment="center"
                    onMomentumScrollEnd={handleScrollEnd}
                />

                <View className="flex-row justify-center mb-40">

                    {data.map((_, currentIndex) => (
                        <View
                            key={currentIndex}
                            className={`mx-1 rounded-full ${currentIndex === index ? "w-4 h-2 bg-blue-500" : "w-2 h-2 bg-gray-300"
                                }`}
                        />
                    ))}

                </View>

                <View className="w-full items-center mb-20">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-blue-500 py-4 w-11/12 rounded-xl shadow-lg shadow-blue-500/50"
                        onPress={() => {
                            navigator.replace("SignupNameScreen");
                        }}
                    >
                        <Text className="text-white text-center text-lg font-semibold">
                            Start Messaging
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}