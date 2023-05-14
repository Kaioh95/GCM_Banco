import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { CustomForm, CustomInput, CustomLabel, FormFooter, SubmitButton, FormError } from "../styles";
import { useState } from "react";
import { useRequest } from "../../../hooks/useResquest";
import { toast } from "react-toastify";
import * as yup from "yup"

interface BalanceValues extends FormikValues{
    accountId: number;
}

function BalanceForm(){
    const [isBalanceLoading, setIsBalanceLoading] = useState(false);
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

        const response = await runRequest<{msg: string}>(
            '/',
            'get',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsBalanceLoading(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response.msg, error: undefined }
    }

    const formik = useFormik({
        initialValues, 
        onSubmit, 
        validationSchema: yup.object().shape({
            accountId: yup.number().required(),
        })}
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
            <ErrorMessage component={FormError} name="title"/>

            <FormFooter>
                    <SubmitButton
                        type="submit"
                        className={isBalanceLoading? 'disabled' : ''}
                        disabled={isBalanceLoading}
                    >
                        Saldo
                    </SubmitButton>
            </FormFooter>
            </CustomForm>
        </FormikProvider>
    )
}

export default BalanceForm;