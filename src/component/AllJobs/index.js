import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItemDetails from '../JobItemDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStateConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobStateConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkBoxInput: [],
    radioInput: '',
    searchInput: '',
    apiState: apiJobStateConstant.initial,
    apiJobState: apiJobStateConstant.initial,
  }

  componentDidMount() {
    this.onGetProfileDetails()
    this.onGetJobDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({apiState: apiStateConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const profileOption = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(profileApiUrl, profileOption)
    if (responseProfile.ok === true) {
      const fetchedDataProfile = [await responseProfile.json()]
      const updatedDataProfile = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profile_image_url: eachItem.profile_details.profile_image_url,
        short_bio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedDataProfile,
        responseSuccess: true,
        apiState: apiJobStateConstant.success,
      })
    } else {
      this.setState({
        apiState: apiStateConstant.failure,
      })
    }
  }

  onGetJobDetails = async () => {
    this.setState({apiJobState: apiJobStateConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkBoxInput, radioInput, searchInput} = this.state
    const apiJobUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJobs = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobs = await fetch(apiJobUrl, optionsJobs)
    if (responseJobs.ok === true) {
      const fetchedJobsData = await responseJobs.json()
      const updatedJobData = fetchedJobsData.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedJobData,
        apiJobState: apiJobStateConstant.success,
      })
    } else {
      this.setState({apiJobState: apiJobStateConstant.failure})
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.value}, this.onGetJobDetails)
  }

  onGetInputOption = event => {
    const {checkBoxInput} = this.state
    const inputNotInList = checkBoxInput.filter(
      eachInput => eachInput === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkBoxInput: [...prevState.checkBoxInput, event.target.id],
        }),
        this.onGetJobDetails,
      )
    } else {
      const filteredData = checkBoxInput.filter(
        eachItem => eachItem !== event.target.id,
      )

      this.setState({checkBoxInput: filteredData}, this.onGetJobDetails)
    }
  }

  onGetProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div>
          <img src={profileImageUrl} className="profile-image" alt="profiles" />
          <h1 className="name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.onGetProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryProfile}
      >
        retry
      </button>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRenderProfileStatus = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiStateConstant.success:
        return this.onGetProfileView()
      case apiStateConstant.failure:
        return this.onGetProfileFailureView()
      case apiStateConstant.inProgress:
        return this.renderJobLoadingView()

      default:
        return null
    }
  }

  onRetryJob = () => {
    this.onGetJobDetails()
  }

  onGetFailureJobView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops</h1>
      <p className="failure-view-para">We</p>
      <button
        className="failure-view-button"
        type="button"
        onClick={this.onRetryJob}
      >
        Retry
      </button>
    </div>
  )

  onGetJobView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0

    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">Oops</h1>
        <p className="no-jobs-para">We</p>
      </div>
    ) : (
      <ul className="no-jobs-list">
        {jobsData.map(eachItem => (
          <JobItemDetails key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    )
  }

  onRenderJobStatus = () => {
    const {apiJobState} = this.state

    switch (apiJobState) {
      case apiJobStateConstant.success:
        return this.onGetJobView()
      case apiJobStateConstant.failure:
        return this.onGetFailureJobView()
      case apiJobStateConstant.inProgress:
        return this.renderJobLoadingView()

      default:
        return null
    }
  }

  onGetCheckBoxView = () => (
    <ul className="check-box-list">
      {employmentTypesList.map(eachItem => (
        <li>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetInputOption}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonView = () => (
    <ul>
      {salaryRangesList.map(eachItem => (
        <li className="salary-list" key={eachItem.salaryRangeId}>
          <input
            className="radio"
            id={eachItem.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.onGetCheckBoxView}
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.onGetJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onGetJobDetails()
    }
  }

  render() {
    const {checkBoxInput, radioInput, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-job-container">
          <div className="side-bar-container">
            {this.onRenderProfileStatus()}
            <hr className="line" />
            <h1 className="heading">Type of Employment</h1>
            {this.onGetCheckBoxView()}
            <hr className="line" />
            <h1 className="heading">Salary Range</h1>
            {this.onGetRadioButtonView()}
          </div>
          <div className="job-container">
            <div>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onGetSearchInput()}
                onKeyDown={this.onEnterSearchInput()}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSubmitSearchInput()}
              >
                <AiOutlineSearch className="icon" />a
              </button>
            </div>
            {this.onRenderJobStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs
