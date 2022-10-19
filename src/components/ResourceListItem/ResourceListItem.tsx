//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ResourceItem} from "../../types/models";

interface ResourceListItemProps {
    resource: ResourceItem;
}

const ResourceListItem = ({ resource }: ResourceListItemProps) => {
    return (
        <View>
            <View>
                <Text></Text>
            </View>
            <Text>{resource?.title}</Text>
        </View>
    );
};

export default ResourceListItem;
