import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../../utils"
import './DoctorInfo.scss'
import { getDetailDoctorByIdService } from '../../../../services/userService';

class DoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameVi: '',
            nameEn: '',
            doctorDetail: {}
        }
    }


    async componentDidMount() {
        let res = await getDetailDoctorByIdService(this.props.doctorId)
        if (res && res.errCode === 0) {
            if (res.data && res.data.positionData) {
                await this.setState({
                    doctorDetail: res.data,
                    nameVi: `${res.data.positionData.valueVi} - ${res.data.firstName} ${res.data.lastName}`,
                    nameEn: `${res.data.positionData.valueEn} - ${res.data.lastName} ${res.data.firstName}`
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getDetailDoctorByIdService(this.props.doctorId)
            if (res && res.errCode === 0) {
                if (res.data && res.data.positionData) {
                    await this.setState({
                        doctorDetail: res.data,
                        nameVi: `${res.data.positionData.valueVi} - ${res.data.firstName} ${res.data.lastName}`,
                        nameEn: `${res.data.positionData.valueEn} - ${res.data.lastName} ${res.data.firstName}`
                    })
                }
            }
        }
    }

    render() {
        let { doctorDetail } = this.state
        console.log('state', this.state)
        return (
            <React.Fragment>
                {
                    this.props.isHideDoctorInformation === false &&

                    <div className='doctor-information-container'>
                        <div className='image-doctor'>
                            <div className='avatar' style={{ backgroundImage: `url(${doctorDetail.image})` }}></div>
                        </div>
                        <div className='doctor-intro'>
                            {
                                doctorDetail && <div className='name'>{this.props.language === languages.VI ? this.state.nameVi : this.state.nameEn}</div>
                            }
                            {
                                doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.description
                                &&
                                <div className='description'>
                                    {doctorDetail.Markdown.description}
                                </div>
                            }

                        </div>
                    </div>
                }
                {
                    this.props.isHideDescription === false &&
                    <div>
                        {
                            doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: doctorDetail.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>

                }
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
