//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";
import {Auth} from "aws-amplify";


const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View className="h-56 w-56 bg-gray-200 rounded-full items-center justify-center" style={styles.avatar}>
                <Image style={styles.image} className="w-44 h-44 rounded-full" resizeMode={'cover'} source={{uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}} />
            </View>
                <Text className="text-xl font-semibold mt-4">Rokas Rudzianskas</Text>
            <View style={styles.buttonContainer}>
                <CustomButton text={'Sign out'} onPress={() => Auth.signOut()} type={'TERTIARY'} />
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.light.white,
        padding: 10,
    },
    avatar: {
        // backgroundColor: Colors.light.white,
        // width: 150,
        // height: 150,
        // borderRadius: 50,
        // padding: 10,
    },
   image: {
      // width: '100%',
      // flex: 1,
   },
    buttonContainer: {
        marginTop: 'auto',
        alignSelf: 'stretch',
        marginBottom: 10
    }
});
