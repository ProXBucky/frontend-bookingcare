import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./BookingModal.scss"
import { Modal, ModalHeader } from 'reactstrap';
import { getExtraInfoById } from "../../../../../services/userService"
import { languages } from '../../../../../utils';
import { NumericFormat } from 'react-number-format';
import * as actions from "../../../../../store/actions"
import Select from 'react-select';
import { postBookingAppointment } from "../../../../../services/userService"
import { toast } from 'react-toastify';
import DoctorInfo from '../DoctorInfo';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scheduleBooked: {},
            doctorInformation: {},
            nameEn: '',
            nameVi: '',
            genderOptions: [],
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            gender: '',
            reason: '',
        }
    }
    async componentDidMount() {
        this.props.getGenderRedux()
        let res = await getExtraInfoById(this.props.doctorId);
        if (res && res.errCode === 0) {
            if (res.data && res.data.positionData) {
                this.setState({
                    doctorInformation: res.data,
                    nameVi: `${res.data.positionData.valueVi} - ${res.data.firstName} ${res.data.lastName}`,
                    nameEn: `${res.data.positionData.valueEn} - ${res.data.lastName} ${res.data.firstName}`
                })
            }
        }

    }

    setGenderArr = (genderArr) => {
        let result = []
        genderArr.map((item) => {
            let obj = {}
            obj.label = this.props.language === languages.VI ? item.valueVi : item.valueEn
            obj.value = item.keyMap
            result.push(obj)
        })
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.scheduleBooked !== this.props.scheduleBooked) {
            this.setState({
                scheduleBooked: this.props.scheduleBooked
            })
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getExtraInfoById(this.props.doctorId);
            if (res && res.errCode === 0) {
                if (res.data && res.data.positionData) {
                    this.setState({
                        doctorInformation: res.data,
                        nameVi: `${res.data.positionData.valueVi} - ${res.data.firstName} ${res.data.lastName}`,
                        nameEn: `${res.data.positionData.valueEn} - ${res.data.lastName} ${res.data.firstName}`
                    })
                }
            }
        }
        if (prevProps.genders !== this.props.genders) {
            let result = this.setGenderArr(this.props.genders)
            let genderData = result && result.length > 0 ? result[0].keyMap : '';  // get default value of gender
            this.setState({
                genderOptions: result,
                gender: genderData
            })
        }
        if (prevProps.language !== this.props.language) {
            let result = this.setGenderArr(this.props.genders)
            let genderData = result && result.length > 0 ? result[0].keyMap : '';  // get default value of gender
            this.setState({
                genderOptions: result,
                gender: genderData
            })
        }
    }

    handleChangeData = (e, input) => {
        let copyState = { ...this.state }
        copyState[input] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleChangeSelectDoctor = (gender) => {
        this.setState({ gender })
    };

    handleBooking = async () => {
        console.log(this.state)
        let res = await postBookingAppointment({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            gender: this.state.gender.value,
            reason: this.state.reason,

            doctorId: this.state.doctorInformation.id,
            date: this.state.scheduleBooked.date,
            timeType: this.state.scheduleBooked.timeType,

            doctorName: this.props.language === languages.VI ? this.state.nameVi : this.state.nameEn,
            timeAppoint: this.props.language === languages.VI ? this.state.scheduleBooked.timeTypeData.valueVi : this.state.scheduleBooked.timeTypeData.valueEn,
            language: this.props.language


        })
        if (res && res.errCode === 0) {
            toast.success('Booking appointment with doctor success')
        } else {
            toast.error('Booking appointment with doctor failed')
        }

    }

    render() {
        // console.log(this.props.language)
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                toggle={() => this.props.handleOpenModal()}
                className={'Modal'}
                size={'lg'}
                centered
                backdrop="static"
            >
                <div className='booking-modal-container'>
                    <div className='modal-header'>
                        <ModalHeader toggle={() => this.props.handleOpenModal()}><FormattedMessage id="modal-booking.header"></FormattedMessage></ModalHeader>

                    </div>
                    <div className='modal-body'>
                        <div className='col-12 doctor-information'>
                            <div className='content-up'>
                                <div className='content-left'>
                                    <div className='avatar' style={{ backgroundImage: `url(${this.state.doctorInformation.image})` }}>
                                    </div>
                                </div>

                                <div className='content-right'>
                                    {/* <DoctorInfo isHideDescription="true" isHideDoctorInformation="false" /> */}
                                    <div className='doctor-name'>
                                        {
                                            this.state.nameVi && languages.VI === this.props.language &&
                                            <span>{this.state.nameVi}</span>
                                        }
                                        {
                                            this.state.nameEn && languages.EN === this.props.language &&
                                            <span>{this.state.nameEn}</span>
                                        }
                                    </div>

                                    <div className='date'>
                                        {
                                            this.state.scheduleBooked && this.state.scheduleBooked.timeTypeData && this.state.scheduleBooked.date && languages.VI === this.props.language
                                            && <span>{this.state.scheduleBooked.timeTypeData.valueVi} {this.state.scheduleBooked.date}</span>
                                        }
                                        {
                                            this.state.scheduleBooked && this.state.scheduleBooked.timeTypeData && this.state.scheduleBooked.date && languages.EN === this.props.language
                                            && <span>{this.state.scheduleBooked.timeTypeData.valueEn} {this.state.scheduleBooked.date}</span>
                                        }
                                    </div>
                                    <div className='price'>
                                        <div><FormattedMessage id="modal-booking.price"></FormattedMessage></div>
                                        {
                                            this.state.doctorInformation && this.state.doctorInformation.Doctor_Info && this.state.doctorInformation.Doctor_Info.priceData && languages.VI === this.props.language
                                            && <NumericFormat className='price-display' value={this.state.doctorInformation.Doctor_Info.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                        }
                                        {
                                            this.state.doctorInformation && this.state.doctorInformation.Doctor_Info && this.state.doctorInformation.Doctor_Info.priceData && languages.EN === this.props.language
                                            && <NumericFormat className='price-display' value={this.state.doctorInformation.Doctor_Info.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='row' >
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="modal-booking.firstName"></FormattedMessage></label>
                                <input type='text' className='form-control' value={this.state.name} onChange={(e) => this.handleChangeData(e, "firstName")} />
                            </div>
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="modal-booking.lastName"></FormattedMessage></label>
                                <input type='text' className='form-control' value={this.state.name} onChange={(e) => this.handleChangeData(e, "lastName")} />
                            </div>
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="modal-booking.phoneNumber"></FormattedMessage></label>
                                <input type='text' className='form-control' value={this.state.phoneNumber} onChange={(e) => this.handleChangeData(e, "phoneNumber")} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="modal-booking.email"></FormattedMessage></label>
                                <input type='text' className='form-control' value={this.state.email} onChange={(e) => this.handleChangeData(e, "email")} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="modal-booking.gender"></FormattedMessage></label>
                                <Select
                                    value={this.state.gender}
                                    onChange={this.handleChangeSelectDoctor}
                                    options={this.state.genderOptions}
                                />
                            </div>


                        </div>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="modal-booking.address"></FormattedMessage></label>
                                <input type='text' className='form-control' value={this.state.address} onChange={(e) => this.handleChangeData(e, "address")} />
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="modal-booking.reason"></FormattedMessage></label>
                                <input type='text' className='form-control' onChange={(e) => this.handleChangeData(e, "reason")} />
                            </div>
                        </div>

                    </div>
                    <div className='modal-footer'>
                        <button className='button-save' onClick={() => this.handleBooking()}><FormattedMessage id="modal-booking.submit"></FormattedMessage></button>
                    </div>

                </div>

            </Modal >

        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderRedux: () => dispatch(actions.fetchGenderFirst()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
