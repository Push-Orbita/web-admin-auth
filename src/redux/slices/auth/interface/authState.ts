import { UserEntity } from "./user.entity";

// Define a type for the slice state
export interface IauthState {
    token_client: string;
    token_user: string;
    isLogged: boolean;
    name: string;
    surname: string;
    organism: string;
    user: UserEntity | null;
}

