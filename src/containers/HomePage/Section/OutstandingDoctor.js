import React, { Component } from 'react';
import { connect } from 'react-redux';
import { languages } from "../../../utils"
import Slider from "react-slick"
import * as actions from "../../../store/actions"
import { FormattedMessage } from 'react-intl';
import { withRouter } from "react-router-dom";


class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outstandingDoctor: []
        }
    }

    componentDidMount() {
        this.props.getTopDoctorRedux(10);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.topDoctors !== prevProps.topDoctors) {
            this.setState({
                outstandingDoctor: this.props.topDoctors,
            })
        }
    }

    handleDetailDoctor = (item) => {
        this.props.history.push(`/detail-doctor/${item.id}`)
    }


    render() {
        // console.log(this.state)

        return (
            <div className='section-container outstanding-doctor-content'>
                <div className='content-section'>
                    <div className='section-title'>
                        <span><FormattedMessage id={"section.outstanding-doctor"} /></span>
                        <button><FormattedMessage id={"section.find"} /></button>
                    </div>
                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            {
                                this.state.outstandingDoctor && this.state.outstandingDoctor.length > 0
                                && this.state.outstandingDoctor.map((item, index) => {
                                    let nameVi = `${item.positionData.valueVi} - ${item.firstName} ${item.lastName}`
                                    let nameEn = `${item.positionData.valueEn} - ${item.lastName} ${item.firstName}`
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('Binary');    //decode image avatar from buffer to base64
                                    }
                                    return (
                                        <div className='slider' key={index} onClick={() => this.handleDetailDoctor(item)}>
                                            <div className='outer'>
                                                <div className='image'
                                                    style={{ background: `url(${imageBase64}) center center no-repeat` }}
                                                >
                                                </div>
                                                <div className='title-slider text-center'>
                                                    <div className=''>{this.props.language === languages.VI ? nameVi : nameEn}</div>
                                                    <div className=''>Khoa chữa bệnh ngu</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorRedux: (limit) => dispatch(actions.getTopDoctor(limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
