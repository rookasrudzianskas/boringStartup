"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
var CustomButton_1 = require("../../components/CustomButton");
var aws_amplify_1 = require("aws-amplify");
var ProfileScreen = function () {
    return (<react_native_1.View style={styles.container}>
            <react_native_1.View className="h-56 w-56 bg-gray-200 rounded-full items-center justify-center" style={styles.avatar}>
                <react_native_1.Image style={styles.image} className="w-44 h-44 rounded-full" resizeMode={'cover'} source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}/>
            </react_native_1.View>
                <react_native_1.Text className="text-xl font-semibold mt-4">Rokas Rudzianskas</react_native_1.Text>
            <react_native_1.View style={styles.buttonContainer}>
                <CustomButton_1["default"] text={'Sign out'} onPress={function () { return aws_amplify_1.Auth.signOut(); }} type={'TERTIARY'}/>
            </react_native_1.View>
        </react_native_1.View>);
};
exports["default"] = ProfileScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors_1["default"].light.white,
        padding: 10
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
