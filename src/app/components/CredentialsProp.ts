import {ChangeEventHandler} from "react";

export interface CredentialProps {
    username: string;
    password: string;
    handleUsernameUpdate?: ChangeEventHandler<HTMLInputElement> | undefined;
    handlePasswordUpdate?: ChangeEventHandler<HTMLInputElement> | undefined;
    handleLogin?: () => Promise<boolean>;
}