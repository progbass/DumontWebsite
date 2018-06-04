import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAccordion from '../withAccordion';
import config from '../config';

class Contact extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      errors: [],
      isFormSubmitting: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){

  }
  handleChange(event){
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if(this.state.isFormSubmitting) {
      return false;
    }

    //
    let errors = [];
    const {email, name, message} = this.state;

    if(name.length < 2 || name === ''){
      errors.push({name: 'Please write a valid name.'});
    }
    if (email.length < 2 || email === '') {
      errors.push({
        email: 'Please write a valid email.'
      });
    }
    if (message.length < 2 || message === '') {
      errors.push({
        message: 'Please write your message.'
      });
    }

    // Handle Validation Errors
    if(errors.length){
      this.setState({
        errors: errors,
        isFormSubmitting: false
      });
    
    // Submit Form
    } else {
      this.props.sendContactForm({
        email_txt: email,
        name_txt: name,
        message_txt: message,
      })
      .then(response => {
        console.log('success')
        //this.setState({});
      })
      .catch(error => {
        console.log('error')
        this.setState({
          isFormSubmitting: false
        });
      });

      // Reset errors list
      this.setState({
        errors: [],
        isFormSubmitting: true
      });
    }
  }
  render() {
    const {isOpen} = this.props;
    const {errors} = this.state;
    return (
      <section className="section section--spacing contact">
        <div className="section__module">

          <div className="contact__content">
          <h2 className="title-main">Contact</h2>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form__data">
                <label className="form__label" htmlFor="name_txt">Name</label>
                <input type="text" name="name" id="name_txt" value={this.state.name} onChange={this.handleChange} />
                {errors.find(error => 'name' in error) && <div className="error">Please write a valid name.</div>}  
              </div>
              <div className="form__data">
                <label className="form__label" htmlFor="mail_txt">Email</label>
                <input type="text" name="email" id="mail_txt" value={this.state.email} onChange={this.handleChange} />
                {errors.find(error => 'email' in error) && <div className="error">Please write a valid email.</div>}  
              </div>
              <div className="form__data">
                <label className="form__label" htmlFor="message_txt">Your Message</label>
                <textarea 
                  name="message" 
                  id="message_txt" 
                  rows="7" 
                  onChange={this.handleChange}
                  value={this.state.message} />
                {errors.find(error => 'message' in error) && <div className="error">Please write your message.</div>}  
              </div>
              <div className="form__data">
                <input disabled={this.state.isFormSubmitting} type="submit" name="submit" id="submit_btn" value="Contact Us" />
              </div>
            </form>
          </div>
          
          <div className="contact__map">
            <div className="map">
              <iframe    
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15057.437436256088!2d-99.19313722333992!3d19.353586509745995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8f00bdfdf9db3762!2sDumont!5e0!3m2!1ses-419!2smx!4v1525216310863" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{border: 0}}
                allowFullScreen>
              </iframe>
            </div>

            <div className="contact-units">
              <div className="contact-units__unit">
                <h3 className="title">Address</h3>
                <p className="detail">Av. Insurgentes Sur 1898, piso 21<br/>
                Colonia Florida, 01030 <br/>
                Ciudad de México, México</p>
              </div>
              <div className="contact-units__unit">
                <h3 className="title">Contact Information</h3>
                <p className="detail">
                TEL. <a href="mailto:mail@dumont.com.mx">+52 (55) 5322 6230</a><br/>
                Fax. <a href="mailto:mail@dumont.com.mx">+52 (55) 5661 3056</a><br/>
                E-mail. <a href="mailto:mail@dumont.com.mx">mail@dumont.com.mx</a> </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section__module logo">
          <Link to="/home" >
            <img src={require(`../img/logo-footer.svg`)} className="image--responsive" alt="Dumont Logo" />
          </Link>
        </div>
      </section>
    );
  }
}
export default Contact;
