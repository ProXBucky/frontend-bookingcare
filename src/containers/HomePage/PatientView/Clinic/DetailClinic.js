import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../../utils"
import './DetailClinic.scss'
import HomeHeader from '../../HomeHeader';
import HomeFooter from '../../HomeFooter'
import { getDetailClinicById } from "../../../../services/userService"
import { Link } from "react-router-dom"
import DoctorInfo from '../Doctor/DoctorInfo';
import PickScheduleComponent from '../Doctor/PickScheduleComponent';
import ClinicComponent from '../Doctor/ClinicComponent';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicIdFromParam: '',
            clinicDetail: {},
            doctorsByClinic: [],
            arrClinicId: [],
        }
    }

    getDoctorBySpecialtyId = async (id) => {
        let respone = await getDetailClinicById(id)
        if (respone && respone.errCode === 0) {
            this.setState({
                arrClinicId: respone.doctorsByClinic
            })
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idClinic = this.props.match.params.id;
            await this.getDoctorBySpecialtyId(idClinic)
            let res = await getDetailClinicById(+idClinic)
            if (res && res.errCode === 0) {
                this.setState({
                    clinicDetail: res.data
                })
            }
            this.setState({
                clinicIdFromParam: idClinic
            })
            if (this.state && this.state.arrClinicId) {
                let result = []
                this.state.arrClinicId.map((item) => {
                    result.push(item.doctorId)
                })
                this.setState({
                    doctorsByClinic: result,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        let { clinicDetail, doctorsByClinic } = this.state
        let imageBase64 = '';
        if (clinicDetail.image) {
            imageBase64 = Buffer.from(clinicDetail.image, 'base64').toString('Binary');    //decode image avatar from buffer to base64
        }
        return (
            <React.Fragment>
                <HomeHeader isHideBanner={true} />
                <div className='detail-clinic-container' >
                    <div className='clinic-information' style={{ backgroundImage: `url(${imageBase64})` }}>
                        <div className='clinic-outer'>
                            <div className='clinic-logo' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                            <div className='clinic-name-address'>
                                <p className='name'>{clinicDetail.name}</p>
                                <p className='address'>{clinicDetail.address}</p>
                            </div>
                        </div>
                        <div className='extra-information-1'>
                            <p>BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.</p>
                        </div>
                        <div className='extra-information-2'>
                            <p>Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, {clinicDetail.name} thông qua hệ thống đặt khám BookingCare.
                                <li>Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm</li>
                                <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)</li>
                                <li>Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước</li>
                                <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
                            </p>
                        </div>
                    </div>

                    <div className='list-doctors-by-clinic'>
                        {
                            doctorsByClinic && doctorsByClinic.length > 0 &&
                            doctorsByClinic.map((item, index) => {
                                return (
                                    <div className='container-body my-4' key={index}>
                                        <div className='content-left'>
                                            <DoctorInfo doctorId={item} isHideDoctorInformation={false} isHideDescription={true} />
                                            <div className='see-more'>
                                                <Link className='see-more-link' to={`/detail-doctor/${item}`}><FormattedMessage id={"see-more.see"}></FormattedMessage></Link>
                                            </div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='up'>
                                                <PickScheduleComponent doctorId={item} />
                                            </div>
                                            <div className='down'>
                                                <ClinicComponent doctorId={item} />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className='clinic-description container' dangerouslySetInnerHTML={{ __html: clinicDetail.descriptionHTML }}>
                    </div>
                </div >
                <HomeFooter />
            </React.Fragment >
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
