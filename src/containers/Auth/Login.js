import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginAPI } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await handleLoginAPI(this.state.email, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('logging success');
            }

        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    })
                }
            }
            // console.log("error---->", e.response)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row ">
                        <div className="col-12 text-center login-title">Login</div>
                        <div className="col-12 form-group">
                            <label>Email: </label>
                            <input
                                type="text"
                                className="form-control login-input"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={(e) => this.handleChangeEmail(e)}

                            />

                        </div>
                        <div className="col-12 form-group">
                            <label>Password: </label>
                            <div className="login-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control login-input"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleChangePassword(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center login-with mt-3">
                            <span className="">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook social-icon fb"></i>
                            <i className="fab fa-google-plus social-icon gg"></i>
                        </div>
                    </div>
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
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);