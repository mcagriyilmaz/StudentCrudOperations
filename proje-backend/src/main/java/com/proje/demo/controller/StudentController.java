package com.proje.demo.controller;


import com.proje.demo.exception.ResourceNotFoundException;
import com.proje.demo.model.Student;
import com.proje.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.module.ResolutionException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    //getting all students

    @GetMapping("/students")
    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    //creating student rest API

    @PostMapping("/students")
    public Student createStudent(@RequestBody  Student student){
        return studentRepository.save(student);
    }


    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable  Long id){
        Student student = studentRepository.findById(id).orElseThrow(()->
                new ResolutionException("Student not found with id:"+id));
        return ResponseEntity.ok(student);


    }

    @PutMapping("/students/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, Student studentDetails){
        Student student = studentRepository.findById(id).orElseThrow(()->
                new ResolutionException("Student not found with id:"+id));
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setPhone(studentDetails.getPhone());
        student.setCity(studentDetails.getCity());
        student.setDistrict(studentDetails.getDistrict());
        student.setDescription(studentDetails.getDescription());

        Student updatedStudent =studentRepository.save(student);
        return ResponseEntity.ok(updatedStudent);

    }

    //student delete
    @DeleteMapping("/students/{id}")
    public ResponseEntity <Map<String,Boolean>> deleteStudent(@PathVariable  Long id){
        Student student= studentRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Student not exist with id:"+id));

        studentRepository.delete(student);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);


    }

}
