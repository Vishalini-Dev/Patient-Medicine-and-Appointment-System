document.addEventListener('DOMContentLoaded', function() {

    const registrationSection = document.getElementById('registrationSection');
    const profileSection = document.getElementById('profileSection');
    const appointmentSection = document.getElementById('appointmentSection');
    const medicationSection = document.getElementById('medicationSection');
    const registrationForm = document.getElementById('registrationForm');
    const patientInfo = document.getElementById('patientInfo');
    const appointmentBtn = document.getElementById('appointmentBtn');
    const medicationBtn = document.getElementById('medicationBtn');
    const backToProfileFromAppointment = document.getElementById('backToProfileFromAppointment');
    const backToProfileFromMedication = document.getElementById('backToProfileFromMedication');
    const doctorsTable = document.getElementById('doctorsTable');
    const medicationsTable = document.getElementById('medicationsTable');
    const addMedicationForm = document.getElementById('addMedicationForm');
    

    let currentPatient = null;
    
    registrationForm.addEventListener('submit', handleRegistration);
    appointmentBtn.addEventListener('click', showAppointmentSection);
    medicationBtn.addEventListener('click', showMedicationSection);
    backToProfileFromAppointment.addEventListener('click', showProfileSection);
    backToProfileFromMedication.addEventListener('click', showProfileSection);
    addMedicationForm.addEventListener('submit', handleAddMedication);

    function handleRegistration(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const medicalHistory = document.getElementById('medicalHistory').value;
        
        const patientData = {
            name: name,
            contact: contact,
            medicalHistory: medicalHistory
        };
        
        fetch('http://localhost:8080/api/patients/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData)
        })
        .then(response => response.json())
        .then(data => {
            currentPatient = data;
            updatePatientInfo();
            showProfileSection();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
    }
    
    function updatePatientInfo() {
        if (!currentPatient) return;
        
        patientInfo.innerHTML = `
            <p><strong>Name:</strong> ${currentPatient.name}</p>
            <p><strong>Contact:</strong> ${currentPatient.contact}</p>
            <p><strong>Medical History:</strong> ${currentPatient.medicalHistory || 'None provided'}</p>
        `;
    }
    
    function showProfileSection() {
        registrationSection.classList.add('hidden');
        profileSection.classList.remove('hidden');
        appointmentSection.classList.add('hidden');
        medicationSection.classList.add('hidden');
    }
    
    function showAppointmentSection() {
        profileSection.classList.add('hidden');
        appointmentSection.classList.remove('hidden');
        loadDoctors();
    }
    
    function showMedicationSection() {
        profileSection.classList.add('hidden');
        medicationSection.classList.remove('hidden');
        loadMedications();
    }

function loadDoctors() {
    fetch('http://localhost:8080/api/appointments/doctors')
        .then(response => response.json())
        .then(doctors => {
            const doctorsTable = document.getElementById('doctorsTable');
            doctorsTable.innerHTML = '';
            
            doctors.forEach(doctor => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${doctor.name}</td>
                    <td>${doctor.specialization}</td>
                    <td>
                        <button class="btn btn-primary btn-sm book-btn" 
                                data-doctor-id="${doctor.id}">
                            Book Appointment
                        </button>
                    </td>`;
                doctorsTable.appendChild(row);
            });

            document.querySelectorAll('.book-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const doctorId = this.getAttribute('data-doctor-id');
                    bookAppointment(doctorId);
                });
            });
        })
        .catch(error => {
            console.error('Error loading doctors:', error);
            alert('Failed to load doctors. Please try again.');
        });
}

function bookAppointment(doctorId) {
    const dateTime = prompt('Enter appointment date and time (YYYY-MM-DD HH:MM):');
    if (!dateTime) return;
    
    const appointmentData = {
        patient: { id: currentPatient.id }, 
        doctor: { id: doctorId },
        appointmentTime: dateTime
    };
    
    fetch('http://localhost:8080/api/appointments/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Appointment booked successfully!');
    })
    .catch(error => {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
    });
}

loadDoctors();
    
    function bookAppointment(doctorId) {
        const dateTime = prompt('Enter appointment date and time (YYYY-MM-DD HH:MM):');
        if (!dateTime) return;
        
        const appointmentData = {
            patient: { id: currentPatient.id },
            doctor: { id: doctorId },
            appointmentTime: dateTime
        };
        
        fetch('http://localhost:8080/api/appointments/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Your appointment is done!');
            showProfileSection();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to book appointment. Please try again.');
        });
    }
    
    function loadMedications() {
        fetch(`http://localhost:8080/api/medications`)
            .then(response => response.json())
            .then(medications => {
                medicationsTable.innerHTML = '';
                medications.forEach(med => {
                    if (med.patient && med.patient.id === currentPatient.id) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${med.medicationName}</td>
                            <td>${med.dosage}</td>
                            <td>${med.frequency}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-med-id="${med.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-med-id="${med.id}">Delete</button>
                            </td>
                        `;
                        medicationsTable.appendChild(row);
                    }
                });
                
                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const medId = this.getAttribute('data-med-id');
                        editMedication(medId);
                    });
                });
                
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const medId = this.getAttribute('data-med-id');
                        deleteMedication(medId);
                    });
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to load medications. Please try again.');
            });
    }
    
    function handleAddMedication(e) {
        e.preventDefault();
        
        const medicationName = document.getElementById('medicationName').value;
        const dosage = document.getElementById('dosage').value;
        const frequency = document.getElementById('frequency').value;
        
        const medicationData = {
            medicationName: medicationName,
            dosage: dosage,
            frequency: frequency,
            patient: { id: currentPatient.id }
        };
        
        fetch(`http://localhost:8080/api/medications/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicationData)
        })
        .then(response => response.json())
        .then(data => {
            addMedicationForm.reset();
            loadMedications();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add medication. Please try again.');
        });
    }
    
    function editMedication(medId) {
        fetch(`http://localhost:8080/api/medications/${medId}`)
            .then(response => response.json())
            .then(medication => {
                document.getElementById('medicationName').value = medication.medicationName;
                document.getElementById('dosage').value = medication.dosage;
                document.getElementById('frequency').value = medication.frequency;

                const submitButton = addMedicationForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'Update Medication';
                submitButton.classList.remove('btn-primary');
                submitButton.classList.add('btn-warning');

                addMedicationForm.replaceWith(addMedicationForm.cloneNode(true));
                const newForm = document.getElementById('addMedicationForm');

                newForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    updateMedication(medId);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to load medication for editing. Please try again.');
            });
    }
    
    function updateMedication(medId) {
        const medicationName = document.getElementById('medicationName').value;
        const dosage = document.getElementById('dosage').value;
        const frequency = document.getElementById('frequency').value;
        
        const medicationData = {
            medicationName: medicationName,
            dosage: dosage,
            frequency: frequency,
            patient: { id: currentPatient.id }
        };
        
        fetch(`http://localhost:8080/api/medications/edit/${medId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicationData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Update failed with status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            alert('Medication updated successfully!');

            resetMedicationForm();
            loadMedications();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update medication: ' + error.message);
        });
    }
    
    function resetMedicationForm() {
        const form = document.getElementById('addMedicationForm');
        if (!form) {
            console.error('Form not found');
            return;
        }

        form.reset();
        
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Add Medication';
            submitButton.classList.remove('btn-warning');
            submitButton.classList.add('btn-primary');
        }

        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        document.getElementById('addMedicationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddMedication(e);
        });
    }
    
    function deleteMedication(medId) {
        if (confirm('Are you sure you want to delete this medication?')) {
            fetch(`http://localhost:8080/api/medications/delete/${medId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    loadMedications();
                } else {
                    throw new Error('Failed to delete medication');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete medication. Please try again.');
            });
        }
    }
});