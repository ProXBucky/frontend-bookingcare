const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',


    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',

    //admin
    FETCH_GENDER_FIRST: 'FETCH_GENDER_FIRST',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_ROLE_FIRST: 'FETCH_ROLE_FIRST',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    FETCH_POSITION_FIRST: 'FETCH_POSITION_FIRST',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    POST_NEW_USER_SUCCESS: 'POST_NEW_USER_SUCCESS',
    POST_NEW_USER_FAILED: 'POST_NEW_USER_FAILED',

    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    GET_TOP_DOCTOR_SUCCESS: 'GET_TOP_DOCTOR_SUCCESS',
    GET_TOP_DOCTOR_FAILED: 'GET_TOP_DOCTOR_FAILED',

    GET_ALL_DOCTOR_SUCCESS: 'GET_ALL_DOCTOR_SUCCESS',
    GET_ALL_DOCTOR_FAILED: 'GET_ALL_DOCTOR_FAILED',

    POST_INFO_DOCTOR_SUCCESS: 'POST_INFO_DOCTOR_SUCCESS',
    POST_INFO_DOCTOR_FAILED: 'POST_INFO_DOCTOR_FAILED',

    GET_ALLCODE_SCHEDULE_SUCCESS: 'GET_ALLCODE_SCHEDULE_SUCCESS',
    GET_ALLCODE_SCHEDULE_FAILED: 'GET_ALLCODE_SCHEDULE_FAILED,',

    GET_ALLCODE_PRICE_SUCCESS: 'GET_ALLCODE_PRICE_SUCCESS',
    GET_ALLCODE_PRICE_FAILED: 'GET_ALLCODE_PRICE_FAILED',

    GET_ALLCODE_PAYMENT_SUCCESS: 'GET_ALLCODE_PAYMENT_SUCCESS',
    GET_ALLCODE_PAYMENT_FAILED: 'GET_ALLCODE_PAYMENT_FAILED',

    GET_ALLCODE_PROVINCE_SUCCESS: 'GET_ALLCODE_PROVINCE_SUCCESS',
    GET_ALLCODE_PROVINCE_FAILED: 'GET_ALLCODE_PROVINCE_FAILED',

    GET_ALL_SPECIALTY_SUCCESS: 'GET_ALL_SPECIALTY_SUCCESS',
    GET_ALL_SPECIALTY_FAILED: 'GET_ALL_SPECIALTY_FAILED',

    GET_ALL_CLINIC_SUCCESS: 'GET_ALL_CLINIC_SUCCESS',
    GET_ALL_CLINIC_FAILED: 'GET_ALL_CLINIC_FAILED',



})

export default actionTypes;