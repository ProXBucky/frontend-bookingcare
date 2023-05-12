import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { postVerifyingEmail } from "../../../services/userService"

import "./VerifyEmail.scss"
// import { languages } from '../../../../../utils';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVerify: '',
            doctorId: '',
            token: ''
        }
    }
    async componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token')
        const doctorId = query.get('doctorId')
        if (token && doctorId) {
            let res = await postVerifyingEmail({
                doctorId,
                token
            })
            // console.log('check res', res)
            if (res && res.errCode === 0) {
                this.setState({
                    isVerify: true
                })
            }
            if (res && res.errCode === 2 || res.errCode === 3) {
                this.setState({
                    isVerify: false
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { isVerify } = this.state
        console.log(isVerify)
        return (
            <div className='body-container'>
                <HomeHeader />
                {
                    isVerify === true ?
                        <div className='body'>Lịch hẹn đã được xác nhận</div>
                        :
                        <div className='body'>Lịch hẹn đã được xác nhận từ trước hoặc lịch khám không tồn tại!</div>

                }
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
