import actionTypes from './actionTypes';
import {
    getAllCodes, createUserService, getAllUser, deleteUserService,
    editUserService, getTopDoctorService, getAllDoctorService,
    postInfoDoctorService, getDetailDoctorByIdService, getAllSpecialty,
    getAllClinic
} from '../../services/userService';
import { toast } from 'react-toastify';

// Export gender, role, position
export const fetchGenderFirst = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_FIRST })
            let res = await getAllCodes("GENDER");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_GENDER_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_GENDER_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_GENDER_FAILED
            })
        }
    }
}


export const fetchRoleFirst = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_FIRST })

            let res = await getAllCodes("ROLE");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ROLE_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({ type: actionTypes.FETCH_ROLE_FAILED })
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_ROLE_FAILED })
        }
    }
}

export const fetchPositionFirst = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_FIRST })

            let res = await getAllCodes("POSITION");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_POSITION_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_POSITION_FAILED,
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_POSITION_FAILED,
            })
        }
    }
}


//Post new user
export const postNewUser = (dataTmp) => {
    return async (dispatch, getState) => {
        try {
            let res = await createUserService(dataTmp)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.POST_NEW_USER_SUCCESS
                })
                dispatch(fetchAllUser())
                toast.success('Create new user success <3')
            } else {
                console.log(res)
                dispatch({
                    type: actionTypes.POST_NEW_USER_FAILED
                })
                toast.error('Create new user failed <3')
            }
        } catch (e) {
            console.log('error from admin actions redux', e)
            toast.error('Create new user failed <3')
            dispatch({
                type: actionTypes.POST_NEW_USER_FAILED
            })
        }
    }
}


//Get all user 
export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
                    user: res.user,
                })
            } else {
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_ALL_USERS_FAILED,
                })
            }
        } catch (e) {
            console.log('error from admin actions redux', e)
            dispatch({
                type: actionTypes.FETCH_ALL_USERS_FAILED,
            })
        }
    }
}


// delete user in the table
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success('Delete user success <3')
                dispatch({
                    type: actionTypes.DELETE_USER_SUCCESS
                })
                dispatch(fetchAllUser())
            } else {
                toast.error('Delete user failed <3')
                dispatch({
                    type: actionTypes.DELETE_USER_FAILED
                })
            }
        } catch (e) {
            toast.error('Delete user failed <3')
            console.log('error from admin actions redux', e)
            dispatch({
                type: actionTypes.DELETE_USER_FAILED
            })
        }
    }
}


export const editUserRedux = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                toast.success('EDIT user success <3')
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS
                })
                dispatch(fetchAllUser())
            } else {
                toast.error('EDIT user failed <3')
                dispatch({
                    type: actionTypes.EDIT_USER_FAILED
                })
            }
        } catch (e) {
            toast.error('EDIT user failed <3')
            dispatch({
                type: actionTypes.EDIT_USER_FAILED
            })

        }
    }
}

export const getTopDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService(limit);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
                    data: res.data
                })
                console.log('get top doctor success')
            } else {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTOR_FAILED,
                })
                console.log('get top doctor failed')

            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_TOP_DOCTOR_FAILED,
            })
            console.log('get top doctor failed')

        }
    }
}


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
                    data: res.data
                })
                console.log('get all doctor success')
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTOR_FAILED,
                })
                console.log('get all doctor failed')
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_DOCTOR_FAILED,
            })
            console.log('get all doctor failed', e)

        }
    }
}



export const postInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await postInfoDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success('Add information success')
                console.log('get top doctor success')
                dispatch({
                    type: actionTypes.POST_INFO_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Add information failed')
                console.log('get top doctor failed with errCode', res)
                dispatch({
                    type: actionTypes.POST_INFO_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.POST_INFO_DOCTOR_FAILED,
            })
            toast.error('Add information failed')
            console.log('get top doctor failed', e)

        }
    }
}

export const getAllcodeSchedule = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodes("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALLCODE_SCHEDULE_FAILED
            })
        }
    }
}

export const getAllcodePrice = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodes("PRICE");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_PRICE_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_PRICE_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALLCODE_PRICE_FAILED
            })
        }
    }
}

export const getAllcodePayment = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodes("PAYMENT");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_PAYMENT_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_PAYMENT_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALLCODE_PAYMENT_FAILED
            })
        }
    }
}

export const getAllcodeProvince = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodes("PROVINCE");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_PROVINCE_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_PROVINCE_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALLCODE_PROVINCE_FAILED
            })
        }
    }
}

export const getAllSpecialtyRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_SPECIALTY_FAILED
                })
            }

        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_SPECIALTY_FAILED
            })
        }
    }
}

export const getAllClinicRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_CLINIC_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_CLINIC_FAILED
                })
            }

        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_CLINIC_FAILED
            })
        }
    }
}







