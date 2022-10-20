import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator} from "aws-amplify-react-native/src/Auth";
import {Colors} from "react-native/Libraries/NewAppScreen";
import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme';

Amplify.configure({
    ...awsconfig, Analytics: { disabled: true } });


const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}

const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Full name',
            key: 'name',
            displayOrder: 1,
            type: 'string',
            placeholder: 'Full name',
        },
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 2,
            type: 'string',
            placeholder: 'Email',
        },
        {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 3,
            type: 'string',
            placeholder: 'Username/handle',
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 4,
            type: 'password',
            placeholder: 'Password',
        }
    ]
}

const customTheme = {
    ...AmplifyTheme,
    button: {
        ...AmplifyTheme.button,
        backgroundColor: Colors.primary,
        borderRadius: 100,
    },
    buttonDisabled: {
        ...AmplifyTheme.buttonDisabled,
        backgroundColor: '#5c78ff',
        borderRadius: 100,
    },
    sectionFooterLink: {
        ...AmplifyTheme.sectionFooterLink,
        color: Colors.primary,
    },
}

export default withAuthenticator(App, {
    signUpConfig, theme: customTheme
});
