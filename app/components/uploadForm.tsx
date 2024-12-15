// components/UploadForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    const { data: session } = useSession();

    const user = session?.user;

    // Récupère l'email depuis le local storage au montage du composant
    useEffect(() => {
        const emailFromSession = user?.email;
        if (emailFromSession) {
            setEmail(emailFromSession); // Assurez-vous que l'email est disponible
            console.log('localsto',emailFromSession)
        } else {
            setUploadStatus('Email not found in local storage');
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            setUploadStatus("No file selected");
            return;
        }
        if (!email) {
            setUploadStatus("No email found, please select a user");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Étape 1 : Téléchargement de l'image
            const response = await fetch('/api/uploads', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setUploadStatus('Upload successful');
                const imageId = result.file._id;

                // Étape 2 : Associer l'image au profil de l'utilisateur via l'email
                await linkProfilePicture(email, imageId);
            } else {
                setUploadStatus('Error during upload');
                console.error('Error during upload:', result.error);
            }
        } catch (error) {
            setUploadStatus('Error during upload');
            console.error('Error during upload:', error);
        }
    };

    // Associer l'image à l'utilisateur en utilisant son email
    const linkProfilePicture = async (email: string, imageId: string) => {
        try {
            const response = await fetch('/api/users/link-profile-picture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, imageId }),
            });

            const result = await response.json();
            if (response.ok) {
                setUploadStatus('Profile picture linked successfully');
                console.log('Profile picture linked:', result);
            } else {
                setUploadStatus('Error linking profile picture');
                console.error('Error linking profile picture:', result.error);
            }
        } catch (error) {
            setUploadStatus('Error linking profile picture');
            console.error('Error linking profile picture:', error);
        }
    };

    return (
        <form onSubmit={handleFileUpload} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-sm mx-auto">
            <label className="w-full">
                {/* <span className="block text-sm font-medium text-gray-700 mb-1">Select Profile Picture</span> */}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </label>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Upload File
            </button>
            {uploadStatus && (
                <p className={`text-sm mt-2 ${uploadStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {uploadStatus}
                </p>
            )}
        </form>
    );
};

export default UploadForm;
