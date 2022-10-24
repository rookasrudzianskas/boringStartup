// @ts-nocheck
// create a user context
import {createContext, useContext, useEffect, useState} from "react";
import {registerForPushNotificationsAsync} from "../utils/pushNotifications";
import {Auth, DataStore} from "aws-amplify";
import {User} from "../models";

const UserContext = createContext({});

const UserContextProvider = ({children}: any) => {
    const [user, setUser] = useState(null);
    const [expoToken, setExpoToken] = useState(null);

    useEffect(() => {

        (async () => {
            const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const users = await DataStore.query(User);
            const me = users.find((user) => user.sub === userData.attributes.sub);
            setUser(me);
        })();
    }, [])

    useEffect(() => {
        (async () => {
            const token = await registerForPushNotificationsAsync();
            setExpoToken(token);
        })();
    }, []);

    useEffect(() => {
        if(user && expoToken && user.expoNotificationToken !== expoToken) {

        }
    }, [user, token]);

    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
