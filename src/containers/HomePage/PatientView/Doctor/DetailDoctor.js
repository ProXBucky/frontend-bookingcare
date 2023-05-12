import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../../utils"
import './DetailDoctor.scss'
import HomeHeader from '../../HomeHeader';
import HomeFooter from '../../HomeFooter';
import PickScheduleComponent from './PickScheduleComponent';
import ClinicComponent from './ClinicComponent';
import DoctorInfo from './DoctorInfo';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorIdFromParent: '',
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idDoctor = this.props.match.params.id;
            await this.setState({
                doctorIdFromParent: idDoctor
            })

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { doctorDetail, doctorIdFromParent } = this.state
        return (
            <div className='detail-doctor'>
                <HomeHeader isHideBanner={true} />
                <div className='detail-doctor-container'>
                    <div className='doctor-information'>
                        <DoctorInfo doctorId={doctorIdFromParent} isHideDoctorInformation={false} isHideDescription={true} />
                    </div>
                    <div className='book-calendar'>
                        <div className='schedule'>
                            <PickScheduleComponent doctorId={doctorIdFromParent} />
                        </div>

                        <div className='clinic'>
                            <ClinicComponent doctorId={doctorIdFromParent} />
                        </div>
                    </div>
                    <div className='office'>
                        <DoctorInfo doctorId={doctorIdFromParent} isHideDoctorInformation={true} isHideDescription={false} />
                    </div>
                    <HomeFooter />
                </div>
            </div >
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
