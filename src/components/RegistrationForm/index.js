import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onBlurLastName = () => {
    const {lastNameInput} = this.state
    if (lastNameInput !== '') {
      this.setState({showLastNameError: false})
    } else {
      this.setState({showFirstNameError: true})
    }
  }

  onChangeLastName = event => {
    this.setState({
      lastNameInput: event.target.value,
    })
  }

  onBlurFirstName = () => {
    const {firstNameInput} = this.state
    if (firstNameInput !== '') {
      this.setState({showFirstNameError: false})
    } else {
      this.setState({showFirstNameError: true})
    }
  }

  onChangeFirstName = event => {
    this.setState({
      firstNameInput: event.target.value,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {firstNameInput, lastNameInput} = this.state

    if (firstNameInput !== '' && lastNameInput !== '') {
      this.setState({isFormSubmitted: true})
    } else if (firstNameInput === '' && lastNameInput !== '') {
      this.setState({isFormSubmitted: false, showFirstNameError: true})
    } else if (firstNameInput !== '' && lastNameInput === '') {
      this.setState({isFormSubmitted: false, showLastNameError: true})
    } else {
      this.setState({
        showFirstNameError: true,
        showLastNameError: true,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {
      firstNameInput,
      lastNameInput,
      showFirstNameError,
      showLastNameError,
    } = this.state
    const firstName = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    const lastName = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <div className="input-container">
          <label className="input-label" htmlFor="firstName">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            className={firstName}
            value={firstNameInput}
            placeholder="First name"
            onChange={this.onChangeFirstName}
            onBlur={this.onBlurFirstName}
          />
        </div>
        {showFirstNameError && <p className="error-message">Required</p>}
        <div className="input-container">
          <label className="input-label" htmlFor="lastName">
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            className={lastName}
            value={lastNameInput}
            placeholder="Last name"
            onChange={this.onChangeLastName}
            onBlur={this.onBlurLastName}
          />
        </div>
        {showLastNameError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p className="success">Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
