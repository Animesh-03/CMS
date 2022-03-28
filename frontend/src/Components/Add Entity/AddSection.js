import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import { UserContext } from '../Contexts/UserContext';

const AddSection = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isRoot,setIsRoot] = useState(true);
    const [sectionType,setSectionType] = useState("L");
    const [sectionNumber,setSectionNumber] = useState(0);
    const [professors,setProfessors] = useState([]);
    const [sectionProfessors, setSectionProfessors] = useState([]);

    const sectionTypes = [
        {name:"L", value:"L"},
        {name:"P", value:"P"},
        {name:"T", value:"T"}
    ]

    useEffect(() => {
        axios.get("http://localhost:3000/view/professor/all")
            .then(res => {
                let profList = [];
                res.data.map(prof => {
                    let obj = {value: prof.professor_id, name: prof.first_name + " " + prof.last_name}
                    profList.push(obj);
                    return 0;
                });

                setProfessors(profList);
            }).catch(error => {
                alert("Error getting professors. Try again later");
            });
    },[]);


    const handleSubmit = (e) => {
        e.preventDefault();

        let section_id = sectionType + sectionNumber;

        let profList = [];
        profList.push(user.id);
        
        if(isRoot){
            section_id = 'L';
        }

        axios.post("http://localhost:3000/add/section",{
            section_id: section_id,
            course_id: location.state.course_id
        }).then(res => {
            console.log(profList);

            axios.post("http://localhost:3000/add/section/professors",{
                professors: isRoot ? profList : sectionProfessors,
                section_id: section_id,
                course_id: location.state.course_id
            }).then(res => {
                navigate(-1);
            }).catch(error => {
                alert("Something went wrong while adding section. Try again later");
            });
        })
    }

    return ( 
        <div className='add=section' onSubmit={handleSubmit}>
            <form className='add-section-form'>
                <label htmlFor='is-section-root' className='form-label'>Root Section</label>
                <input type={'checkbox'} onChange={(e) => setIsRoot(e.target.checked)} defaultChecked={true} />

                {!isRoot &&
                    <div className='add-section-additional'>
                        <label htmlFor='section-type' className='form-label'>Section Type</label>
                        <SelectSearch id='section-type' options={sectionTypes} onChange={setSectionType} value={sectionType} />

                        <label htmlFor='section-number' className='form-label'>Section Number</label>
                        <input id='section-number' className='form-control' placeholder='Enter Section Number' onChange={(e) => setSectionNumber(e.target.value)} required />

                        <label htmlFor='professor-select' className='form-label'>Select Professors</label>
                        <SelectSearch id='professor-select' options={professors} placeholder='Select Professors' multiple search filterOptions={fuzzySearch} value={sectionProfessors} onChange={setSectionProfessors} />
                    </div>
                }

                <button className='add-section-submit-btn' type='submit' >Add</button>
            </form>
        </div>
     );
}
 
export default AddSection;