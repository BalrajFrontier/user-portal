export type TResponse<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: T;
    statusCode: number;
    message: string;
};
