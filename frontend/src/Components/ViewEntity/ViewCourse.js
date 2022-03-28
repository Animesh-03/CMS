import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const ViewCourse = () => {
    const {user} = useContext(UserContext);
    const {course_id} = useParams(); //Gets the course id from the URL
    const navigate = useNavigate();

    const [course,setCourse] = useState(null);
    const [sections,setSections] = useState([]);

    useEffect(() => {
        //Gets the course using the course_id
        axios.get("http://localhost:3000/view/course/" + course_id)
        .then(res => {
            setCourse(res.data[0]);
        }).catch(error => {
            alert("Error getting course details. Try again later");
        });
        //Gets all the sections of this course
        axios.get("http://localhost:3000/view/section/all?course_id=" + course_id)
            .then(res => {
                setSections(res.data);
            }).catch(error => {
                alert("Error getting sections of this course. Try again later");
            });
    },[course_id]);

    const deleteSection = (section_id) => {
        //Fill code to delete section
    }

    return ( 
        <div className='view-course'>
            <h1> Name: {course && course.course_name}</h1>
            <p>ID: {course && course_id}</p>

            <div className='course-sections'>
                <h2>Course Sections</h2>
                {sections.map(s => {
                    return (
                        <div key={s.section_id}>
                            <p key={s.section_id} onClick={() => navigate("/view/course/section/" + s.section_id,{state:{course_id: course_id}})}>{course.course_name} {s.section_id}</p>
                            {course && course.ic === user.id && <button className='delete-section' onClick={() => deleteSection(s.section_id)}>Delete Section</button>}
                        </div>
                    );
                })}
                {course && course.ic === user.id && <button className='add-section' onClick={() => navigate("/professor/add/section",{state:{course_id: course_id}})}>Add Section</button>}
            </div>
        </div>
     );
}
 
export default ViewCourse;