// @ts-nocheck
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import {StatusBar} from "expo-status-bar";
import React from "react";

type ComponentProps = React.PropsWithChildren<{
  index: any;
  value: any;
}> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
  );
}

