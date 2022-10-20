/**
 * React Native Screens and Reanimated Layout Effects combined result in an issue where the content falls below the native header.
 * To make things worse this issue seems to "fix" itself on Android 10 when the keyboard is opened.
 * This makes it difficult to work around the issue because it's not consistent.
 *
 * As a workaround we force the header to render transparent (position absolute above the content)
 * and add the correct insets as padding. At least this way it works consistently.
 *
 * The issue is tracked here: https://github.com/software-mansion/react-native-reanimated/issues/2906
 */
// @ts-nocheck
import {useHeaderHeight} from "@react-navigation/elements";
import React, {useMemo} from "react";
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

export default function useApplyHeaderWorkaround(setOptions: (options: NativeStackNavigationOptions) => void) {
    const headerHeight = useHeaderHeight();

    const androidHeaderFix = useMemo(
        () => ({
            headerTransparent: true,
            headerStyle: {backgroundColor: 'white'},
            contentStyle: {paddingTop: headerHeight},
        }),
        [headerHeight],
    );

    React.useLayoutEffect(() => {
        IS_ANDROID && setOptions(androidHeaderFix);
    }, [setOptions, androidHeaderFix]);
}
