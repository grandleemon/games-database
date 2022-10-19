import {AxiosError} from "axios";

export type ApiResponse<T> = Promise<{
    data?: T
    error?: AxiosError
}>

export type PendingPayload<T> = {
    pending: boolean
    rejected: boolean
    payload: T
}