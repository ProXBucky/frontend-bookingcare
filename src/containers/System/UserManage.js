import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllUser, createUserService, deleteUserService, editUserService } from "../../services/userService"
import ModalCreateNewUser from "./ModalCreateNewUser"
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUser: [],
            isOpen: false,
            isOpenEdit: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let data = await getAllUser('ALL');
        if (data && data.errCode === 0) {
            this.setState({
                allUser: data.user
            })
        }
    }

    toggle = () => {
        this.setState({
            isOpen: false,
            isOpenEdit: false
        })
    }

    handleOpenModal = () => {
        this.setState({
            isOpen: true
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEdit: true,
            userEdit: user
        })

    }

    createUser = async (data) => {
        try {
            let respone = await createUserService(data)
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage)
            }
            else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpen: false,
                })
                emitter.emit('DELETE_DATA_IN_MODAL')  // Xóa data trong modal add user
            }

        } catch (e) {
            console.log(e);
        }
    }

    editUser = async (data) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenEdit: false
                })
            } else {
                alert(res.errMessage)
            }


        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let respone = await deleteUserService(user.id)
            if (respone && respone.errCode === 0) {
                this.getAllUserFromReact();
            } else {
                alert(respone.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        return (
            <>
                <ModalCreateNewUser
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                    createUser={this.createUser}
                />
                {
                    this.state.isOpenEdit &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEdit}
                        toggle={this.toggle}
                        userEdit={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <div className="text-center display-6 mt-2">Manage users with Bucky</div>
                <button className='btn btn-primary mx-3 px-3'
                    onClick={() => this.handleOpenModal()}
                >
                    <i className="fas fa-plus">  Add a new user</i>
                </button>
                <div className='user-table mt-3 mx-2'>
                    <table id='customers'>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.allUser && this.state.allUser.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => this.handleEditUser(item)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>

                                                <button className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>

            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
