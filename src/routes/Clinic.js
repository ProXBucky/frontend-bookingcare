import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageClinic from '../containers/System/Admin/Clinic/ManageClinic';

class Clinic extends Component {
    render() {
        return (
            <div className="system-container">
                {this.props.isLoggedIn && <Header />}
                <div className="system-list">
                    <Switch>
                        <Route path="/clinic/manage-clinic" component={ManageClinic} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
