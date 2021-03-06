import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface DropzoneProps {
    onFileUploaded: (file: File) => boolean;
}

const Dropzone : React.FC<DropzoneProps> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const isValid = onFileUploaded(file);
        if (isValid) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedFileUrl(fileUrl);
        }
    }, [onFileUploaded]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input accept="image/*" {...getInputProps()} />

            {selectedFileUrl
                ? <img src={selectedFileUrl} alt="imagem do estabelecimento" />
                : (
                    <p>
                        <FiUpload />
                        Imagem da doação
                    </p>
                )
            }
        </div>
    );
};

export default Dropzone;
