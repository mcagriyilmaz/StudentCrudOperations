import React, { Component } from 'react';
import { withParams } from './withParams';
import StudentService from '../services/StudentService';

class ViewStudentComponent extends Component {

    constructor(props){

        super(props);

        let {id} = props.params;
        this.state = {
            id: id,
            student:{}
        }


    }

    componentDidMount(){

        StudentService.getStudentById(this.state.id).then(res=>
            {   this.setState({student: res.data});

            });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className='card col-md-6 offset-md-3'>
                    <h3 className='text-center'>Student Details</h3>
                    <div className='card-body'>
                        <div className='row'>
                            <label>Student First Name: { this.state.student.firstName } </label>
                        </div>
                        <div className='row'>
                            <label>Student Last Name: { this.state.student.lastName } </label>
                        </div>
                        <div className='row'>
                            <label>Student Phone Number: { this.state.student.phone } </label>
                        </div>
                        <div className='row'>
                            <label>Student City: { this.state.student.city } </label>
                        </div>
                        <div className='row'>
                            <label>Student District: { this.state.student.district } </label>
                        </div>
                        <div className='row'>
                            <label>Description:{this.state.student.description}</label>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(ViewStudentComponent);