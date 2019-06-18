import React, { Component } from 'react';
import axios from 'axios';

import Ephemeris from './Ephemeris';
import NextFourPhases from './NextFourPhases';
import PhaseAndLibration from './PhaseAndLibration';
import SkyPosition from './SkyPosition';

import moonInfo from '../data/moonInfo.json';

class MoonInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            moonInfo: moonInfo,
            error: false
        }
        this.plusPages = this.plusPages.bind(this);
        this.minusPages = this.minusPages.bind(this);
        this.showPages = this.showPages.bind(this);
    }

    componentDidMount() {
        this.showPages(this.state.pageIndex);

        const config = {
            url: 'https://lct-web-stage.herokuapp.com/moon_info',
            params: {
                date: this.props.date,
                tz: this.props.timezone,
                lat: this.props.latitude,
                lon: this.props.longitude
            }
        }
        axios(config).then((response) => {
            this.setState({
                moonInfo: response.data
            })
        })
        .catch((error) => {
            this.setState({
                error: true
            })
        });            
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date || 
            prevProps.timezone !== this.props.timezone ||
            prevProps.latitude !== this.props.latitude ||
            prevProps.longitude !== this.props.longitude
            ) {
                const config = {
                    url: 'https://lct-web-stage.herokuapp.com/moon_info',
                    params: {
                        date: this.props.date,
                        tz: this.props.timezone,
                        lat: this.props.latitude,
                        lon: this.props.longitude
                    }
                }
                axios(config).then((response) => {
                    this.setState({
                        moonInfo: response.data
                    })
                })
                .catch((error) => {
                    this.setState({
                        error: true
                    })
                }); 
        }
    }

    minusPages() {
        this.showPages(this.state.pageIndex - 1);
    }

    plusPages() {
        this.showPages(this.state.pageIndex + 1);
    }

    showPages(n) {
        var i;
        var pages = document.getElementsByClassName('pages');
        var dots = document.getElementsByClassName('dot');
        if (n > pages.length) {
            n = 1;
        }
        if (n < 1) {
            n = pages.length;
        }
        for (i = 0; i < pages.length; i++) {
            pages[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("active", "");
        }
        pages[n - 1].style.display = "block";
        dots[n - 1].className += " active";
        this.setState({ pageIndex: n });
    }

    render() {
        return (
            <div>
                <div className="pages-container">
                    <div className="pages">
                        <Ephemeris datetime={this.props.date}
                                   timezone={this.props.timezone}
                                   latitude={this.props.latitude}
                                   longitude={this.props.longitude}
                                   moonInfo={this.state.moonInfo}
                                   error={this.state.error}
                        />
                    </div>
                    <div className="pages">
                        <NextFourPhases timezone={this.props.timezone}
                                        moonInfo={this.state.moonInfo}
                                        error={this.state.error}
                        />
                    </div>
                    <div className="pages">
                        <PhaseAndLibration moonInfo={this.state.moonInfo}
                                           error={this.state.error}
                        />
                    </div>
                    <div className="pages">
                        <SkyPosition moonInfo={this.state.moonInfo}
                                     error={this.state.error}
                        />
                    </div>
                    <button className="prev" onClick={this.minusPages}>&#10094;</button>
                    <button className="next" onClick={this.plusPages}>&#10095;</button>
                </div>
                <br />
                <div className="dot-div">
                    <span className="dot" onClick={() => this.showPages(1)}></span>
                    <span className="dot" onClick={() => this.showPages(2)}></span>
                    <span className="dot" onClick={() => this.showPages(3)}></span>
                    <span className="dot" onClick={() => this.showPages(4)}></span>
                </div>
            </div>
        );
    }
}

export default MoonInformation;