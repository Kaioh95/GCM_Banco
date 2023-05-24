import * as yup from "yup"

export const BalanceAccountSchema = yup.object().shape({
    accountId: yup.number().required(),
})