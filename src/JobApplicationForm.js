import React, { useState } from 'react';
import Swal from 'sweetalert2';

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        location: '',
        qualification: '',
        experience: '',
        yearsOfExperience: '',
        jobProfile: '',
        skills: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[0-9]{10}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/;

        if (!formData.firstName) formErrors.firstName = 'First Name is required';
        if (!formData.lastName) formErrors.lastName = 'Last Name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) formErrors.email = 'Email address is invalid';
        if (!formData.phone) formErrors.phone = 'Phone number is required';
        else if (!phoneRegex.test(formData.phone)) formErrors.phone = 'Phone number must be 10 digits';
        if (!formData.password) formErrors.password = 'Password is required';
        else if (!passwordRegex.test(formData.password)) formErrors.password = 'Password must be at least 6 characters long, including uppercase, lowercase, digits, and special characters';
        if (!formData.location) formErrors.location = 'Location is required';
        if (!formData.qualification) formErrors.qualification = 'Qualification is required';
        if (!formData.experience) formErrors.experience = 'Experience status is required';
        if (formData.experience === 'Experienced' && !formData.yearsOfExperience) formErrors.yearsOfExperience = 'Years of experience is required';
        if (!formData.jobProfile) formErrors.jobProfile = 'Job Profile is required';
        if (!formData.skills) formErrors.skills = 'Skills are required';
        if (!formData.termsAccepted) formErrors.termsAccepted = 'You must agree to the terms and conditions';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            Swal.fire('Success', 'Your job application has been submitted!', 'success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                location: '',
                qualification: '',
                experience: '',
                yearsOfExperience: '',
                jobProfile: '',
                skills: '',
                termsAccepted: false
            });
        } else {
            Swal.fire('Error', 'Please fix the errors in the form.', 'error');
        }
    };

    return (
        <div>
            {/* <h1>Job Application Form</h1> */}
            <form onSubmit={handleSubmit}>
                <label className="required">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <div className="error">{errors.firstName}</div>}

                <label className="required">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <div className="error">{errors.lastName}</div>}

                <label className="required">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <div className="error">{errors.email}</div>}

                <label className="required">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <div className="error">{errors.phone}</div>}

                <label className="required">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <div className="error">{errors.password}</div>}

                <label className="required">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
                {errors.location && <div className="error">{errors.location}</div>}

                <label className="required">Qualification</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
                {errors.qualification && <div className="error">{errors.qualification}</div>}

                <label className="required">Experience</label>
                <select name="experience" value={formData.experience} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                </select>
                {errors.experience && <div className="error">{errors.experience}</div>}

                {formData.experience === 'Experienced' && (
                    <>
                        <label className="required">Years of Experience</label>
                        <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
                        {errors.yearsOfExperience && <div className="error">{errors.yearsOfExperience}</div>}
                    </>
                )}

                <label className="required">Job Profile</label>
                <input type="text" name="jobProfile" value={formData.jobProfile} onChange={handleChange} />
                {errors.jobProfile && <div className="error">{errors.jobProfile}</div>}

                <label className="required">Skills</label>
                <textarea name="skills" value={formData.skills} onChange={handleChange} />
                {errors.skills && <div className="error">{errors.skills}</div>}

                <div className="checkbox-label">
                    <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                    <label className="required">Agree to Terms and Conditions</label>
                </div>
                {errors.termsAccepted && <div className="error">{errors.termsAccepted}</div>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default JobApplicationForm;
