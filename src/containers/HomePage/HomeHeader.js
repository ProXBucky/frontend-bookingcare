import React, { Component } from 'react';
import { connect } from 'react-redux';
import { languages } from '../../utils'; // language ở redux
import "./HomeHeader.scss"
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import { withRouter } from 'react-router-dom'

class HomeHeader extends Component {

    changeLanguage = (languageTemp) => {
        this.props.changeLanguageRedux(languageTemp)
    }

    handleReturnHome = () => {
        this.props.history.push('/home')
    }

    scrollDown = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth',
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div>
                                <i className="fas fa-bars"></i>
                            </div>
                            <div className='header-logo' onClick={() => this.handleReturnHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='content-child'>
                                <div><b><FormattedMessage id={"homeheader.specialty"} /></b></div>
                                <div className='sub-title'><FormattedMessage id={"homeheader.findDoctor"} /></div>
                            </div>
                            <div className='content-child'>
                                <div><b><FormattedMessage id={"homeheader.facility"} /></b></div>
                                <div className='sub-title'><FormattedMessage id={"homeheader.hospitalChoose"} /> </div>
                            </div>
                            <div className='content-child'>
                                <div><b><FormattedMessage id={"homeheader.doctor"} /></b></div>
                                <div className='sub-title'><FormattedMessage id={"homeheader.doctorChoose"} /></div>
                            </div>
                            <div className='content-child'>
                                <div><b><FormattedMessage id={"homeheader.checkup"} /></b></div>
                                <div className='sub-title'><FormattedMessage id={"homeheader.checkupHealth"} /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <span><FormattedMessage id={"homeheader.support"} /></span>
                            </div>
                            <div className='language'>
                                <div className={this.props.language === 'vi' ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(languages.VI)}>VI</span></div>
                                <div className={this.props.language === 'en' ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.isHideBanner === false &&
                    <div className='home-banner-content'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id={"homebanner.title1"} /></div>
                            <div className='title2'><FormattedMessage id={"homebanner.title2"} /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm phòng khám' />
                            </div>

                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div div className='option-icon'>
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homebanner.child1"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div div className='option-icon'>
                                        <i className="fas fa-mobile"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homebanner.child2"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div div className='option-icon'>
                                        <i className="fas fa-book-open"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homebanner.child3"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div div className='option-icon'>
                                        <i className="fas fa-x-ray"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homebanner.child4"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div div className='option-icon'>
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homebanner.child5"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div div className='option-icon'>
                                        <i className="fas fa-underline"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homebanner.child6"} /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </React.Fragment >
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageRedux(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader))
