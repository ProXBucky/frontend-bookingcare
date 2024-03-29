import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomePage.scss"
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from "./Section/MedicalFacility"
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import AboutPage from './Section/AboutPage';
import HomeFooter from './HomeFooter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };

        let settings2 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2
        };
        return (
            <div>
                <HomeHeader isHideBanner={false} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <HandBook settings={settings2} />
                <AboutPage />
                <HomeFooter />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
