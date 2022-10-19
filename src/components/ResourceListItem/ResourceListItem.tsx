//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import resource from '../../../assets/data/topics';

interface ResourceListItemProps {
    resource: ResourceItem;
}

const ResourceListItem = ({ resource }: ResourceListItemProps) => {
    return (
        <View>
            <View>
                <Text>{resource?.title}</Text>
            </View>
            <Text>
                byrookas 🚀
            </Text>
        </View>
    );
};

export default ResourceListItem;
