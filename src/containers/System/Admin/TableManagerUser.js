import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../utils"
import * as actions from '../../../store/actions'
import './TableManagerUser.scss'

// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';
// const mdParser = new MarkdownIt


class TableManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
        }
    }
    componentDidMount() {
        this.props.getAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.users !== prevProps.users) {
            this.setState({
                listUser: this.props.users
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.getEditUser(user)
    }

    // // Finish!
    // handleEditorChange = ({ html, text }) => {
    //     console.log('handleEditorChange :', html, text);
    // }

    render() {
        let { listUser } = this.state;
        return (
            <React.Fragment>
                <table id='customers' className='my-5'>
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
                            listUser && listUser.length > 0 &&
                            listUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>

                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }).reverse()
                        }
                    </tbody >
                </table >
            </React.Fragment>


        )

    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserRedux: () => dispatch(actions.fetchAllUser()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
