import { ReactNode } from "react";
import { UlTabs } from "./styles";
interface TabsHeaderProps{
    children?: ReactNode
}

export default function TabsHeader(props: TabsHeaderProps){

    return(
        <UlTabs>
            {props.children}
        </UlTabs>
    )
}