import React, { Component } from 'react';
import { connect } from 'react-redux';
// import "./MedicalFacility.scss"
import { FormattedMessage } from 'react-intl'
import { getAllClinic } from "../../../services/userService"
import { withRouter } from "react-router-dom"

import Slider from "react-slick"
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClinic: [],
            clinicArr: [],
        }
    }

    createClinicArray = () => {
        let result = []
        if (this.state.allClinic && this.state.allClinic.length > 0) {
            this.state.allClinic.map((item) => {
                let obj = {};
                obj.name = item.name
                obj.image = item.image
                obj.id = item.id
                result.push(obj)
            })
        }
        return result
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                allClinic: res.data
            })
        }
        let dataArr = this.createClinicArray();
        this.setState({
            clinicArr: dataArr
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    render() {
        let { clinicArr } = this.state
        return (
            <div div className='section-container medical-facility-content' >
                <div className='content-section'>
                    <div className='section-title'>
                        <span><FormattedMessage id={"section.outstanding-clinic"} /></span>
                        <button><FormattedMessage id={"section.find"} /></button>
                    </div>
                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            {
                                clinicArr && clinicArr.length > 0 &&
                                clinicArr.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('Binary');    //decode image avatar from buffer to base64
                                    }
                                    return (
                                        <div className='slider' key={index} onClick={() => this.handleDetailClinic(item)}>
                                            <div className='image' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <span className='title-slider '>{item.name}</span>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
