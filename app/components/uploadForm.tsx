// components/UploadForm.tsx
'use client';
import React, { useState, useEffect } from 'react';

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);

    // Récupère l'email depuis le local storage au montage du composant
    useEffect(() => {
        const storedData = localStorage.getItem('selectedData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setEmail(parsedData.email); // Assurez-vous que l'email est disponible
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
        <form onSubmit={handleFileUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload File</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </form>
    );
};

export default UploadForm;
