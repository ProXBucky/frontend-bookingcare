import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManagePatient.scss"
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { languages, dateFormat, CommonUtils } from "../../../utils"
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { getListPatientBooking, postThePrescription } from "../../../services/userService"
import { Modal, ModalHeader } from 'reactstrap';
import ReactLoading from 'react-loading';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSelected: '',
            listPatient: [],
            isOpenModal: false,
            emailModal: '',
            filePrescriptionModal: '',
            inforPatient: {},
            loading: false

        }
    }

    async componentDidMount() {
        let date = moment(new Date).format(dateFormat.SEND_TO_SERVER)
        this.setState({
            dataSelected: date
        })
        let res = await getListPatientBooking(this.props.userInfo.id, date)
        if (res && res.errCode === 0) {
            this.setState({
                listPatient: res.data
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleChangeDate = async (date) => {
        await this.setState({
            dataSelected: moment(date[0]).format(dateFormat.SEND_TO_SERVER)
        })
        let res = await getListPatientBooking(this.props.userInfo.id, this.state.dataSelected)
        if (res && res.errCode === 0) {
            this.setState({
                listPatient: res.data
            })
        }
    }

    handleSendPrescription = (item) => {
        this.setState({
            isOpenModal: true,
            emailModal: item.patientData.email,
            inforPatient: item
        })

    }

    handleOpenModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    handleOnChangeImg = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file); //Chuyển ảnh sang dạng base64
            this.setState({
                filePrescriptionModal: base64
            })
        }
    }

    handleConfirmPrescription = async () => {
        let res = await postThePrescription({
            email: this.state.emailModal,
            doctorId: this.state.inforPatient.doctorId,
            patientId: this.state.inforPatient.patientId,
            filePrescription: this.state.filePrescriptionModal,
            date: this.state.inforPatient.date,
            timeType: this.state.inforPatient.timeType,
            language: this.props.language
        })
        this.setState({
            loading: true
        })
        if (res && res.errCode === 0) {
            toast.success('Exam done')
            this.setState({
                isOpenModal: false,
            })
            let res = await getListPatientBooking(this.props.userInfo.id, this.state.dataSelected)
            if (res && res.errCode === 0) {
                this.setState({
                    listPatient: res.data,
                    loading: false
                })
            }
        } else {
            toast.error('Error from system')
        }
    }



    render() {
        console.log(this.state)
        let { listPatient } = this.state
        return (
            <React.Fragment>
                <div className='manage-patient-container'>
                    <div className='title my-3'><FormattedMessage id="manage-patient.title"></FormattedMessage></div>
                    <div className='row up-content'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-patient.choose-date"></FormattedMessage></label>
                            <DatePicker
                                className="form-control date-pick"
                                value={this.state.dataSelected}
                                onChange={(date) => this.handleChangeDate(date)}
                                minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </div>
                    </div>
                    <div className='row down-content'>
                        <div className='col-12 list-patient'>
                            <table>
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="manage-patient.order"></FormattedMessage></th>
                                        <th><FormattedMessage id="manage-patient.time"></FormattedMessage></th>
                                        <th><FormattedMessage id="manage-patient.name"></FormattedMessage></th>
                                        <th><FormattedMessage id="manage-patient.address"></FormattedMessage></th>
                                        <th><FormattedMessage id="manage-patient.gender"></FormattedMessage></th>
                                        <th><FormattedMessage id="manage-patient.phone"></FormattedMessage></th>
                                        <th><FormattedMessage id="manage-patient.action"></FormattedMessage></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.loading === true ?
                                            <tr>
                                                <td colSpan={7} className='loading-effect' style={{ padding: "0px 45%" }}>
                                                    <ReactLoading type={'bars'} color={'#0071ba'} height={'100px'} width={'100px'} />
                                                </td>
                                            </tr>


                                            :
                                            <>
                                                {
                                                    listPatient && listPatient.length > 0 ?
                                                        listPatient.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{languages.VI === this.props.language ? item.timeTypeData2.valueVi : item.timeTypeData2.valueEn}</td>
                                                                    <td>{item.patientData.firstName} {item.patientData.lastName}</td>
                                                                    <td>{item.patientData.address}</td>
                                                                    <td>{languages.VI === this.props.language ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                                                    <td>{item.patientData.phoneNumber}</td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() => this.handleSendPrescription(item)}
                                                                        ><FormattedMessage id="manage-patient.confirm"></FormattedMessage></button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan="7"><FormattedMessage id="manage-patient.no-data"></FormattedMessage></td>
                                                        </tr>
                                                }
                                            </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.isOpenModal} toggle={() => this.handleOpenModal()} className={'Modal'} centered
                    size={'lg'} backdrop="static" >
                    <div className='booking-modal-container'>
                        <div className='modal-header'>
                            <ModalHeader toggle={() => this.handleOpenModal()}>
                                <FormattedMessage id="manage-patient.title1"></FormattedMessage>
                            </ModalHeader>
                        </div>
                        <div className='modal-body'>
                            <div className='row' >
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="manage-patient.email"></FormattedMessage></label>
                                    <input type='text' className='form-control' value={this.state.emailModal} disabled />
                                </div>
                                <div className='col-4 form-group'>
                                    <label><FormattedMessage id="manage-patient.prescription"></FormattedMessage></label>
                                    <input type='file' className='form-control' onChange={(e) => this.handleOnChangeImg(e)} />
                                </div>
                                <div className='col-2 form-group'>
                                    <button className='form-control' style={{ marginTop: "21px", cursor: "pointer" }} onClick={() => this.handleConfirmPrescription()}>
                                        <FormattedMessage id="manage-patient.confirm"></FormattedMessage>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }

}




const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
