import { createContext, ReactNode, useState } from "react";

export interface TabContextType{
    selected: string
    visible: { [key: string]: boolean }
    selectTab: (tabId: string) => void
    showTabs: (...tabIds: string[]) => void
}

export interface TabContextProps{
    children: ReactNode
}

export const TabContext = createContext({} as TabContextType)

export const TabContextProvider = ({ children }: TabContextProps) => {
    const [selected, setSelected] = useState<string>("");
    const [visible, setVisible] = useState<{[ key: string]: boolean}>({});

    const selectTab = (tabId: string) => {
        setSelected(tabId);
    }


    const showTabs = (...tabIds: string[]) => {
        const tabsToShow: { [ key: string]: boolean } = {};
        tabIds.forEach(e => tabsToShow[e] = true);
        setVisible(tabsToShow);
    }

    return(
        <TabContext.Provider value={{
            selected,
            visible,
            selectTab,
            showTabs
        }}>
            {children}
        </TabContext.Provider>
    )
}