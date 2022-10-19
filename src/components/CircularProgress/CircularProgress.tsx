//@ts-nocheck
import React from "react";
import { View } from "react-native";
import { Svg, Circle, Text as SVGText } from 'react-native-svg'
import Colors from "../../constants/Colors";

interface CircularProgressProps {
    size: number;
    strokeWidth: number;
    progress: number;
}


const CircularProgress = (props: CircularProgressProps) => {
    const { size, strokeWidth, progress } = props;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const svgProgress = (1 - props.progress) * 100;

    return (
        <View style={{position: 'absolute', top: 0}}>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    stroke={
                    // Colors.light.background
                        '#E0E0E0'
                }
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    {...{strokeWidth}}
                />

                {/* Progress Circle */}
                {progress > 0 && (
                    <Circle
                        stroke={Colors.light.secondary}
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
                )}

            </Svg>
        </View>
    )
}

export default CircularProgress;
