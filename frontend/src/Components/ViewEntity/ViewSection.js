import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const ViewSection = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    const {section_id} = useParams();    
    const navigate = useNavigate();

    const [section,setSection] = useState([]);

    const getSectionInfo = () => {
        axios.post("http://localhost:3000/view/course/section",{course_id: location.state.course_id, section_id: section_id})
            .then(res => {
                setSection(res.data);
                console.log(res.data);
            }).catch(error => {
                alert("Error getting section. Try again later");
            });
    }

    useEffect(() => {
        getSectionInfo();
    },[]);

    const editPrivileges = () => {
        let bool = false;
        section.professors.map(p => {
            if(p.professor_id === user.id)
            {
                bool = true;
            }
            return 0;
        });

        return user.role === 'professor' && bool;
    }


    return ( 
        <div className='view-section'>
            <div className='topics'>
                <h1>Topics</h1>
                {section.length && section.topics.length > 0 && section.topics.map(t => {
                    return (
                        <div key={t.topic_id} className='topic'>
                            <h3>{t.heading}</h3>
                            
                            

                            {(section.length > 0 && editPrivileges()) && <button className='add-topic-item-btn' onClick={() => navigate("add/topic/item", {state: {topic_id: t.topic_id}})}>Add Item</button>}
                        </div>
                    )
                })}
                {(section.length > 0 && editPrivileges()) && <button className='add-topic-btn' onClick={() => navigate("add/topic", {state: {section_id: section_id, course_id: location.state.course_id}})}>Add Topic</button>}
            </div>
        </div>
     );
}
 
export default ViewSection;