import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageDoctorSchedule.scss"
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { languages, dateFormat } from "../../../utils"
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import _ from "lodash"
import { createBulkSchedule } from "../../../services/userService"



class ManageDoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            selectedDoctor: '',
            dataSelected: '',
            timeSelected: [],
        }
    }

    componentDidMount() {
        this.props.getAllDoctor()
        this.props.getAllcodeSchedule()
    }

    handleSetDoctorOptions = (input) => {
        let allDoctor = []
        input && input.length > 0
            && input.map((item) => {
                let nameVi = `${item.firstName} ${item.lastName}`;
                let nameEn = `${item.lastName} ${item.firstName}`;
                let objDoctor = {}
                objDoctor.value = item.id
                objDoctor.label = languages.VI === this.props.language ? nameVi : nameEn
                allDoctor.push(objDoctor)
            })
        return allDoctor;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            this.setState({
                doctorArr: listDoctor
            })
        }
        if (prevProps.language !== this.props.language) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            this.setState({
                doctorArr: listDoctor
            })
        }
        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            let schedule = this.props.scheduleTime
            if (schedule && schedule.length > 0) {
                schedule = schedule.map(item => {
                    item.isSelected = false;
                    return item
                })
            }
            this.setState({
                schedule: this.props.scheduleTime
            })
        }
    }

    handleToggleTime = (item) => {
        let { schedule } = this.state
        if (schedule && schedule.length > 0) {
            schedule = schedule.map((time) => {
                if (time.id === item.id) {
                    time.isSelected = !time.isSelected
                    return time
                } else {
                    return time
                }
            })
        }
        this.setState({
            schedule: schedule
        })
    }

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    };

    handleChangeDate = (date) => {
        this.setState({
            dataSelected: moment(date[0]).format(dateFormat.SEND_TO_SERVER)
        })
    }

    handleSaveScheduleDoctor = async () => {
        let result = []
        let { schedule, selectedDoctor, dataSelected } = this.state;
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Missing choose doctor');
            return;
        }
        if (!dataSelected) {
            toast.error('Missing choose date');
            return;
        }
        if (schedule && schedule.length > 0) {
            let selectedTime = schedule.filter(time => time.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = dataSelected;
                    obj.timeType = time.keyMap;
                    result.push(obj)
                })
            } else {
                toast.error('Invalid selected time')
            }
        }
        await createBulkSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: dataSelected,
        })


    }

    render() {
        let { schedule } = this.state
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='title my-3'><FormattedMessage id="manage-doctor.title"></FormattedMessage></div>
                    <div className='row up-content'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-doctor.choose-doctor"></FormattedMessage></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelectDoctor}
                                options={this.state.doctorArr}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-doctor.choose-date"></FormattedMessage></label>
                            <DatePicker
                                className="form-control"
                                onChange={(date) => this.handleChangeDate(date)}
                                minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </div>
                    </div>
                    <div className='row down-content'>
                        <div className='col-12 schedule'>
                            {
                                schedule && schedule.length > 0 &&
                                schedule.map((item, index) => {
                                    return (
                                        <button key={index}
                                            onClick={() => this.handleToggleTime(item)}
                                            className={item.isSelected === true ? 'btn active' : 'btn'}
                                        >{languages.VI === this.props.language ? item.valueVi : item.valueEn}</button>
                                    )
                                })

                            }
                        </div>
                        <div className='col-12 btn-outer'>
                            <button className='btn' onClick={() => this.handleSaveScheduleDoctor()}><FormattedMessage id="manage-doctor.save-information"></FormattedMessage></button>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }

}




const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        language: state.app.language,
        scheduleTime: state.admin.scheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getAllcodeSchedule: () => dispatch(actions.getAllcodeSchedule())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctorSchedule);
