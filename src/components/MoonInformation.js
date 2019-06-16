import React, { Component } from 'react';
import axios from 'axios';

import Ephemeris from './Ephemeris';
import NextFourPhases from './NextFourPhases';
import SkyPosition from './SkyPosition';

import moon_info from '../data/moon_info.json';

class MoonInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            moon_info: moon_info,
            error: false
        }
        this.plusPages = this.plusPages.bind(this);
        this.minusPages = this.plusPages.bind(this);
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
                moon_info: response.data
            })
        })
        .catch((error) => {
            this.setState({
                error: true
            })
            console.log(error.request);
        });            
    }

    minusPages() {
        this.showPages(this.state.pageIndex - 1);
    }

    plusPages() {
        this.showPages(this.state.pageIndex + 1);
    }

    showPages(n) {
        console.log("showPages Page Index: "+ n);
        var i;
        var pages = document.getElementsByClassName('pages');
        console.log("Pages: " + pages.length);
        var dots = document.getElementsByClassName('dot');
        console.log("Dots: " + dots.length);
        if (n > pages.length) {
            n = 1;
        }
        if (n < 1) {
            console.log('Off left end');
            n = pages.length;
        }
        for (i = 0; i < pages.length; i++) {
            console.log('Setting pages');
            pages[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            console.log('Setting dots');
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
                                   moon_info={this.state.moon_info}
                                   error={this.state.error}
                        />
                    </div>
                    <div className="pages">
                        <NextFourPhases />
                    </div>
                    <div className="pages">
                        <SkyPosition />
                    </div>
                    <button className="prev" onClick={this.minusPages}>&#10094;</button>
                    <button className="next" onClick={this.plusPages}>&#10095;</button>
                </div>
                <br />
                <div className="dot-div">
                    <span className="dot" onClick={() => this.showPages(1)}></span>
                    <span className="dot" onClick={() => this.showPages(2)}></span>
                    <span className="dot" onClick={() => this.showPages(3)}></span>
                </div>
            </div>
        );
    }

}

export default MoonInformation;