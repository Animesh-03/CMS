import React, { Component, createContext } from 'react';

const ProfessorContext = createContext();

class ProfessorContextProvider extends Component {
    state = { 
        professorUser: {},
        isProfessorAuthenticated: false
    }
    //Sets the user and auth from local storage
    componentDidMount()
    {
        if(localStorage.getItem("professoUser") != null)
        {
            this.setState({professorUser: JSON.parse(localStorage.getItem("professorUser"))})
        }

        if(localStorage.getItem("isProfessorAuthenticated") != null)
        {
            this.setState({isProfessorAuthenticated: localStorage.getItem("isProfessorAuthenticated")});
        }
    }
    //Sets the user and stores in local storage
    changeProfessor = (newProfessor) => {
        this.setState({professorUser: newProfessor});
        localStorage.setItem("professorUser", JSON.stringify(newProfessor));
    }
    //Sets the auth variable and stores in local storage
    toggleAuth = (bool) => {
        this.setState({isProfessorAuthenticated: bool});
        localStorage.setItem("isProfessorAuthenticated", bool);
    }
    
    render() { 
        return (
            <ProfessorContext.Provider value={{...this.state}}>
                {this.props.children}
            </ProfessorContext.Provider>
        );
    }
}
 
export default ProfessorContextProvider;