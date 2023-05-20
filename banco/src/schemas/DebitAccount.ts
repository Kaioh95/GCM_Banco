import * as yup from "yup"

export const DebitSchema = yup.object().shape({
    accountId: yup.number().required(),
    debits: yup.number().required(),
    accountType: yup.string().required(),
})