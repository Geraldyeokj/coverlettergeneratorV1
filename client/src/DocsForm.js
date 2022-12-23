import React, {Component} from 'react';

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
      this.setState({resume: event.target.resume});
    }

    handleJDChange(event) {
    this.setState({jobDescription: event.target.jobDescription});
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
                this.setState({coverLetter: JSON.stringify(response)});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
  
    render() {
      return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <h3>Insert Resume:</h3>
                <div>
                    <label>
                        <textarea value={this.state.resume} onChange={this.handleResumeChange} />
                    </label>
                </div>
                <h3>Insert Job Description:</h3>
                <div>
                    <label>
                        <textarea value={this.state.jobDescription} onChange={this.handleJDChange} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
            <div>
                <h3>Generated Cover letter:</h3>
                <textarea value={this.state.coverLetter}/>
            </div>
        </div>
      );
    }
  }

export default DocsForm;