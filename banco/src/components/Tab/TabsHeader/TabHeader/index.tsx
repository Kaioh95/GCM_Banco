import { ReactNode, useContext } from "react";
import { TabA, TabLi } from "./styles";
import { TabContext } from "../../../../contexts/TabContext"


interface TabHeaderProps{
    target: string
    icon?: string
    label?: string
    children?: ReactNode
}

export default function TabHeader(props: TabHeaderProps){
    const context = useContext(TabContext)
    const { selected, selectTab } = context
    const selClass = selected === props.target
    const visible = context.visible?.[props.target]

    return(
        <div>
            {visible ?
                <TabLi className={selClass ? 'active' : ''}>
                    <TabA href="#"
                        data-toggle="tab"
                        onClick={() => selectTab?.(props.target)}
                        data-target={props.target}>
                        <i className={`fa fa-${props.icon}`}></i> {props.label}
                    </TabA>
                </TabLi>
            : null}
        </div>
    )
}