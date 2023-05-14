import { ReactNode } from "react";
import { NavTabs } from "./styles";

interface TabsProps{
    children: ReactNode
}

export default function Tabs(props: TabsProps){

    return(
        <NavTabs>
            {props.children}
        </NavTabs>
    )
}