import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import SelectSearch from 'react-select-search';

const AddTopic = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [topicType,setTopicType] = useState(0);
    const [heading,setHeading] = useState('');

    //The object needed for select search component
    const typeOptions = [
        {name: 'Announcement', value: 0},
        {name: 'Standard', value: 1}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/section/add/topic",{type: topicType, heading: heading, section_id: location.state.section_id, course_id: location.state.course_id})
            .then(res => {
                navigate(-1);
            }).catch(error => {
                alert("Error adding topic. Try again later");
            });
    }

    return ( 
        <div className='add-topic'>
            <form className='add-topic-form' onSubmit={handleSubmit}>
                <label htmlFor='topic-type' className='form-label'>Type</label>
                <SelectSearch id='topic-type' options={typeOptions} value={topicType} onChange={setTopicType} />

                <label htmlFor='topic-heading' className='form-label'>Heading</label>
                <input id='topic-heading' className='form-control' type='text' onChange={(e) => setHeading(e.target.value)} placeholder='Enter heading' required />

                <button className='add-topic-form-btn' type='submit'>Add</button> 

            </form>

        </div>
     );
}
 
export default AddTopic;