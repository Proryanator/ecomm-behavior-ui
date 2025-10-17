'use client'

import React, {useState} from "react";
import {upload_csv} from "@/app/api/api";
import {CredentialProps} from "@/app/components/CredentialsProp";
import LoadingSpinner from "@/app/components/LoadingSpinner";


const Upload: React.FC<CredentialProps> = ({
                                               username,
                                               password,
                                           }) => {
    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [uploadTime, setUploadTime] = useState<number>(0.0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        setLoading(true);
        if (file) {
            const upload_time = await upload_csv(username, password, file);
            setUploadTime(upload_time);
        }
        setLoading(false);
    };

    return (
        <>
            <div className="input-group">
                <input id="file" type="file" onChange={handleFileChange}/>
            </div>

            {file && (
                <button
                    onClick={handleUpload}
                    className="w-56 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Upload a file</button>
            )}
            {loading && (
                <LoadingSpinner/>
            )}
            {uploadTime !== undefined && uploadTime !== 0 && (
                <p>Upload time in seconds: {(Math.round(uploadTime * 100) / 100).toFixed(2)}</p>)}

        </>
    );
};

export default Upload;