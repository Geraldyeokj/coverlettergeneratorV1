import React, {Component} from 'react';
import "./CLCounter.css";

class CLCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        clcount: 0
      };
    }

    componentDidMount() {
        var count = 0;
        //event.preventDefault();
        fetch('/count')
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                count = (response.coverLetterCount + 100);
                console.log(count);
                this.setState({clcount: count});
            }).catch((err) => {
                console.log(err.message);
            });
      };
    
    render() {
      return (
        <div className='CLCounter'>
            <div>
                <p>Number of cover letters generated so far: </p>
            </div>
            <div className='counterValue'>
                <p><b>{this.state.clcount}</b></p>
            </div>
        </div>
      );
    }
  }

export default CLCounter;