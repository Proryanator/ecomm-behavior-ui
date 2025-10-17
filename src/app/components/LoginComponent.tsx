"use client"

import React from "react";
import {CredentialProps} from "@/app/components/CredentialsProp";

const LoginComponent: React.FC<CredentialProps> = ({
                                                       handleUsernameUpdate,
                                                       handlePasswordUpdate,
                                                       handleLogin
                                                   }) => {

    const [error, setError] = React.useState(false);


    return (
        <div>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" id="first_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="John" required
                               onChange={handleUsernameUpdate}/>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="text" id="first_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="FiddlyDiddly" required
                               onChange={handlePasswordUpdate}/>
                    </div>
                </div>
                <div className="text-center">
                    <button type="button"
                            className="w-full h-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={async () => {
                                if (handleLogin !== undefined) {
                                    const canLogin = await handleLogin()
                                    setError(!canLogin);
                                }
                            }
                            }>Login
                    </button>
                </div>
                {error && (
                    <div className="text-center">
                        <p className="bg-red-500">No-no, that was not correct please try again.</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default LoginComponent;