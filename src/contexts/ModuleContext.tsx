// create context for module screen
import {createContext, useContext} from "react";

const ModuleContext = createContext({});

const ModuleContextProvider = ({ children }) => {
    return (
        <ModuleContext.Provider value={{

        }}>{children}
        </ModuleContext.Provider>
    );
}

export default ModuleContextProvider;

export const useModule = () => useContext(ModuleContext);
