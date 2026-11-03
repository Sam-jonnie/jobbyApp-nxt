import {FaStar} from 'react-icons/fa'
import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  console.log(eachItem)
  return (
    <li className="smilar-job-top-section">
      <div className="align-top-section">
        <img
          src={eachItem.companyLogoUrl}
          alt="similar job company logo"
          className="logo"
        />
        <div className="role-container">
          <h1 className="title-name">{eachItem.title}</h1>
          <div className="rating-container">
            <FaStar className="star" />
            <p className="rating-value">{eachItem.rating}</p>
          </div>
        </div>
      </div>
      <hr className="line2" />
      <h1 className="description">Description</h1>
      <p className="caption-li">{eachItem.jobDescription}</p>
      <div className="lpa-container">
        <div className="loc-type-container">
          <div className="emp-type-container">
            <FaStar className="icons-li" />
            <p className="middle-sec-info">{eachItem.location}</p>
          </div>
          <div className="emp-type-container">
            <FaStar className="icons-li" />
            <p className="middle-sec-info">{eachItem.employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
