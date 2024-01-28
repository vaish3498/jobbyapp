import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItems from '../SimilarJobItems'
import './index.css'

const apiStateConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    JobDataDetails: [],
    similarJobData: [],
    apiState: apiStateConstant.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiState: apiStateConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobDetails = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobDetails)
    if (responseJobData.ok === true) {
      const fetchJobData = await responseJobData.json()
      const updatedJobDetails = [fetchJobData.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachItem.title,
      }))

      const updatedSimilarJobDetails = fetchJobData.similar_jobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }),
      )
      this.setState({
        JobDataDetails: updatedJobDetails,
        similarJobData: updatedSimilarJobDetails,
        apiState: apiStateConstant.success,
      })
    } else {
      this.setState({
        apiState: apiStateConstant.failure,
      })
    }
  }

  renderJobDetailsSuccessView = () => {
    const {JobDataDetails, similarJobData} = this.state
    if (JobDataDetails >= 1) {
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
      } = JobDataDetails[0]

      return (
        <>
          <div className="job-item-container">
            <div className="first-part-container">
              <div className="image-container">
                <img className="image" src={companyLogoUrl} alt="job" />
                <div className="title-container">
                  <h1 className="title">{title}</h1>
                  <div className="start-rating-container">
                    <AiFillStar className="icon" />
                    <p className="para">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-container">
                <div className="location-job-container">
                  <div className="location-icon-container">
                    <MdLocationOn className="icon" />
                    <p className="para">{location}</p>
                  </div>
                  <div className="package-container">
                    <p className="para">{packagePerAnnum}</p>
                  </div>
                </div>
              </div>
              <hr className="line" />
              <div className="second-part-container">
                <div className="description-job-container">
                  <h1 className="heading">Description</h1>
                  <a className="visit-anchor" href={companyWebsiteUrl}>
                    Visit
                    <BiLinkExternal />
                  </a>
                </div>
                <p className="para">{jobDescription}</p>
              </div>
              <h1 className="heading">Skills</h1>
              <ul className="job-details-list-container">
                {skills.map(eachItem => (
                  <li className="job-details-list">
                    <img
                      src={eachItem.imageUrl}
                      className="skill-img"
                      alt={eachItem.name}
                    />
                    <p>{eachItem.name}</p>
                  </li>
                ))}
              </ul>
              <div className="company-life-container">
                <div className="company-life-para-container">
                  <h1 className="heading">Life</h1>
                  <p className="para">{lifeAtCompany.description}</p>
                </div>
                <img src={lifeAtCompany.imageUrl} alt="life" />
              </div>
            </div>
            <h1 className="heading">Similar Job</h1>
            <ul>
              {similarJobData.map(eachItem => (
                <SimilarJobItems
                  key={eachItem.id}
                  similarJobData={eachItem}
                  employmentType={employmentType}
                />
              ))}
            </ul>
          </div>
        </>
      )
    }
    return null
  }

  onRetryJobDetailsAgain = () => {
    this.getJobData()
  }

  renderFailureJobView = () => (
    <div className="failure-job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="heading">oops</h1>
      <p className="para">We</p>
      <div className="failure-button">
        <button
          className="button"
          onClick={this.onRetryJobDetailsAgain}
          type="button"
        >
          retry
        </button>
      </div>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiStateConstant.success:
        return this.renderJobDetailsSuccessView()
      case apiStateConstant.failure:
        return this.renderFailureJobView()
      case apiStateConstant.inProgress:
        return this.renderJobLoadingView()
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

export default AboutJobItem
