import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import CustomScrollBars from '../components/CustomScrollbars';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login'
import System from '../routes/System';
import Doctor from '../routes/Doctor';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './HomePage/PatientView/Doctor/DetailDoctor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './HomePage/PatientView/VerifyEmail';
import Specialty from '../routes/Specialty';
import Clinic from '../routes/Clinic';
import DetailSpecialty from './HomePage/PatientView/Specialty/DetailSpecialty';
import DetailClinic from './HomePage/PatientView/Clinic/DetailClinic';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollBars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.HOMEPAGE} component={(HomePage)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.DETAIL_DOCTOR} component={(DetailDoctor)} />
                                    <Route path={path.VERIFY_APPOINTMENT} component={(VerifyEmail)} />
                                    <Route path={path.SPECIALTY} component={(Specialty)} />
                                    <Route path={path.DETAIL_SPECIALTY} component={(DetailSpecialty)} />
                                    <Route path={path.CLINIC} component={(Clinic)} />
                                    <Route path={path.DETAIL_CLINIC} component={(DetailClinic)} />

                                </Switch>
                            </CustomScrollBars>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>

                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);