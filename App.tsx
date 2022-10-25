import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator} from "aws-amplify-react-native/src/Auth";
import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme';
import Colors from './src/constants/Colors';
import ModuleContextProvider from "./src/contexts/ModuleContext";
import {useEffect} from "react";
import {registerForPushNotificationsAsync} from "./src/utils/pushNotifications";
import UserContextProvider from "./src/contexts/userContext";
import { connectToDevTools } from "react-devtools-core";

Amplify.configure({...awsconfig });


if (__DEV__) {
    connectToDevTools({ host: "localhost", port: 8097, });
}


const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <UserContextProvider>
                    <ModuleContextProvider>
                        <Navigation colorScheme={colorScheme} />
                    </ModuleContextProvider>
                </UserContextProvider>
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}

const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Email',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string',
            placeholder: 'Email',
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password',
            placeholder: 'Password',
        }
    ]
}

const customTheme = {
    ...AmplifyTheme,
    button: {
        ...AmplifyTheme.button,
        backgroundColor: Colors.light.primary,
        borderRadius: 5,
    },
    buttonDisabled: {
        ...AmplifyTheme.buttonDisabled,
        backgroundColor: Colors.light.tabIconDefault,
        borderRadius: 5,
    },
    sectionFooterLink: {
        ...AmplifyTheme.sectionFooterLink,
        color: Colors.light.primary,
    },
}

export default withAuthenticator(App, {
    signUpConfig, theme: customTheme
});
