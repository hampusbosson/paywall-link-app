export type BaseEntity = {
    id: string;
}

export type Entity<T> = {
    [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
    email: string;
    isVerified: boolean;
}>

export type ApiResponse = {
    user: User;
    token: string;
}

export type Link = Entity<{
    title: string;
    targetUrl: string;
    price: Number;
    swishNumber: Number;
}>


