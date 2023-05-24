import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { CustomForm, CustomInput, CustomLabel, FormFooter, SubmitButton, FormError } from "../styles";
import { useState } from "react";
import { useRequest } from "../../../hooks/useResquest";
import { toast } from "react-toastify";
import { TransferSchema } from "../../../schemas/TransferSchema";

interface TransferValues extends FormikValues{
    accountIdSrc: number;
    accountIdDest: number;
    value: number;
}

function TransferForm(){
    const [isTransferLoading, setIsTransferLoading] = useState(false);
    const { runRequest } = useRequest();

    const initialValues={
        accountIdSrc: 0,
        accountIdDest: 0,
        value: 0,
    }


    const onSubmit = async (values: TransferValues, actions: FormikHelpers<TransferValues>) => {
        const headers = {'Content-Type': 'application/json',}

        const { success: response , error} = await TransferAccount(values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }

        actions.resetForm();
    }

    const TransferAccount = async (data: TransferValues, headers: any) => {
        setIsTransferLoading(true);
        const customErrorMessage = 'Erro ao tranferir!';
    
        console.log(data)
        const response = await runRequest<{msg: string}>(
            '/transferir',
            'patch',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsTransferLoading(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        console.log(response)

        return { success: response.msg, error: undefined }
    }

    const formik = useFormik({initialValues, onSubmit, validationSchema: TransferSchema});


    return(
        <FormikProvider value={formik}>
            <CustomForm>
            <CustomLabel>Número da Conta Remetente:</CustomLabel>
            <Field
                name='accountIdSrc'
                type='number'
                placeholder='Digite o número da conta'
                as={CustomInput}
            />
            <ErrorMessage component={FormError} name="accountIdSrc"/>

            <CustomLabel>Número da Conta Destino:</CustomLabel>
            <Field
                name='accountIdDest'
                type='number'
                placeholder='Digite o número da conta'
                as={CustomInput}
            />
            <ErrorMessage component={FormError} name="accountIdDest"/>

            <CustomLabel>Valor:</CustomLabel>
            <Field
                name='value'
                type='number'
                placeholder='Digite o valor a ser transferido'
                as={CustomInput}
            />
            <ErrorMessage component={FormError} name="value"/>

            <FormFooter>
                    <SubmitButton
                        type="submit"
                        className={isTransferLoading? 'disabled' : ''}
                        disabled={isTransferLoading}
                    >
                        Transferir
                    </SubmitButton>
            </FormFooter>
            </CustomForm>
        </FormikProvider>
    )
}

export default TransferForm;