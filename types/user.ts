export type User = {
    isLoggedIn: boolean;
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    verified?: boolean;
    locale?: string;
    email?: string;
};