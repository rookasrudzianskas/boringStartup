//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {adapty, AdaptyError, AdaptyPaywall} from "react-native-adapty";

const Paywall = () => {
    const [paywall, setPaywall] = useState<AdaptyPaywall | null>([]);
    useEffect(() => {
        const fetchPaywall = async () => {
            try {
                const {paywalls, products} = await adapty.paywalls.getPaywalls({ forceUpdate: true });
                if(paywall.length > 0) {
                    setPaywall(paywalls[0]);
                }
            } catch (error: AdaptyError) {
                // console.log("Error", error);
            }
        }

        fetchPaywall();
    }, []);

    return (
        <View>
            <Text>
                byrookas 🚀
            </Text>
        </View>
    );
};

export default Paywall;
