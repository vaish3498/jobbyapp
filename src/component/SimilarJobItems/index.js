import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItems = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-list">
      <div className="logo-title-location-container">
        <div className="logo-title-container">
          <img src={companyLogoUrl} alt="similar" className="logo" />
          <div className="title-location-container">
            <h1 className="heading">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="icon" />
              <p className="para">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="heading">Description</h1>
        <p className="para">{jobDescription}</p>
        <div className="location-employee-container">
          <div className="location-container">
            <MdLocationOn className="icon" />
            <p className="para">{location}</p>
          </div>
          <div>
            <BsFillBriefcaseFill className="icon" />
            <p className="para">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItems
