import { ReactNode } from "react";
import { ContentDiv } from "./styles";

interface TabsContentProps{
    children?: ReactNode
}

export default function TabsContent(props: TabsContentProps){

    return(
        <ContentDiv>
            {props.children}
        </ContentDiv>
    )
}