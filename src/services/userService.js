import { relativeTimeRounding } from 'moment';
import axios from '../axios';
import { result } from 'lodash';

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUser = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`)
}

const createUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodes = (typeId) => {
    return axios.get(`/api/allcodes?type=${typeId}`)
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctor')
}

const postInfoDoctorService = (data) => {
    return axios.post('/api/post-info-doctor', data)
}

const getDetailDoctorByIdService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const createBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleByDoctorIdAndTime = (id, date) => {
    return axios.get(`/api/get-schedule-doctor-by-doctorid-and-date?id=${id}&date=${date}`)
}

const getDoctorInfoById = (doctorId) => {
    return axios.get(`/api/get-doctor-info-by-id?doctorId=${doctorId}`)
}

const getExtraInfoById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const postBookingAppointment = (data) => {
    return axios.post('/api/post-booking-appointment', data)
}

const postVerifyingEmail = (data) => {
    return axios.post('/api/post-verifying-email', data)
}

const postSpecialtyInformation = (data) => {
    return axios.post('/api/post-specialty-information', data)
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty');
}

const getDetailSpecialtyAndDoctorByLocation = (id, location) => {
    return axios.get(`/api/get-detail-specialty-by-id-and-doctor-by-location?id=${id}&location=${location}`)
}

const postClinicInformation = (data) => {
    return axios.post('/api/post-clinic-information', data)
}

const getAllClinic = () => {
    return axios.get('/api/get-all-clinic');
}

const getDetailClinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}

const getListPatientBooking = (id, date) => {
    return axios.get(`/api/get-list-patient-by-day?id=${id}&date=${date}`)
}

const postThePrescription = (data) => {
    return axios.post('/api/post-the-prescription', data)
}
export {
    handleLoginAPI, getAllUser, createUserService,
    deleteUserService, editUserService, getAllCodes,
    getTopDoctorService, getAllDoctorService, postInfoDoctorService,
    getDetailDoctorByIdService, createBulkSchedule, getScheduleByDoctorIdAndTime, getDoctorInfoById,
    getExtraInfoById, postBookingAppointment, postVerifyingEmail, postSpecialtyInformation, getAllSpecialty,
    getDetailSpecialtyAndDoctorByLocation, postClinicInformation, getAllClinic, getDetailClinicById,
    getListPatientBooking, postThePrescription

}