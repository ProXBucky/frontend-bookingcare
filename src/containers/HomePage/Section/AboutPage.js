import React, { Component } from 'react';
import { connect } from 'react-redux';
// import "./AboutPage.scss"
import { FormattedMessage } from 'react-intl'


class AboutPage extends Component {

    render() {
        return (
            <div className='section-container about-page-content'>
                <div className='content-section'>
                    <div className='section-title'>
                        <span><FormattedMessage id={"section.media"} /></span>
                    </div>
                    <div className='section-body'>
                        <div className='body-left'>
                            <iframe width="100%" height="320px"
                                src="https://www.youtube.com/embed/d8zgdc4Ztuo"
                                title="Patrick Patrikios | Oh My" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>

                        </div>
                        <div className='body-right'>
                            <span>Headphones  https://shp.pub/6ivnph <br></br>
                                Speakers  https://shp.pub/6ivnz0 <br></br>
                                HIFI Devices  https://shp.pub/6gt2qd <br></br>
                                You're free to use this song and monetize your video. <br></br>
                                Artist: Patrick Patrikios | Track: Oh My <br></br>
                                Download MP3 - https://hypeddit.com/9ehkn1 <br></br>
                                Pop | Happy <br></br>
                                Patrick Patrikios playlist: <br></br>
                                • Patrick Patrikios <br></br>
                                Pop music playlist: <br></br>
                                • Pop music <br></br>
                                Happy music playlist: <br></br>
                                • Happy music <br></br>
                            </span>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
