import * as yup from "yup"

export const CreateAccountSchema = yup.object().shape({
    accountId: yup.number().required(),
    accountType: yup.string().required(),
})