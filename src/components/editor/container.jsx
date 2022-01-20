import './container.css';
import { useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';

export const Container =({onSuccess}) =>{
    const [files, setFiles] = useState([]);
    const onInputChange = (e) => {
        setFiles(e.target.files)
    };
    const onSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData();

        for(let i = 0; i< files.length; i++){

            data.append('file', files[i]);

        }

        
        axios.post('//localhost:8000/upload',data)
        .then((response)=>{
            toast.success('Uploading...')
            onSuccess(response.data)
            console.log(files.length)
        })
        .catch( (e)=>{
            toast.error('Failed to upload')
        })
    };


    return (
        <form method="post" action="#" id="#" onSubmit = {onSubmit} >
            <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       multiple/>
            </div>

            <button>Submit</button>
        </form>
    )
};