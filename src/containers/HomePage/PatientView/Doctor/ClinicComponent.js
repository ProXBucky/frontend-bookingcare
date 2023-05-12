import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ClinicComponent.scss"
import { languages } from "../../../../utils"
import { getDoctorInfoById } from "../../../../services/userService"
import { NumericFormat } from 'react-number-format';


class ClinicComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidePrice: true,
            doctorInformation: [],
        }
    }


    async componentDidMount() {
        let res = await getDoctorInfoById(this.props.doctorId)
        if (res && res.errCode === 0) {
            this.setState({
                doctorInformation: res.data
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getDoctorInfoById(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    doctorInformation: res.data
                })
            }
        }
    }


    handleHidePrice = () => {
        this.setState({
            isHidePrice: !this.state.isHidePrice
        })
    }

    render() {
        let { doctorInformation } = this.state
        console.log(doctorInformation)
        return (
            <div className='clinic-container'>
                <div className='clinic col-12'>
                    <div className='clinic-title'><FormattedMessage id="clinic.address"></FormattedMessage></div>
                    <div className='clinic-information'>
                        {
                            doctorInformation && doctorInformation.nameClinic && <span>{doctorInformation.nameClinic}</span>
                        }
                        <br></br>                        {
                            doctorInformation && doctorInformation.addressClinic && <span>{doctorInformation.addressClinic}</span>
                        }
                    </div>
                </div>

                <div className='price col-12'>
                    {
                        this.state.isHidePrice === true ?
                            <>
                                <b><FormattedMessage id="clinic.price"></FormattedMessage></b>
                                {doctorInformation && doctorInformation.priceData && this.props.language === languages.VI && <NumericFormat value={doctorInformation.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} />}
                                {doctorInformation && doctorInformation.priceData && this.props.language === languages.EN && <NumericFormat value={doctorInformation.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />}
                                <span className='hideShow' onClick={() => this.handleHidePrice()}><FormattedMessage id="clinic.show"></FormattedMessage></span>
                            </>
                            :
                            <>
                                <b><FormattedMessage id="clinic.price"></FormattedMessage></b>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className='price-table'>
                                                    <p><FormattedMessage id="clinic.price"></FormattedMessage></p>
                                                    {doctorInformation && doctorInformation.priceData && this.props.language === languages.VI && <NumericFormat value={doctorInformation.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} />}
                                                    {doctorInformation && doctorInformation.priceData && this.props.language === languages.EN && <NumericFormat value={doctorInformation.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />}
                                                </div>
                                                <div><FormattedMessage id="clinic.title1"></FormattedMessage></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><FormattedMessage id="clinic.title2"></FormattedMessage>{this.props.language === languages.VI ? doctorInformation.paymentData.valueVi : doctorInformation.paymentData.valueEn}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span className='hideShow' onClick={() => this.handleHidePrice()}><FormattedMessage id="clinic.hide"></FormattedMessage></span>
                            </>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicComponent);
