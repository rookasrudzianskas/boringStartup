//@ts-nocheck
import React, {PropsWithChildren} from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface TopicSectionProps extends React.FC {
    title: string;
    display?: boolean;
}

const TopicSection = ({title, children, display = false}: PropsWithChildren<TopicSectionProps>) => {
    if(!display) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title || "Loading..."}</Text>
            <>
                {children}
            </>
        </View>
    );
};

export default TopicSection;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1,
        marginBottom: 20,
    }
});
