import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { CustomForm, CustomInput, CustomLabel, FormFooter, SubmitButton, FormError, DivResult } from "../styles";
import { useState } from "react";
import { useRequest } from "../../../hooks/useResquest";
import { toast } from "react-toastify";
import { BearInterestsSchema } from "../../../schemas/BearInterestsSchema";

interface BearInterestsValues extends FormikValues{
    accountId: number;
    fee: number;
}

type AccountType = {
    _id: string,
    accountId: string,
    balance: string,
}

function BearInterests(){
    const [isBearInterestsLoading, setIsBearInterestsLoading] = useState(false);
    const [resultMsg, setResultMsg] = useState<string>("");
    const { runRequest } = useRequest();

    const initialValues={
        accountId: 0,
        fee: 0,
    }


    const onSubmit = async (values: BearInterestsValues, actions: FormikHelpers<BearInterestsValues>) => {
        const headers = {'Content-Type': 'application/json',}

        const { success: response , error} = await BearInterestsAccount(values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }

        actions.resetForm();
    }

    const BearInterestsAccount = async (data: BearInterestsValues, headers: any) => {
        setIsBearInterestsLoading(true);
        const customErrorMessage = 'Erro ao acessar conta!';
        const customURL = `/poupanca/renderjuros`;

        const response = await runRequest<{msg: string, account: AccountType}>(
            customURL,
            `patch`,
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsBearInterestsLoading(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        console.log(response)
        setResultMsg(`Conta: ${response.account.accountId} | Saldo: ${response.account.balance} `)

        return { success: response.msg, error: undefined }
    }

    const formik = useFormik({
        initialValues, 
        onSubmit, 
        validationSchema: BearInterestsSchema}
    );


    return(
        <FormikProvider value={formik}>
            <CustomForm>
                <CustomLabel>Número da Conta Poupança:</CustomLabel>
                <Field
                    name='accountId'
                    type='number'
                    placeholder='Digite o número da conta poupança'
                    as={CustomInput}
                />
                <ErrorMessage component={FormError} name="accountId"/>

                <CustomLabel>Taxa: ex.(0.105 para 10,5% de taxa)</CustomLabel>
                <Field
                    name='fee'
                    type='number'
                    placeholder='Taxa em decimal ex.(0.105 para 10,5% de taxa)'
                    as={CustomInput}
                />
                <ErrorMessage component={FormError} name="fee"/>

                <FormFooter>
                        <SubmitButton
                            type="submit"
                            className={isBearInterestsLoading? 'disabled' : ''}
                            disabled={isBearInterestsLoading}
                        >
                            Render Juros
                        </SubmitButton>
                </FormFooter>
                
                <DivResult>{resultMsg}</DivResult>
            </CustomForm>
        </FormikProvider>
    )
}

export default BearInterests;