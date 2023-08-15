import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import StudentService from '../services/StudentService';
import { withParams } from './withParams';
import InputMask from 'react-input-mask';
import { citiesData } from './cityData';
import { InputTextarea } from "primereact/inputtextarea";

class CreateStudentComp extends Component {
    
    constructor(props){
        super(props)

        let {id} = props.params;
        this.state = {
            id: id,
            firstName:'',
            lastName: '',
            phone:'',
            district:'',
            city:'',
            districts:[],
            description:''
        }

        this.handleFirstname=this.handleFirstname.bind(this);
        this.handleLastName=this.handleLastName.bind(this);
        this.handlePhone=this.handlePhone.bind(this);
        this.handleDistrict=this.handleDistrict.bind(this);
        this.handleCity=this.handleCity.bind(this);
        this.handleDescription=this.handleDescription.bind(this);

        this.saveStudent=this.saveStudent.bind(this);
    }


    componentDidMount(){
        if(this.state.id==='_add'){
            return
        }
        else{
            
        StudentService.getStudentById(this.state.id).then((res)=>{

            let student = res.data;
            this.setState({firstName:student.firstName,
                lastName:student.lastName,
                phone:student.phone,
                city:student.city,
                district:student.district,
                description:student.description
            
            })

        });
        }
    }

    saveStudent=(e)=>{
        e.preventDefault();

        let student = {firstName:this.state.firstName, lastName:this.state.lastName, phone:this.state.phone,
             city:this.state.city, district:this.state.district, description:this.state.description };
        console.log('student =>'+JSON.stringify(student));


        if(this.state.id==='_add'){
            StudentService.createStudent(student).then(res=>{
                window.location.replace('/students');
           });
        }
        else{
            StudentService.updateStudent(student,this.state.id).then(res =>{
               window.location.replace('/students');
            });
        }
    }

    handleFirstname=(event)=>{
        this.setState({firstName:event.target.value});
    }

    handleLastName=(event)=>{
        this.setState({lastName:event.target.value});
    }

    handlePhone=(event)=>{
        
        this.setState({phone:event.target.value});
    }

    handleCity=(event)=>{
        this.setState({city:event.target.value});
        this.setState({districts:citiesData.find(ct=>ct.name===event.target.value).x});
    }

    handleDistrict=(event)=>{
        this.setState({district:event.target.value});

    }

    handleDescription=(event)=>{
        this.setState({description:event.target.value});
    }

    getTitle(){
        if(this.state.id==='_add'){
            return  <h3 className='text-center'>Add Student</h3>
        }
        else{
           return  <h3 className='text-center'>Update Student</h3>
        }
    }

    render() {
       
        
        return ( 
           
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                this.getTitle()
                            }
                            <div className='card-body'></div>
                            <form>
                                <div className='form-group'>
                                    <label>First Name:</label>
                                    <input placeholder='First Name' name='firstName' className='form-control'
                                        value={this.state.firstName} onChange={this.handleFirstname}/>
                                </div>
                                <div className='form-group'>
                                    <label>Last Name:</label>
                                    <input placeholder='Last Name' name='lastName' className='form-control'
                                        value={this.state.lastName} onChange={this.handleLastName}/>
                                </div>
                                <div className='form-group'>
                                    <label>Phone Number:</label>
                                    <InputMask  className='form-control' name='phone' 
                                    placeholder='(000) 000 00 00' 
                                    
                                    value={this.state.phone} 
                                    onChange={this.handlePhone}
                                    mask='(999) 999 99 99' >    
                                    </InputMask>
                               
                                </div>

                                <div className="form-group">
                                <div >
                                    City:
                                    <select className="form-control" value={this.state.city} onChange={this.handleCity}>
                                        <option>---City---</option>
                                        
                                        {citiesData.map(ct=>(
                                            <option value={ct.name}>{ct.name}</option>
                                        ))}
                                    </select>
                                    <br/>
                                    District:
                                    <select className="form-control" value={this.state.district} onChange={this.handleDistrict}>
                                        <option>
                                            ---District---
                                        </option>
                                        
                                        {this.state.districts.map(d=>(
                                            
                                            <option value={d.name}>{d.name}</option>
                                        ) )}
                                    </select>
                                    <br></br>
                                </div>

                                <div className='form-group'>
                                    Description:
                                <div className="card flex justify-content-center">
                                 <InputTextarea autoResize value={this.description} onChange={this.handleDescription} rows={5} cols={30} />
                                 </div>
                                </div>
                                 </div>
                                <button className='btn btn-success' onClick={this.saveStudent}>Save</button>
                                <Link to='/students' className='btn btn-danger' style={{marginLeft: "10px"}}>Cancel</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>    

        );
    }
}

export default withParams(CreateStudentComp);