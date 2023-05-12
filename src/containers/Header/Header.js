import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { languages } from "../../utils";
import { FormattedMessage } from 'react-intl';


class Header extends Component {
    changeLanguageApp = (language) => {
        this.props.changeLanguageRedux(language)
    }

    render() {
        // console.log('check redux user', this.props.userInfo)
        const { processLogout, userInfo, language } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={userInfo.roleId === 'R1' ? adminMenu : doctorMenu} />
                </div>

                <div className='languages'>
                    <span className='welcome'><FormattedMessage id="homeheader.welcome"></FormattedMessage>
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    <span className={language === 'vi' ? 'language-vi active' : 'language-vi'} onClick={() => this.changeLanguageApp(languages.VI)}>VI</span>
                    <span className={language === 'en' ? 'language-en active' : 'language-en'} onClick={() => this.changeLanguageApp(languages.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageRedux(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
