import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../../utils"
import './DetailSpecialty.scss'
import HomeHeader from '../../HomeHeader';
import HomeFooter from '../../HomeFooter';
import { getDetailSpecialtyAndDoctorByLocation } from "../../../../services/userService"
import PickScheduleComponent from '../Doctor/PickScheduleComponent';
import ClinicComponent from '../Doctor/ClinicComponent';
import DoctorInfo from '../Doctor/DoctorInfo';
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import { Link } from "react-router-dom"

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyIdFromParam: '',
            specialtyDetail: {},
            doctorsBySpecialty: [],
            arrDoctorId: [],
            provinceArr: [],
        }
    }

    getDoctorBySpecialtyId = async (id) => {
        let respone = await getDetailSpecialtyAndDoctorByLocation(id, 'ALL')
        if (respone && respone.errCode === 0) {
            this.setState({
                arrDoctorId: respone.doctorsBySpecialty
            })
        }
    }

    setAllcodeOptions = (input) => {
        let allCode = []
        let df = {
            value: 'ALL',
            label: languages.VI === this.props.language ? 'Tất cả' : 'All country'
        }
        allCode.push(df)
        if (input[0].type === 'PROVINCE') {
            if (input && input.length > 0) {
                input.map((item) => {
                    let objDoctor = {}
                    objDoctor.value = item.keyMap
                    objDoctor.label = languages.VI === this.props.language ? item.valueVi : item.valueEn
                    allCode.push(objDoctor)
                })
            }
        }
        return allCode;
    }

    async componentDidMount() {
        this.props.getAllcodeProvince();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idSpecialty = this.props.match.params.id;
            await this.getDoctorBySpecialtyId(idSpecialty)
            await this.setState({
                specialtyIdFromParam: idSpecialty
            })
            if (this.state && this.state.arrDoctorId) {
                let result = []
                this.state.arrDoctorId.map((item) => {
                    result.push(item.doctorId)
                })
                this.setState({
                    doctorsBySpecialty: result,
                })
            }
            let res = await getDetailSpecialtyAndDoctorByLocation(idSpecialty, 'ALL')
            if (res && res.errCode === 0) {
                this.setState({
                    specialtyDetail: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.provinceArr !== this.props.provinceArr) {
            let provinceArr = this.setAllcodeOptions(this.props.provinceArr)
            this.setState({
                provinceArr: provinceArr
            })
        }

        if (prevProps.language !== this.props.language) {
            let provinceArr = this.setAllcodeOptions(this.props.provinceArr)
            this.setState({
                provinceArr: provinceArr
            })
        }
    }

    handleChangeProvince = async (selectedOption) => {
        let res = await getDetailSpecialtyAndDoctorByLocation(this.state.specialtyIdFromParam, selectedOption.value)
        if (res && res.errCode === 0) {
            this.setState({
                arrDoctorId: res.doctorsBySpecialty
            })
        }
        if (this.state && this.state.arrDoctorId) {
            let result = []
            this.state.arrDoctorId.map((item) => {
                result.push(item.doctorId)
            })
            this.setState({
                doctorsBySpecialty: result
            })
        }
    }

    render() {
        // console.log('cehck state', this.state)
        let { specialtyDetail, doctorsBySpecialty } = this.state
        return (
            <div className='detail-specialty'>
                <HomeHeader isHideBanner={true} />
                <div className='detail-specialty-body'>
                    <div className='specialty-description'>
                        <h2 className='specialty-name title'>
                            {specialtyDetail.name}
                        </h2>
                        <div className='specialty-extra-information' dangerouslySetInnerHTML={{ __html: specialtyDetail.descriptionHTML }} >
                        </div>
                    </div>

                    <div className="doctor-filter-by-specialty">
                        <Select
                            className='select-province'
                            value={this.state.provinceSelected}
                            onChange={this.handleChangeProvince}
                            options={this.state.provinceArr}
                            placeholder={<FormattedMessage id="doctor-information.province"></FormattedMessage>}
                        />
                        {
                            doctorsBySpecialty && doctorsBySpecialty.length > 0 &&
                            doctorsBySpecialty.map((item, index) => {
                                return (
                                    <div className='container my-4' key={index}>
                                        <div className='content-left'>
                                            <DoctorInfo doctorId={item} isHideDoctorInformation={false} isHideDescription={true} />
                                            <div className='see-more'>
                                                <Link className='see-more-link' to={`/detail-doctor/${item}`} ><FormattedMessage id={"see-more.see"}></FormattedMessage></Link>
                                            </div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='up'>
                                                <PickScheduleComponent doctorId={item} />
                                            </div>
                                            <div className='down'>
                                                <ClinicComponent doctorId={item} />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div >
                <HomeFooter />
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        provinceArr: state.admin.provinceArr,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllcodeProvince: () => dispatch(actions.getAllcodeProvince()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
