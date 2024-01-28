import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="logo-title-location-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company-logo"
              className="company-logo-img"
            />
            <div className="title-rating-container">
              <h1 className="heading">{title} </h1>
              <div className="rating-container">
                <BsStarFill className="icon" />
                <p className="para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-employment-container">
              <div className="location-container">
                <MdLocationOn className="icon" />
                <p className="para">{location}</p>
              </div>
              <div className="employment-type-container">
                <BsFillBriefcaseFill className="icon" />
                <p className="para">{employmentType}</p>
              </div>
            </div>
            <p className="para">{packagePerAnnum}</p>
          </div>
          <div>
            <hr className="line" />
            <h1 className="heading">Description</h1>
            <p className="para">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
