'use client'

import LoginComponent from "@/app/components/LoginComponent";
import Upload from "@/app/components/Upload";
import React from "react";
import {get_roles, login} from "@/app/api/api";
import Logout from "@/app/components/Logout";
import Table from "@/app/components/Table";

export default function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [canUpload, setCanUpload] = React.useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        const canLogin = await login(username, password);
        setIsLoggedIn(canLogin);

        if (canLogin) {
            const roles = await get_roles(username, password);
            setCanUpload(roles[1] === "EDIT");
        }
        return canLogin
    }

    const logout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            {!isLoggedIn && (
                <LoginComponent username={username} password={password} handleUsernameUpdate={handleUsernameChange}
                                handlePasswordUpdate={handlePasswordChange} handleLogin={handleLogin}/>)}
            {isLoggedIn && (
                <Logout handleLogout={logout}/>
            )}
            {/* Only logged in users who have edit role can upload */}
            {isLoggedIn && canUpload && (<Upload username={username} password={password}/>)}
            {/* Logged in users can view the data */}
            {isLoggedIn && (<Table username={username} password={password}/>)}
        </div>
    );
}
