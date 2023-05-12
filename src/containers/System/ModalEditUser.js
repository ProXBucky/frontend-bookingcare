import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let currentUser = this.props.userEdit;
        this.setState({
            id: currentUser.id,
            email: currentUser.email,
            password: 'hashPassword',
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            address: currentUser.address,
        })

    }

    handleChangeInput = (event, index) => {
        this.setState({
            [index]: event.target.value
        })

    }

    checkValidate = () => {
        let check = true;
        let arrInput = ['firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                alert('Missing parametter' + ' ' + arrInput[i]);
                check = false;
                break;
            }
        }
        return check;
    }

    handleEditUser = async () => {
        let check = await this.checkValidate()
        if (check === true) {
            await this.props.editUser(this.state)
        }
    }


    render() {
        console.log('check render')
        return (
            < Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.props.toggle() }}
                className={'Modal'}
                size={'lg'}
            >
                <ModalHeader toggle={() => { this.props.toggle() }}>Edit user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='form-container'>
                            <div className='form-child'>
                                <span>Email</span>
                                <br></br>
                                <input
                                    type='email'
                                    //onChange={(event) => { this.handleChangeInput(event, 'email') }}
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                            <div className='form-child'>
                                <span>Password</span>
                                <br></br>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    //onChange={(event) => { this.handleChangeInput(event, 'password') }}
                                    value={this.state.password}
                                    disabled
                                />
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
                    <Button className='px-4 btn' color='primary' onClick={() => { this.handleEditUser() }}>Save changes</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
