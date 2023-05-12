import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageDoctorSchedule from '../containers/System/Doctor/ManageDoctorSchedule'
import ManagePatient from '../containers/System/Doctor/ManagePatient';

class Doctor extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                {this.props.isLoggedIn && <Header />}
                <div className="system-list">
                    <Switch>
                        <Route path="/doctor/manage-doctor-schedule" component={ManageDoctorSchedule} />
                        <Route path="/doctor/manage-patient" component={ManagePatient} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
