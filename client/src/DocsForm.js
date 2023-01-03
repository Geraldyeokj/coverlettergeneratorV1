import React, {Component} from 'react';
import "./DocsForm.css";

class DocsForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        resume: 'Please copy your resume here (in plaintext)\n\nThe total character count for both your resume and job description should be less than 8750.',
        resumeCount: 0,
        jobDescription:'Please copy the job description here (in plaintext)\n\nThe total character count for both your resume and job description should be less than 8750.',
        jobDescriptionCount: 0,
        coverLetter: 'Cover Letter Not Generated',
        keepResume: false
      };
  
      this.handleResumeChange = this.handleResumeChange.bind(this);
      this.handleJDChange = this.handleJDChange.bind(this);
      this.handleKRChange = this.handleKRChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleResumeChange(event) {
      this.setState({resume: event.target.value});
      this.setState({resumeCount: event.target.value.length});
    }

    handleKRChange(event) {
        this.setState({keepResume: (!this.state.keepResume)});
    }

    handleJDChange(event) {
        this.setState({jobDescription: event.target.value});
        this.setState({jobDescriptionCount: event.target.value.length});
    }
  
    handleSubmit(event) {
        const keepResumeBool = this.state.keepResume;
        if (keepResumeBool) {
            alert("Your cover letter is being generated. This may take up to a minute!");
            const resumeString = this.state.resume;
            const jobDesciptionString = this.state.jobDescription;
            event.preventDefault();

            fetch('/endpoint1', {
                method: 'POST',
                body: JSON.stringify({
                    resume: resumeString,
                    jobDescription: jobDesciptionString,
                    keepResume: keepResumeBool
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
        } else {
            alert("Please tick the checkbox! We'll be honest. Maintaining our cover letter generator costs money (~10 cents a cover letter) and we plan to keep this generator free by collecting user data! Alternatively, you could purchase our premium subscriptions if you would like to support our maintenance fees directly!");
        }
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
                            <div className='charCount'>
                                character count: {this.state.resumeCount}
                            </div>
                        </label>
                    </div>
                    <h3>Insert Job Description:</h3>
                    <div className='Input-div'>
                        <label className='Label'>
                            <textarea className="Text-area" value={this.state.jobDescription} onChange={this.handleJDChange} />
                            <div className='charCount'>
                                character count: {this.state.jobDescriptionCount}
                            </div>
                            <p></p>
                            <div className='charCount'>
                                <b>Total character count: {this.state.jobDescriptionCount + this.state.resumeCount}</b>
                            </div>
                        </label>
                    </div>
                    <div className='Checkbox'>
                        <label>
                            <input type="checkbox" value={this.state.keepResume} onChange={this.handleKRChange}/>
                            I understand that my resume will be used for the training and maintenance of this cover letter generator.
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
                    <textarea rows="27" className="CoverLetter" value={this.state.coverLetter}/>
                </div>
            </div>
        </div>
      );
    }
  }

export default DocsForm;