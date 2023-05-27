import * as yup from "yup"

export const TransferSchema = yup.object().shape({
    accountIdSrc: yup.number().required(),
    accountType: yup.string().required(),
    accountIdDest: yup.number().required(),
    destType: yup.string().required(),
    value: yup.number().required(),
})