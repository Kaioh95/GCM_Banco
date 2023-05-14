import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { CustomForm, CustomInput, CustomLabel, FormFooter, SubmitButton, FormError } from "../styles";
import { useState } from "react";
import { useRequest } from "../../../hooks/useResquest";
import { toast } from "react-toastify";
import { DebitSchema } from "../../../schemas/DebitAccount";

interface DebitValues extends FormikValues{
    accountId: number;
    debits: number
}

function DebitForm(){
    const [isDebitLoading, setIsDebitLoading] = useState(false);
    const { runRequest } = useRequest();

    const initialValues={
        accountId: 0,
        debits: 0,
    }


    const onSubmit = async (values: DebitValues, actions: FormikHelpers<DebitValues>) => {
        const headers = {'Content-Type': 'application/json',}

        const { success: response , error} = await DebitAccount(values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }

        actions.resetForm();
    }

    const DebitAccount = async (data: DebitValues, headers: any) => {
        setIsDebitLoading(true);
        const customErrorMessage = 'Erro ao debitar!';

        const response = await runRequest<{msg: string}>(
            '/debito',
            'patch',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsDebitLoading(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response.msg, error: undefined }
    }

    const formik = useFormik({initialValues, onSubmit, validationSchema: DebitSchema});


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

            <CustomLabel>Débitos:</CustomLabel>
            <Field
                name='debits'
                type='number'
                placeholder='Digite o valor a ser Debitado'
                as={CustomInput}
            />
            <ErrorMessage component={FormError} name="debits"/>

            <FormFooter>
                    <SubmitButton
                        type="submit"
                        className={isDebitLoading? 'disabled' : ''}
                        disabled={isDebitLoading}
                    >
                        Debitar
                    </SubmitButton>
            </FormFooter>
            </CustomForm>
        </FormikProvider>
    )
}

export default DebitForm;