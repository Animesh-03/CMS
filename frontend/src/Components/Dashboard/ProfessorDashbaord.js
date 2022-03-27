import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';

const ProfessorDAshboard = () => {
    const {user} = useContext(UserContext);

    return ( 
        <div className='professor-dashboard'>
            <h1>Hello {user != null && user.first_name}</h1>
        </div>
     );
}
 
export default ProfessorDAshboard;