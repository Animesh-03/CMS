import React, { Component, createContext } from 'react';

const StudentContext = createContext();

class StudentContextProvider extends Component {
    state = { 
        studentUser: {},
        isStudentAuthenticated: false
    }
    //Sets the student user and auth from local storage
    componentDidMount()
    {
        if(localStorage.getItem("studentUser") != null)
        {
            this.setState({studentUser: JSON.parse(localStorage.getItem("studentUser"))});
        }

        if(localStorage.getItem("isStudentAuthenticated") != null)
        {
            this.setState({isStudentAuthenticated: localStorage.getItem("isStudentAuthenticated")});
        }
    }
    //Sets the student user to new user and stores in local storage
    changeStudent = (newStudent) => {
        this.setState({studentUser: newStudent});
        localStorage.setItem("studentUser", JSON.stringify(newStudent));
    }
    //Sets the auth variable and stores in local storage
    toggleAuth = (bool) => {
        this.setState({isStudentAuthenticated: bool});
        localStorage.setItem("isStudentAuthenticated", bool);
    }

    render() { 
        return (
            <StudentContext.Provider value={{...this.state, changeStudent: this.changeStudent, toggleAuth: this.toggleAuth}}>
                {this.props.children}
            </StudentContext.Provider>
        );
    }
}
 
export default StudentContextProvider;