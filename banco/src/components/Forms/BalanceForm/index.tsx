import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { CustomForm, CustomInput, CustomLabel, FormFooter, SubmitButton, FormError, DivResult } from "../styles";
import { useState } from "react";
import { useRequest } from "../../../hooks/useResquest";
import { toast } from "react-toastify";
import { BalanceAccountSchema } from "../../../schemas/BalanceAccountSchema";

interface BalanceValues extends FormikValues{
    accountId: number;
}

type AccountType = {
    _id: string,
    accountId: string,
    balance: string,
}

function BalanceForm(){
    const [isBalanceLoading, setIsBalanceLoading] = useState(false);
    const [resultMsg, setResultMsg] = useState<string>("");
    const { runRequest } = useRequest();

    const initialValues={
        accountId: 0,
    }


    const onSubmit = async (values: BalanceValues, actions: FormikHelpers<BalanceValues>) => {
        const headers = {'Content-Type': 'application/json',}

        const { success: response , error} = await BalanceAccount(values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }

        actions.resetForm();
    }

    const BalanceAccount = async (data: BalanceValues, headers: any) => {
        setIsBalanceLoading(true);
        const customErrorMessage = 'Erro ao acessar conta!';

        const response = await runRequest<{msg: string, account: AccountType}>(
            `/${data.accountId}`,
            'get',
            undefined,
            undefined,
            headers,
            customErrorMessage
        )

        setIsBalanceLoading(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        console.log(response)
        setResultMsg(`Conta: ${response.account.accountId} | Saldo: ${response.account.balance}`)

        return { success: response.msg, error: undefined }
    }

    const formik = useFormik({
        initialValues, 
        onSubmit, 
        validationSchema: BalanceAccountSchema}
    );


    return(
        <FormikProvider value={formik}>
            <CustomForm>
                <CustomLabel>Número da Conta:</CustomLabel>
                <Field
                    name='accountId'
                    type='number'
                    placeholder='Digite o número da conta'
                    as={CustomInput}
                />
                <ErrorMessage component={FormError} name="accountId"/>

                <FormFooter>
                        <SubmitButton
                            type="submit"
                            className={isBalanceLoading? 'disabled' : ''}
                            disabled={isBalanceLoading}
                        >
                            Saldo
                        </SubmitButton>
                </FormFooter>
                
                <DivResult>{resultMsg}</DivResult>
            </CustomForm>
        </FormikProvider>
    )
}

export default BalanceForm;