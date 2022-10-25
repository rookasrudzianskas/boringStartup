//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {adapty, AdaptyError, AdaptyPaywall} from "react-native-adapty";

const Paywall = () => {
    const [paywall, setPaywall] = useState<AdaptyPaywall | null>({
        products: [
            {
                localizedTitle: 'Pro Yearly'
            },
            {
                localizedTitle: 'Pro Monthly'
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
        <View>
            {paywall?.products.map((product, index) => (
                <Text key={index}>{product.localizedTitle}</Text>
            ))}
        </View>
    );
};

export default Paywall;
