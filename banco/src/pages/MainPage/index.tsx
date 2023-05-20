import { useContext, useEffect } from "react";
import Tabs from "../../components/Tab/Tabs";
import TabsContent from "../../components/Tab/TabsContent";
import TabContent from "../../components/Tab/TabsContent/TabContent";
import TabsHeader from "../../components/Tab/TabsHeader";
import TabHeader from "../../components/Tab/TabsHeader/TabHeader";
import { TabContext } from "../../contexts/TabContext";
import CreateAccountForm from "../../components/Forms/CreateAccountForm";
import CreditForm from "../../components/Forms/CreditForm";
import DebitForm from "../../components/Forms/DebitForm";
import BalanceForm from "../../components/Forms/BalanceForm";
import TransferForm from "../../components/Forms/TransferForm";
import BearInterests from "../../components/Forms/BearInterests";

export default function MainPage(){
    const { selected, selectTab, showTabs } = useContext(TabContext)


    useEffect(()=> {
        if(!selected){
            selectTab("createTab")
        }
        showTabs("createTab", "balanceTab", "creditTab", "debitTab", "transferTab", "bearTab")
    }, [])

    return(
        <Tabs>
            <TabsHeader>
                <TabHeader label="CriarConta" icon="" target="createTab"/>
                <TabHeader label="Saldo" icon="" target="balanceTab"/>
                <TabHeader label="Creditar" icon="" target="creditTab"/>
                <TabHeader label="Debitar" icon="" target="debitTab"/>
                <TabHeader label="Transferir" icon="" target="transferTab"/>
                <TabHeader label="RenderJuros" icon="" target="bearTab"/>
            </TabsHeader>

            <TabsContent>
                <TabContent id="createTab">
                    <CreateAccountForm/>
                </TabContent>

                <TabContent id="balanceTab">
                    <BalanceForm/>
                </TabContent>

                <TabContent id="creditTab">
                    <CreditForm/>
                </TabContent>

                <TabContent id="debitTab">
                    <DebitForm/>
                </TabContent>

                <TabContent id="transferTab">
                    <TransferForm/>
                </TabContent>

                <TabContent id="bearTab">
                    <BearInterests/>
                </TabContent>
            </TabsContent>
        </Tabs>
    )
}