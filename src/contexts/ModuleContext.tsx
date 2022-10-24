// create context for module screen
import { createContext } from "react";

const ModuleContext = createContext({});

const ModuleContextProvider = ({ children }) => {
    return (
        <ModuleContext.Provider value={{

        }}>{children}
        </ModuleContext.Provider>
    );
}
