import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_METHOD } from "../../../utils"
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import { getDetailDoctorByIdService, getDetailSpecialtyAndDoctorByLocation, getDetailClinicById } from "../../../services/userService"

import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt



class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorSelected: '',
            priceSelected: '',
            paymentSelected: '',
            provinceSelected: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
            specialtySelected: '',
            clinicSelected: '',


            doctorArr: [],
            hasOldData: false,
            action: '',
            priceArr: [],
            paymentArr: [],
            provinceArr: [],
            specialtyArr: [],
            clinicArr: []
        }
    }


    componentDidMount() {
        this.props.getAllDoctor();
        this.props.getAllcodePrice();
        this.props.getAllcodePayment();
        this.props.getAllcodeProvince();
        this.props.getAllSpecialty();
        this.props.getAllClinic();
    }

    handleSetDoctorOptions = (input) => {
        let allDoctor = []
        input && input.length > 0
            && input.map((item, index) => {
                let nameVi = `${item.firstName} ${item.lastName}`;
                let nameEn = `${item.lastName} ${item.firstName}`;
                let objDoctor = {}
                objDoctor.value = item.id
                objDoctor.label = languages.VI === this.props.language ? nameVi : nameEn
                allDoctor.push(objDoctor)
            })

        return allDoctor;
    }

    setAllcodeOptions = (input) => {
        let allCode = []
        if (input[0] && input[0].type === 'PRICE') {
            if (input && input.length > 0) {
                input.map((item, index) => {
                    let objDoctor = {}
                    objDoctor.value = item.keyMap
                    objDoctor.label = languages.VI === this.props.language ? item.valueVi : item.valueEn
                    allCode.push(objDoctor)
                })
            }
        }
        if (input[0] && input[0].type === 'PAYMENT') {
            if (input && input.length > 0) {
                input.map((item, index) => {
                    let objDoctor = {}
                    objDoctor.value = item.keyMap
                    objDoctor.label = languages.VI === this.props.language ? item.valueVi : item.valueEn
                    allCode.push(objDoctor)
                })
            }
        }
        if (input[0] && input[0].type === 'PROVINCE') {
            if (input && input.length > 0) {
                input.map((item, index) => {
                    let objDoctor = {}
                    objDoctor.value = item.keyMap
                    objDoctor.label = languages.VI === this.props.language ? item.valueVi : item.valueEn
                    allCode.push(objDoctor)
                })
            }
        }
        return allCode;
    }

    setOptions = (input) => {
        let result = []
        if (input && input.length > 0) {
            input.map((item) => {
                let objDoctor = {}
                objDoctor.value = item.id
                objDoctor.label = item.name
                result.push(objDoctor)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            this.setState({
                doctorArr: listDoctor
            })
        }
        if (prevProps.priceArr !== this.props.priceArr) {
            let priceArr = this.setAllcodeOptions(this.props.priceArr)
            this.setState({
                priceArr: priceArr
            })
        }
        if (prevProps.paymentArr !== this.props.paymentArr) {
            let paymentArr = this.setAllcodeOptions(this.props.paymentArr)
            this.setState({
                paymentArr: paymentArr
            })
        }
        if (prevProps.provinceArr !== this.props.provinceArr) {
            let provinceArr = this.setAllcodeOptions(this.props.provinceArr)
            this.setState({
                provinceArr: provinceArr
            })
        }
        if (prevProps.specialtyArr !== this.props.specialtyArr) {
            let specialtyArr = this.setOptions(this.props.specialtyArr)
            this.setState({
                specialtyArr: specialtyArr
            })
        }
        if (prevProps.clinicArr !== this.props.clinicArr) {
            let clinicArr = this.setOptions(this.props.clinicArr)
            this.setState({
                clinicArr: clinicArr
            })
        }
        if (prevProps.language !== this.props.language) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            let priceArr = this.setAllcodeOptions(this.props.priceArr)
            let paymentArr = this.setAllcodeOptions(this.props.paymentArr)
            let provinceArr = this.setAllcodeOptions(this.props.provinceArr)
            let specialtyArr = this.setOptions(this.props.specialtyArr)
            let clinicArr = this.setOptions(this.props.clinicArr)

            this.setState({
                doctorArr: listDoctor,
                priceArr: priceArr,
                paymentArr: paymentArr,
                provinceArr: provinceArr,
                specialtyArr: specialtyArr,
                clinicArr: clinicArr
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleChangeMarkdown = async (selectedOption, name) => {
        let copyState = { ...this.state }
        copyState[name.name] = selectedOption;
        await this.setState({
            ...copyState
        })
        if (name.name === 'doctorSelected') {
            let res = await getDetailDoctorByIdService(this.state.doctorSelected.value)
            if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.description) {
                let markdown = res.data.Markdown
                this.setState({
                    description: markdown.description,
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    hasOldData: true,
                })
            }
            else {
                this.setState({
                    description: '',
                    contentHTML: '',
                    contentMarkdown: '',
                    hasOldData: false,
                })
            }

            let resTmp = await getDetailDoctorByIdService(this.state.doctorSelected.value)
            if (resTmp && resTmp.errCode === 0 && resTmp.data && resTmp.data.Doctor_Info && resTmp.data.Doctor_Info.provinceId && resTmp.data.Doctor_Info.specialtyId) {
                let doctorInfo = resTmp.data.Doctor_Info
                let obj4 = {}
                let obj5 = {}
                let res = await getDetailSpecialtyAndDoctorByLocation(resTmp.data.Doctor_Info.specialtyId, 'ALL')
                if (res && res.errCode === 0) {
                    obj4.value = res.data.id;
                    obj4.label = res.data.name;
                }
                let res1 = await getDetailClinicById(resTmp.data.Doctor_Info.clinicId)
                if (res1 && res1.errCode === 0) {
                    obj5.value = res1.data.id;
                    obj5.label = res1.data.name;
                }
                let obj1 = {}
                obj1.value = doctorInfo.provinceData.keyMap;
                obj1.label = this.props.language === languages.VI ? doctorInfo.provinceData.valueVi : doctorInfo.provinceData.valueEn
                let obj2 = {}
                obj2.value = doctorInfo.paymentData.keyMap;
                obj2.label = this.props.language === languages.VI ? doctorInfo.paymentData.valueVi : doctorInfo.paymentData.valueEn
                let obj3 = {}
                obj3.value = doctorInfo.priceData.keyMap;
                obj3.label = this.props.language === languages.VI ? doctorInfo.priceData.valueVi : doctorInfo.priceData.valueEn

                this.setState({
                    priceSelected: obj3,
                    paymentSelected: obj2,
                    provinceSelected: obj1,
                    clinicName: doctorInfo.nameClinic,
                    clinicAddress: doctorInfo.addressClinic,
                    note: doctorInfo.note,
                    specialtySelected: obj4,
                    clinicSelected: obj5,
                })
            }
            else {
                this.setState({
                    priceSelected: '',
                    paymentSelected: '',
                    provinceSelected: '',
                    clinicName: '',
                    clinicAddress: '',
                    note: '',
                    specialtySelected: '',
                    clinicSelected: ''
                })
            }
        }


    };

    handleChangeDescription = (e, input) => {
        let copyState = { ...this.state }
        copyState[input] = e.target.value
        this.setState({ ...copyState })
    }

    handleSaveInfoDoctor = () => {
        // console.log('check state', this.state)
        this.props.postInfoDoctor({
            doctorId: this.state.doctorSelected.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: this.state.hasOldData === true ? CRUD_METHOD.EDIT : CRUD_METHOD.CREATE,
            price: this.state.priceSelected,
            payment: this.state.paymentSelected,
            province: this.state.provinceSelected,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
            specialty: this.state.specialtySelected.value,
            clinic: this.state.clinicSelected.value


        })
        this.setState({
            hasOldData: false,
            doctorSelected: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            priceSelected: '',
            paymentSelected: '',
            provinceSelected: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
            specialty: '',
            clinic: ''
        })

    }

    render() {
        console.log('check prop', this.props.specialtyArr)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><b><FormattedMessage id="doctor-information.title"></FormattedMessage></b></div>
                <div className='manage-doctor-body'>
                    <div className='input-body form-group'>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.choose-doctor"></FormattedMessage></label>
                            <Select
                                value={this.state.doctorSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.doctorArr}
                                placeholder={<FormattedMessage id="doctor-information.choose-doctor"></FormattedMessage>}
                                name="doctorSelected"
                            />
                        </div>
                        <div className='body-right'>
                            <label><FormattedMessage id="doctor-information.extra-information"></FormattedMessage></label>
                            <textarea className='form-control' name="description" value={this.state.description} rows="4" onChange={(e) => this.handleChangeDescription(e, 'description')}>
                            </textarea>
                        </div>
                    </div>

                    <div className='input-body form-group my-2'>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.price"></FormattedMessage></label>
                            <Select
                                value={this.state.priceSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.priceArr}
                                name="priceSelected"
                                placeholder={<FormattedMessage id="doctor-information.price"></FormattedMessage>}
                            />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.payment"></FormattedMessage></label>
                            <Select
                                value={this.state.paymentSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.paymentArr}
                                name="paymentSelected"
                                placeholder={<FormattedMessage id="doctor-information.payment"></FormattedMessage>}
                            />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.province"></FormattedMessage></label>
                            <Select
                                value={this.state.provinceSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.provinceArr}
                                name="provinceSelected"
                                placeholder={<FormattedMessage id="doctor-information.province"></FormattedMessage>}
                            />
                        </div>
                    </div>

                    <div className='input-body optimize form-group my-2'>
                        <div className='col-6'>
                            <label><FormattedMessage id="doctor-information.specialty"></FormattedMessage></label>
                            <Select
                                value={this.state.specialtySelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.specialtyArr}
                                name="specialtySelected"
                                placeholder={<FormattedMessage id="doctor-information.specialty"></FormattedMessage>}
                            />
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id="doctor-information.clinic"></FormattedMessage></label>
                            <Select
                                value={this.state.clinicSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.clinicArr}
                                name="clinicSelected"
                                placeholder={<FormattedMessage id="doctor-information.clinic"></FormattedMessage>}
                            />
                        </div>
                    </div>


                    <div className='input-body form-group'>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.clinic-name"></FormattedMessage></label>
                            <input className='form-control' value={this.state.clinicName} type='text' onChange={(e) => this.handleChangeDescription(e, 'clinicName')} />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.clinic-address"></FormattedMessage></label>
                            <input className='form-control' value={this.state.clinicAddress} type='text' onChange={(e) => this.handleChangeDescription(e, 'clinicAddress')} />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.note"></FormattedMessage></label>
                            <input className='form-control' value={this.state.note} type='text' onChange={(e) => this.handleChangeDescription(e, 'note')} />
                        </div>
                    </div>


                    <div className='markdown'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button className={this.state.hasOldData === true ? 'button-edit-info-doctor' : 'button-save-info-doctor'} onClick={() => this.handleSaveInfoDoctor()}>{this.state.hasOldData === true ? 'Sửa thông tin' : 'Lưu thông tin'}</button>
                </div>


            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        priceArr: state.admin.priceArr,
        paymentArr: state.admin.paymentArr,
        provinceArr: state.admin.provinceArr,
        specialtyArr: state.admin.specialtyArr,
        clinicArr: state.admin.clinicArr,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getAllcodePrice: () => dispatch(actions.getAllcodePrice()),
        getAllcodePayment: () => dispatch(actions.getAllcodePayment()),
        getAllcodeProvince: () => dispatch(actions.getAllcodeProvince()),
        postInfoDoctor: (data) => dispatch(actions.postInfoDoctor(data)),
        getAllSpecialty: () => dispatch(actions.getAllSpecialtyRedux()),
        getAllClinic: () => dispatch(actions.getAllClinicRedux()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
