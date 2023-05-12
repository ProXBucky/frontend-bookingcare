import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./PickScheduleComponent.scss"
import moment from 'moment/moment';
import { languages, dateFormat } from "../../../../utils"
import { getScheduleByDoctorIdAndTime } from "../../../../services/userService"
import BookingModal from './Modal/BookingModal';


class PickScheduleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateArr: [],
            scheduleAvailable: [],
            isOpenModal: false,
            scheduleBooked: {}

        }
    }
    upperCaseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    arrDateByLanguage = (language) => {
        let arrDate = []
        if (language === languages.VI) {
            for (let i = 0; i < 7; i++) {
                let obj = {}
                if (i === 0) {
                    let label = moment(new Date()).add(i, 'days').format('DD/MM')
                    obj.label = 'Hôm nay - ' + label
                    let value = moment(new Date()).add(i, 'days').startOf('day')
                    obj.value = value.format(dateFormat.SEND_TO_SERVER);
                }
                else {
                    let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    obj.label = this.upperCaseFirstLetter(label)
                    let value = moment(new Date()).add(i, 'days').startOf('day')
                    obj.value = value.format(dateFormat.SEND_TO_SERVER);
                }
                arrDate.push(obj)
            }
        }
        else {
            for (let i = 0; i < 7; i++) {
                let obj = {}
                if (i === 0) {
                    let label = moment(new Date()).add(i, 'days').format('DD/MM')
                    obj.label = 'Today - ' + label
                    let value = moment(new Date()).add(i, 'days').startOf('day')
                    obj.value = value.format(dateFormat.SEND_TO_SERVER);
                }
                else {
                    let label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                    obj.label = label
                    let value = moment(new Date()).add(i, 'days').startOf('day')
                    obj.value = value.format(dateFormat.SEND_TO_SERVER);
                }
                arrDate.push(obj)
            }

        }
        return arrDate
    }

    async componentDidMount() {
        let arrDate = await this.arrDateByLanguage(this.props.language)
        this.setState({
            dateArr: arrDate
        })
        let res = await getScheduleByDoctorIdAndTime(this.props.doctorId, this.state.dateArr[0].value)
        this.setState({
            scheduleAvailable: res.data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let arrDate = await this.arrDateByLanguage(this.props.language)
            this.setState({
                dateArr: arrDate
            })
            let res = await getScheduleByDoctorIdAndTime(this.props.doctorId, this.state.dateArr[0].value)
            this.setState({
                scheduleAvailable: res.data
            })
        }
    }

    handleChangeDate = async (e) => {
        let res = await getScheduleByDoctorIdAndTime(this.props.doctorId, e.target.value)
        if (res && res.errCode === 0) {
            this.setState({
                scheduleAvailable: res.data
            })
        }
    }

    handleBookingSchedule = async (item) => {
        await this.setState({
            isOpenModal: !this.state.isOpenModal,
            scheduleBooked: item
        })
    }

    render() {
        let { dateArr, scheduleAvailable } = this.state
        let { language } = this.props
        return (
            <div className='schedule-container'>
                <div className='select-schedule-calendar'>
                    <select onChange={(e) => this.handleChangeDate(e)}>
                        {
                            dateArr && dateArr.length > 0
                            && dateArr.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <span><i className="fas fa-calendar calendar-title"></i> <FormattedMessage id="pick-component.schedule-title"></FormattedMessage></span>
                <div className='pick-schedule'>
                    {
                        scheduleAvailable && scheduleAvailable.length > 0 ?
                            <>
                                {
                                    scheduleAvailable.map((item, index) => {
                                        return (
                                            <button key={index} onClick={() => this.handleBookingSchedule(item)}>{languages.VI === language ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</button>
                                        )
                                    })
                                }
                                <br></br>
                                <div className='sub-title'><FormattedMessage id="pick-component.extra-title1"></FormattedMessage> <span><i className="fas fa-hand-point-up"></i></span> <FormattedMessage id="pick-component.extra-title2"></FormattedMessage></div>
                            </>
                            :
                            <div>
                                <FormattedMessage id="pick-component.no-schedule"></FormattedMessage>
                            </div>
                    }
                </div>
                <BookingModal doctorId={this.props.doctorId} isOpenModal={this.state.isOpenModal} handleOpenModal={this.handleBookingSchedule} scheduleBooked={this.state.scheduleBooked} />
            </div>
        )
    }

}




const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickScheduleComponent);
