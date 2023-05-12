import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
class ModalCreateNewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenEmitter();

    }

    listenEmitter = () => {
        emitter.on('DELETE_DATA_IN_MODAL', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleChangeInput = (event, index) => {
        this.setState({
            [index]: event.target.value
        })

    }

    checkValidate = () => {
        let check = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                alert('Missing parametter' + ' ' + arrInput[i]);
                check = false;
                break;
            }
        }
        return check;
    }

    handleCreateUser = async () => {
        let check = await this.checkValidate();
        if (check === true) {
            await this.props.createUser(this.state);
        }
    }

    render() {
        console.log('render create')
        return (
            < Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.props.toggle() }}
                className={'Modal'}
                size={'lg'}
            >
                <ModalHeader toggle={() => { this.props.toggle() }}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='form-container'>
                            <div className='form-child'>
                                <span>Email</span>
                                <br></br>
                                <input
                                    type='email'
                                    onChange={(event) => { this.handleChangeInput(event, 'email') }}
                                    value={this.state.email}
                                />
                            </div>
                            <div className='form-child'>
                                <span>Password</span>
                                <br></br>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    onChange={(event) => { this.handleChangeInput(event, 'password') }}
                                    value={this.state.password}
                                />
                                <span onClick={() => this.handleShowHidePassword()} className="btn-show-pass">
                                    <i className={this.state.isShowPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className='form-container'>
                            <div className='form-child'>
                                <span>First Name</span>
                                <br></br>
                                <input
                                    type='text'
                                    onChange={(event) => { this.handleChangeInput(event, 'firstName') }}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className='form-child'>
                                <span>Last Name</span>
                                <br></br>
                                <input
                                    type='text'
                                    onChange={(event) => { this.handleChangeInput(event, 'lastName') }}
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>
                        <div className='form-container'>
                            <div className='form-child address-form'>
                                <span>Address</span>
                                <input
                                    type='text'
                                    onChange={(event) => { this.handleChangeInput(event, 'address') }}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-4 btn' color='primary' onClick={() => { this.handleCreateUser() }}>Create new user</Button>
                    <Button className='px-2 btn' color='primary' onClick={() => { this.props.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}




const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateNewUser);
