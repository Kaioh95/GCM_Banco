import * as yup from "yup"

export const BearInterestsSchema = yup.object().shape({
    accountId: yup.number().required(),
    fee: yup.number().required(),
})