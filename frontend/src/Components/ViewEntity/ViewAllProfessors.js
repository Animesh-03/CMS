import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const ViewAllProfessors = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [professors,setProfessors] = useState([]);
    const [searchName,setSearchName] = useState("");

    //Get all the professors on page load
    useEffect(() => {
        getAllProfessors();
    },[]);

    //Get all the professors
    const getAllProfessors = () => {
        axios.get("http://localhost:3000/view/professor/all")
            .then(res => {
                setProfessors(res.data);
            }).catch(error => {
                alert("Something went wrong. Try again later");
            });
    }
    //Get all the professors with the name
    const getProfessorsWithName = (name) => {
        axios.get("http://localhost:3000/view/professor/all?name=" + name)
            .then(res => {
                setProfessors(res.data);
            }).catch(error => {
                alert("Something went wrong. Try again later");
            });
    }
    //Delete a professor with the ID
    const deleteProfessor = (professor_id) => {
        axios.delete("http://localhost:3000/delete/professor",{data:{professor_id: professor_id}})
            .then(res => {
                getAllProfessors();
            }).catch(error => {
                alert("Something went wrong deleting the professor. Try again later");
            });
    }

    return ( 
        <div className='view-all-professors'>
             <form className='professor-filter-form'>
                <input className='form-control' placeholder='Enter Name of Professor' onChange={(e) => setSearchName(e.target.value)} />
                <button className='professor-filter-search-btn' onClick={(e) => {e.preventDefault();getProfessorsWithName(searchName)}}>Search</button>
            </form>

            <div className='all-professors'>
                <h2>All Professors</h2>
                {professors.map(prof => {
                    return (
                        <div key={prof.professor_id}>
                            <p key={prof.professor_id} onClick={() => navigate("/view/professor/" + prof.professor_id)} >{prof.first_name}-{prof.professor_id}</p>
                            {user.role === "admin" && <button  className='delete-professor' onClick={() => deleteProfessor(prof.professor_id)}>Delete</button>}
                        </div>
                    );
                })}
            </div>
        </div>
     );
}
 
export default ViewAllProfessors;