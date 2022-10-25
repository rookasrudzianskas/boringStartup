//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import {adapty, AdaptyError, AdaptyPaywall, AdaptyProduct} from "react-native-adapty";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const Paywall = () => {
    const navigation = useNavigation();
    const [paywall, setPaywall] = useState<AdaptyPaywall | null>({
        products: [
            {
                localizedTitle: 'Pro Yearly',
                localizedSubscriptionPeriod: 'Year',
                localizedPrice: 24.99,
                variationId: 'pro_yearly',
            },
            {
                localizedTitle: 'Pro Monthly',
                localizedSubscriptionPeriod: 'Month',
                localizedPrice: 4.99,
                variationId: 'pro_monthly',
            }
        ]
    });

    const purchaseProduct = (buyProduct: AdaptyProduct) => {
        try {
            const {receipt, purchaserInfo, product} = adapty.purchases.makePurchase(buyProduct);
            navigation.navigate('Home');
        } catch (e) {
            Alert.alert('Error', 'Whoops whoops! Could not purchase product');
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        const fetchPaywall = async () => {
            try {
                const {paywalls, products} = await adapty.paywalls.getPaywalls({ forceUpdate: true });
                // if(paywall.length > 0) {
                //     setPaywall(paywalls[0]);
                //     adapty.paywalls.logShow(paywalls[0].variationId);
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
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="absolute top-10 left-4">
                    <AntDesign name="closecircle" size={24} color="white" />
                </TouchableOpacity>
                <View className="space-y-2">
                    <View>
                        <Text className="text-4xl text-purple-300 font-bold mb-2">Become a Pro</Text>
                        <Text className="text-3xl text-white font-bold">Unlock premium features</Text>
                    </View>
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
                        <TouchableOpacity onPress={() => purchaseProduct(product)} key={index} activeOpacity={0.7} className="bg-black/40 py-4 rounded-xl border justify-center border-[2px] border-gray-300">
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
