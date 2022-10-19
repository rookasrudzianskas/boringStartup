//@ts-nocheck
import React from "react";
import { View } from "react-native";
import { Svg, Circle, Text as SVGText } from 'react-native-svg'

interface CircularProgressProps {
    size: number;
    strokeWidth: number;
    progress: number;
    children?: React.ReactNode;
}


const CircularProgress = (props: CircularProgressProps) => {
    const { size, strokeWidth, text, progress, children } = props;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const svgProgress = (1 - props.progress) * 100;

    return (
        <View style={{margin: 10}}>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    stroke={props.bgColor ? props.bgColor : "#f2f2f2"}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    {...{strokeWidth}}
                />

                {/* Progress Circle */}
                <Circle
                    stroke={props.pgColor ? props.pgColor : "#3b5998"}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={`${circum} ${circum}`}
                    strokeDashoffset={radius * Math.PI * 2 * (svgProgress/100)}
                    strokeLinecap="round"
                    transform={`rotate(-90, ${size/2}, ${size/2})`}
                    {...{strokeWidth}}
                />

                {children}
            </Svg>
        </View>
    )
}

export default CircularProgress;
