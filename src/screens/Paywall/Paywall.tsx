//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import {adapty, AdaptyError, AdaptyPaywall} from "react-native-adapty";
import {AntDesign} from "@expo/vector-icons";

const Paywall = () => {
    const [paywall, setPaywall] = useState<AdaptyPaywall | null>({
        products: [
            {
                localizedTitle: 'Pro Yearly',
                localizedSubscriptionPeriod: 'Year',
                localizedPrice: 24.99
            },
            {
                localizedTitle: 'Pro Monthly',
                localizedSubscriptionPeriod: 'Month',
                localizedPrice: 4.99
            }
        ]
    });
    useEffect(() => {
        const fetchPaywall = async () => {
            try {
                const {paywalls, products} = await adapty.paywalls.getPaywalls({ forceUpdate: true });
                // if(paywall.length > 0) {
                //     setPaywall(paywalls[0]);
                // }
            } catch (error: AdaptyError) {
                // console.log("Error", error);
            }
        }

        fetchPaywall();
    }, []);

    if(!paywall) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <ImageBackground blurRadius={25} source={{uri: 'https://images.unsplash.com/photo-1627645835237-0743e52b991f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'}} className="flex-1 bg-black">
            <View className="px-7 justify-center h-screen ">
                <View className="space-y-2">
                    <Text className="text-3xl text-white font-bold">Unlock premium features</Text>
                    <View>
                        <ScrollView className="space-x-3" horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity activeOpacity={0.7} className="border border-gray-400/40 bg-black/60 h-24 w-36 justify-center space-y-2 px-2 rounded-md">
                                <AntDesign name="codesquareo" size={24} color="white" />
                                <Text className="text-white text-[15px] font-semibold">Premium resources</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} className="border border-gray-400/40 bg-black/60 h-24 w-36 justify-center space-y-2 px-2 rounded-md">
                                <AntDesign name="codesquareo" size={24} color="white" />
                                <Text className="text-white text-[15px] font-semibold">Premium exercises</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} className="border border-gray-400/40 bg-black/60 h-24 w-36 justify-center space-y-2 px-2 rounded-md">
                                <AntDesign name="codesquareo" size={24} color="white" />
                                <Text className="text-white text-[15px] font-semibold">Premium quizes</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>

                <View className="absolute bottom-1 right-0 left-0 mt-5 space-y-3 px-4">
                    {paywall?.products.map((product, index) => (
                        <TouchableOpacity  key={index} activeOpacity={0.7} className="bg-black/40 py-4 rounded-xl border justify-center border-[2px] border-gray-300">
                            <>
                                <Text className="uppercase text-white ml-6 font-bold text-[13px] tracking-wider ">{product.localizedTitle}</Text>
                                <Text className="uppercase text-purple-400 ml-6 font-bold text-[13px] tracking-wider ">${product.localizedPrice}/{product.localizedSubscriptionPeriod}</Text>
                            </>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
};

export default Paywall;
