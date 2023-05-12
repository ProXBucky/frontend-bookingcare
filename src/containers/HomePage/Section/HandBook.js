import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import Slider from "react-slick"

class HandBook extends Component {

    render() {
        return (
            <div className='section-container hand-book-content'>
                <div className='content-section'>
                    <div className='section-title'>
                        <span><FormattedMessage id={"section.handbook"} /></span>
                        <button><FormattedMessage id={"section.all-post"} /></button>
                    </div>
                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider'>
                                        <span>Top 7 Bác sĩ sản phụ khoa TPHCM (phần 1)</span>
                                    </div>
                                </div>
                            </div>

                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider'>
                                        <span>Top 7 Bác sĩ sản phụ khoa TPHCM (phần 2)</span>
                                    </div>
                                </div>
                            </div>

                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider'>
                                        <span>Top 7 Bác sĩ sản phụ khoa TPHCM (phần 3)</span>
                                    </div>
                                </div>
                            </div>

                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider'>
                                        <span>Top 7 Bác sĩ sản phụ khoa TPHCM (phần 4)</span>
                                    </div>
                                </div>
                            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
