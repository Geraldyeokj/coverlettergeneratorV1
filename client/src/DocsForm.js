import React, {Component} from 'react';
import "./DocsForm.css";

class DocsForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        resume: 'Please copy your resume here (in plaintext)',
        jobDescription:'Please copy the job description here (in plaintext)',
        coverLetter: 'Cover Letter Not Generated'
      };
  
      this.handleResumeChange = this.handleResumeChange.bind(this);
      this.handleJDChange = this.handleJDChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleResumeChange(event) {
      this.setState({resume: event.target.value});
    }

    handleJDChange(event) {
    this.setState({jobDescription: event.target.value});
    }
  
    handleSubmit(event) {
        alert('Cover letter generated based on: ' + this.state.resume + this.state.jobDescription);
        const resumeString = this.state.resume;
        const jobDesciptionString = this.state.jobDescription;
        event.preventDefault();

        fetch('/endpoint1', {
            method: 'POST',
            body: JSON.stringify({
                resume: resumeString,
                jobDescription: jobDesciptionString
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                const coverLetter = response.coverLetter;
                console.log(coverLetter);
                this.setState({coverLetter: coverLetter});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
  
    render() {
      return (
        <div className='Big-div'>
            <div className="Content-div">
                <form className="Form" onSubmit={this.handleSubmit}>
                    <h3>Insert Resume:</h3>
                    <div className='Input-div'>
                        <label className='Label'>
                            <textarea className="Text-area" value={this.state.resume} onChange={this.handleResumeChange} />
                        </label>
                    </div>
                    <h3>Insert Job Description:</h3>
                    <div className='Input-div'>
                        <label className='Label'>
                            <textarea className="Text-area" value={this.state.jobDescription} onChange={this.handleJDChange} />
                        </label>
                    </div>
                    <div>
                        <input className="Submit-button" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
            <div className="Content-div">
                <div className='Form'>
                    <h3>Generated Cover letter:</h3>
                    <textarea rows="27" className="Text-area" value={this.state.coverLetter}/>
                </div>
            </div>
        </div>
      );
    }
  }

export default DocsForm;