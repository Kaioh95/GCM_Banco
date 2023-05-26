import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { CreateAccountSchema } from "../../../schemas/CreateAccountSchema";
import { CustomForm, CustomInput, CustomLabel, FormFooter, SubmitButton, FormError } from "../styles";
import { useState } from "react";
import { useRequest } from "../../../hooks/useResquest";
import { toast } from "react-toastify";

interface CreateValues extends FormikValues{
    accountId: number;
    balance: number;
}

function CreateAccountForm(){
    const [isCreateLoading, setIsCreateLoading] = useState(false);
    const { runRequest } = useRequest();

    const initialValues={
        accountId: 0,
        balance: 0,
    }


    const onSubmit = async (values: CreateValues, actions: FormikHelpers<CreateValues>) => {
        const headers = {'Content-Type': 'application/json',}

        const { success: response , error} = await createAccount(values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }

        actions.resetForm();
    }

    const createAccount = async (data: CreateValues, headers: any) => {
        setIsCreateLoading(true);
        const customErrorMessage = 'Erro ao criar conta!';

        const response = await runRequest<{msg: string}>(
            '/',
            'post',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsCreateLoading(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response.msg, error: undefined }
    }

    const formik = useFormik({initialValues, onSubmit, validationSchema: CreateAccountSchema});


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


            <CustomLabel>Saldo inicial da Conta:</CustomLabel>
            <Field
                name='balance'
                type='number'
                placeholder='Digite o saldo da conta'
                as={CustomInput}
            />
            <ErrorMessage component={FormError} name="balance"/>


            <FormFooter>
                    <SubmitButton
                        type="submit"
                        className={isCreateLoading? 'disabled' : ''}
                        disabled={isCreateLoading}
                    >
                        Submit
                    </SubmitButton>
            </FormFooter>
            </CustomForm>
        </FormikProvider>
    )
}

export default CreateAccountForm;