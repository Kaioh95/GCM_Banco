import * as yup from "yup"

export const CreditSchema = yup.object().shape({
    accountId: yup.number().required(),
    credits: yup.number().required(),
    accountType: yup.string().required(),
})