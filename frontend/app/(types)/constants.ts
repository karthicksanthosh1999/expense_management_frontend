export type formMode = "POST" | "PUT";

export interface IApiResponse<T> {
    message: string,
    data: T,
    code: number,
    status: boolean
}

export interface IGlobalUpdateType<T> {
    id: string,
    data: T
}
export interface IGlobalDeleteType {
    id: string,
} 