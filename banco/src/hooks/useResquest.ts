import api from "../services/api";

export interface ResponseType{
    success?: string;
    error?: Error;
}

export const useRequest = () => {
    const runRequest = async <T = unknown, U = unknown>(
        url: string,
        method: 'get' | 'post' | 'patch' | 'delete',
        params?: any,
        data?: U | undefined,
        headers?: any,
        customErrorMessage?: string 
    ) => {
        let response;
        
        try{
            response = await api.request<T>({
                url,
                method,
                params,
                data,
                headers: headers ?
                    headers
                    : {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error: any){
            let errorMsg = '';

            console.log(error)

            if (error.response.data.msg) {
                errorMsg = error.response.data.msg;
            } else if (customErrorMessage) {
                errorMsg = customErrorMessage;
            }

            return new Error(errorMsg);
        }
    };

    return { runRequest };
}