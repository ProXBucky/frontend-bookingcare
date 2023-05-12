import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeFooter.scss"

class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <div className='footer-content text-center'>
                    <span> © Welcome to website BookingCare cloned by ProXBucky    </span>
                    <a target='blank' href='https://github.com/ProXBucky'>Visit my github</a>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
