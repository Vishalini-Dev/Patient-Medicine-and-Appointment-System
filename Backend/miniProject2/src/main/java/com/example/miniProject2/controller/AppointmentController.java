package com.example.miniProject2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import com.example.miniProject2.model.Appointment;
import com.example.miniProject2.model.Doctor;
import com.example.miniProject2.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5500")

public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return appointmentService.getAllDoctors();
    }

    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }
}