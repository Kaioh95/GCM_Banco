import * as yup from "yup"

export const TransferSchema = yup.object().shape({
    accountIdSrc: yup.number().required(),
    accountIdDest: yup.number().required(),
    value: yup.number().required(),
})