import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { CustomForm, CustomInput, CustomLabel, FormFooter, SubmitButton, FormError } from "../styles";
import { useState } from "react";
import { useRequest } from "../../../hooks/useResquest";
import { toast } from "react-toastify";
import { CreditSchema } from "../../../schemas/CreditAccount";

interface CreditValues extends FormikValues{
    accountId: number;
    credits: number
}

function CreditForm(){
    const [isCreditLoading, setIsCreditLoading] = useState(false);
    const { runRequest } = useRequest();

    const initialValues={
        accountId: 0,
        credits: 0,
    }


    const onSubmit = async (values: CreditValues, actions: FormikHelpers<CreditValues>) => {
        const headers = {'Content-Type': 'application/json',}

        const { success: response , error} = await CreditAccount(values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }

        actions.resetForm();
    }

    const CreditAccount = async (data: CreditValues, headers: any) => {
        setIsCreditLoading(true);
        const customErrorMessage = 'Erro ao creditar!';

        const response = await runRequest<{msg: string}>(
            '/credito',
            'patch',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsCreditLoading(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response.msg, error: undefined }
    }

    const formik = useFormik({initialValues, onSubmit, validationSchema: CreditSchema});


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

            <CustomLabel>Créditos:</CustomLabel>
            <Field
                name='credits'
                type='number'
                placeholder='Digite o valor a ser creditado'
                as={CustomInput}
            />
            <ErrorMessage component={FormError} name="credits"/>

            <FormFooter>
                    <SubmitButton
                        type="submit"
                        className={isCreditLoading? 'disabled' : ''}
                        disabled={isCreditLoading}
                    >
                        Creditar
                    </SubmitButton>
            </FormFooter>
            </CustomForm>
        </FormikProvider>
    )
}

export default CreditForm;