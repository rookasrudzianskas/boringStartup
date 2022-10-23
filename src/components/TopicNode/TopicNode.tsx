//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, useWindowDimensions} from 'react-native';
import Colors from "../../constants/Colors";
import {Topic, TopicWithResult} from "../../types/models";
import Svg, { Circle, Rect } from 'react-native-svg';
import CircularProgress from "../CircularProgress";
import {useNavigation} from "@react-navigation/native";
import { S3Image } from 'aws-amplify-react-native';
import {AntDesign} from "@expo/vector-icons";
import {Auth, DataStore} from "aws-amplify";
import {UserTopicProgress} from "../../models";

interface TopicNodeProps {
    topic: TopicWithResult;
    isDisabled?: boolean;
}

const TopicNode = ({topic, isDisabled = false}: TopicNodeProps) => {
    const {width} = useWindowDimensions();
    const [progress, setProgress] = useState(0);
    const navigation = useNavigation();
    const  itemsWidth = width / 3 - 30;

    // console.log('TopicNode', topic.isQuizPassed);

    useEffect(() => {
        // if(!topic) return;
        // @TODO subscribe on the user progress changes -- IMPROVEMENT
        (async () => {
            const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const userTopicProgresses = await DataStore.query(UserTopicProgress);
            const userProgress = userTopicProgresses.find((tp) => tp.topicID === topic?.id && tp.sub === userData?.attributes.sub);
            setProgress(userProgress?.progress || 0);
        })();
    }, [topic]);

    const onPress = () => {
        navigation.navigate('Topic', { id: topic.id });
    }

    return (
        <TouchableOpacity disabled={isDisabled} onPress={onPress} activeOpacity={isDisabled ? 1 : 0.7} style={[styles.container, {width: itemsWidth}]}>
            <View style={[styles.progress]}>
                <CircularProgress size={itemsWidth} strokeWidth={8} progress={progress} />
                    <View style={[styles.circle, {width: itemsWidth - 20, backgroundColor: isDisabled ? Colors.light.tabIconDefault : Colors.light.primary}]}>
                        {topic.icon ? (
                            <S3Image imgKey={topic.icon} source={{uri: topic?.icon}} style={styles.image} />
                        ) : (
                            <AntDesign name="questioncircleo" size={35} color="black" />
                        )}
                        {/* needs to be fixed @TODO*/}
                        <View className={`absolute -bottom-3 -right-2 ${topic?.isQuizPassed ? 'bg-blue-500/70' : 'bg-gray-400/70'} rounded-full w-7 h-7 items-center justify-center border border-white border-[2px]`}>
                            <AntDesign name="Trophy" size={14} color="white" />
                        </View>
                    </View>
            </View>
                <Text style={styles.title}>{topic?.title || 'Loading...'}</Text>
        </TouchableOpacity>
    );
};


export default TopicNode;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10, // Find the right one @TODO
        maxWidth: 150,
    },
    progress: {
        width: "100%",
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        alignSelf: 'center',
        aspectRatio: 1,
        borderRadius: 999,
        backgroundColor: Colors.light.tertiary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "50%",
        aspectRatio: 1,
    },
    title: {
        marginVertical: 5,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    }
});
