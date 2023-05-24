import { ReactNode, useContext } from "react";
import { TabContext } from "../../../../contexts/TabContext";
import { ContentDiv } from "./styles";

interface TabContentProps{
    id: string
    children?: ReactNode
}

export default function TabContent(props: TabContentProps){
    const context = useContext(TabContext)
    const selected = context.selected === props.id
    const visible = context.visible?.[props.id]

    return(
        <div>
            { ( () => {
                if(visible){
                    return(
                        <ContentDiv id={props.id} className={`${selected ? 'active' : ''}`}>
                            {props.children}
                        </ContentDiv>
                    )
                }
            } )() }
        </div>
    )
}