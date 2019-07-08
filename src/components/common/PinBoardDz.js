import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {uploadPinImages} from '../utils/api';
import { SnackbarProvider, useSnackbar } from 'notistack';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #3f51b5',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};


function PinBoardDz(props) {
    const [files, setFiles] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (message, variant) => () => {
        enqueueSnackbar(message, { variant });
    };

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        maxSize: 2000000,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            uploadPinImages(acceptedFiles);
        },
        onDropRejected: () => {
            handleClickVariant('Maximum file size limit exceeded', 'error')()
        }
    });
    
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
        <div style={thumbInner}>
            <img
            src={file.preview}
            style={img}
            />
        </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </div>
        </section>
    );
}

export default function WithNotistack() {
    return (
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right'}} maxSnack={3}>
        <PinBoardDz />
      </SnackbarProvider>
    );
  }