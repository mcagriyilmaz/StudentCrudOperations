import React, { Component } from 'react';
import StudentService from '../services/StudentService';


class ListStudentComponent extends Component {
        constructor(props){
            super(props)

            this.state={
                students:[]
            }
            
            this.editStudent=this.editStudent.bind(this);
            this.deleteStudent=this.deleteStudent.bind(this);

        }

        deleteStudent(id){
            StudentService.deleteStudent(id).then(res => {
                this.setState({students:this.state.students.filter(student => student.id !== id)});

            });

        }

        viewStudent(id){
            window.location.replace(`/view-student/${id}`);
        }


        editStudent(id){
        
            window.location.replace(`/add-student/${id}`);
        

        }

        componentDidMount(){
            StudentService.getStudents().then((res) =>{
                this.setState({students:res.data});
            });


        }

        addStudent(){
            window.location.replace(`/add-student/_add`);
        }

     

    render() {
        return (
            <div>
                <h2 className="text-center">Student List</h2>
                
                <div>
                    <button className='btn btn-primary' onClick={this.addStudent}>Add Student</button>
                </div>
                
                
                <div className='row' >
                    
                    <table className='table table-striped table-bordertabed'   >
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student First Name</th>
                                <th>Student Last Name</th>
                                <th>Student Phone Number</th>
                                <th>Student City</th>
                                <th>Student District</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.students.map(
                                    student =>
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.city}</td>
                                        <td>{student.district}</td>
                                        <td> 
                                            <button onClick={()=>this.editStudent(student.id)} className='btn btn-primary' >Update</button>
                                            <button style={{marginLeft:'10px'}}onClick={()=>this.deleteStudent(student.id)} className='btn btn-danger' >Delete</button>
                                            <button style={{marginLeft:'10px'}}onClick={()=>this.viewStudent(student.id)} className='btn btn-info' >View</button>

                                        </td>

                                        
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>

                </div>

                
            </div>
        );
    }
}

export default ListStudentComponent;