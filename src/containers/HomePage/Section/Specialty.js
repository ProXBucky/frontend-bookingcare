import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss"
import { FormattedMessage } from 'react-intl'
import { getAllSpecialty } from "../../../services/userService"
import { withRouter } from "react-router-dom";

import Slider from "react-slick"

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSpecialties: [],
            specialtyArr: [],
        }
    }

    createSpecialtyArray = () => {
        let result = []
        if (this.state.allSpecialties && this.state.allSpecialties.length > 0) {
            this.state.allSpecialties.map((item) => {
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
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                allSpecialties: res.data
            })
        }
        let dataArr = this.createSpecialtyArray();
        this.setState({
            specialtyArr: dataArr
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() {
        let { specialtyArr } = this.state
        console.log('check state', this.state)
        return (
            <div className='section-container specialty-content'>
                <div className='content-section'>
                    <div className='section-title'>
                        <span><FormattedMessage id={"section.popular-specialty"} /></span>
                        <button><FormattedMessage id={"section.see-more"} /></button>
                    </div>
                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            {
                                specialtyArr && specialtyArr.length > 0 &&
                                specialtyArr.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('Binary');    //decode image avatar from buffer to base64
                                    }
                                    return (
                                        <div className='slider' key={index} onClick={() => this.handleDetailSpecialty(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
