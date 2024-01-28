import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobItems from '../SimilarJobItems'
import SkillsCard from '../SkillsCard'

import './index.css'

const apiStateConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: [],
    similarJobData: [],
    apiState: apiStateConstant.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSimilarData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    title: data.title,
  })

  getJobData = async () => {
    this.setState({apiState: apiStateConstant.initial})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = this.getFormattedData(data.job_details)
      const updateSimilarJobData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      console.log(updateData)
      console.log(updateSimilarJobData)
      this.setState({
        jobData: updateData,
        similarJobData: updateSimilarJobData,
        apiState: apiStateConstant.success,
      })
    } else {
      this.setState({apiState: apiStateConstant.failure})
    }
  }

  renderFailureView = () => (
    <div className="job-item-error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Oops</h1>
      <p className="failure-view-para">We</p>
      <button
        type="button"
        id="button"
        className="failure-view-button"
        onClick={this.getJobData}
      >
        Retry
      </button>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-details-view-container">
        <div className="job-item">
          <div className="logo-title-location-container">
            <div className="logo-title-container">
              <img src={companyLogoUrl} className="company-logo" alt="job" />
              <div className="title-rating-container">
                <h1 className="heading">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="icon" />
                  <p className="para">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-employee-container">
                <div className="location-container">
                  <MdLocationOn className="icon" />
                  <p className="para">{location}</p>
                </div>
                <div className="employee-type-container">
                  <BsFillBriefcaseFill className="icon" />
                  <p className="para">{employmentType}</p>
                </div>
              </div>
              <p className="para">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="description-container">
            <h1 className="heading">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit">
                Visit
              </a>
              <BiLinkExternal className="icon" />
            </div>
          </div>
          <p className="para">{jobDescription}</p>
          <h1 className="skills">Skills</h1>
          <ul className="skill-list-container">
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="heading">Life of Company</h1>
          <div className="life-of-company-img-container">
            <p className="para">{description}</p>
            <img src={imageUrl} alt="life" className="life-of-company-img" />
          </div>
        </div>
        <h1 className="heading">Similar Job</h1>
        <ul>
          {similarJobData.map(eachSimilarJob => (
            <SimilarJobItems
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiStateConstant.success:
        return this.renderJobDetailsView()
      case apiStateConstant.inProgress:
        return this.renderJobLoadingView()
      case apiStateConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="app-container">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
