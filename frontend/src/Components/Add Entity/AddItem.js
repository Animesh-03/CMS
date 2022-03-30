import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const AddItem = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [description,setDescription] = useState('');
    const [file_link,setFileLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/section/add/topic/item", {item_id: location.state.topic_id, description: description, file_link: file_link})
            .then(res => {
                navigate(-1);
            }).catch(error => {
                alert("Error adding item. Try again later");
            });
    }


    return ( 
        <div className='add-item'>
            <form className='add-item-form' onSubmit={handleSubmit}>
                <label htmlFor='item-description' className='form-label'>Description</label>
                <textarea id='item-description' className='form-control' placeholder='Enter Description' rows={8} onChange={(e) => setDescription(e.target.value)} required />

                <label htmlFor='item-file' className='form-label'>File</label>
                <input id='item-file' type='text' className='form-control' placeholder='File link' onChange={(e) => setFileLink(e.target.value)} required />

                <button className='add-item-btn' type='submit'>Add</button>

            </form>

        </div>
     );
}
 
export default AddItem;