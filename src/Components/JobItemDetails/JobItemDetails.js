import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header/Header'
import SimilarJobs from '../SimilarJobs/SimilarJobs'
import LoaderComponent from '../LoaderComponent/LoaderComponent'

import './index.css'

const jobItemConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemList: [],
    jobItemStatus: jobItemConstant.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async props => {
    this.setState({jobItemStatus: jobItemConstant.inprogress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'GET',
    }
    const response = await fetch(jobItemUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formattedJobItemData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(eachItem => ({
            imageUrl: eachItem.image_url,
            name: eachItem.name,
          })),
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          rating: eachItem.rating,
          location: eachItem.location,
          title: eachItem.title,
        })),
      }
      console.log(formattedJobItemData)

      this.setState({
        jobItemList: formattedJobItemData,
        jobItemStatus: jobItemConstant.success,
      })
    } else {
      this.setState({jobItemStatus: jobItemConstant.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="Failure view"
      />
      <h1 className="no-feild-heading">Oops! Something Went Wrong</h1>
      <p className="no-feild-caption">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.getJobItemDetails}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => <LoaderComponent />

  renderSuccessView = () => {
    const {jobItemList} = this.state
    const {jobDetails, similarJobs} = jobItemList
    return (
      <>
        <div className="top-section">
          <div className="align-top-section">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="logo"
            />
            <div className="role-container">
              <h1 className="title-name">{jobDetails.title}</h1>
              <div className="rating-container">
                <FaStar className="star" />
                <p className="rating-value">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="lpa-container">
            <div className="loc-type-container">
              <div className="emp-type-container">
                <FaStar className="icons-li" />
                <p className="middle-sec-info">{jobDetails.location}</p>
              </div>
              <div className="emp-type-container">
                <FaStar className="icons-li" />
                <p className="middle-sec-info">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="lpa-annum">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="line2" />
          <a
            href={jobDetails.companyWebsiteUrl}
            target="_blank"
            className="visit-container"
          >
            <h1 className="description">Description</h1>
            <div className="visit-card">
              <p className="visit">Visit</p>
              <FaExternalLinkAlt color="#4f46e5" size={18} />
            </div>
          </a>
          <p className="caption-li">{jobDetails.jobDescription}</p>
          <h1 className="description">Skills</h1>
          <ul className="skill-ul-container">
            {jobDetails.skills.map(eachItem => (
              <li key={eachItem.id} className="skill-list-card">
                <img
                  className="skill-image-icon"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                />
                <p className="skill-list">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="description">Life at Company</h1>
          <div className="life-at-company-display">
            <p className="description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              className="life-at-company-image"
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-ul">
          {similarJobs.map(eachItem => (
            <SimilarJobs key={eachItem.id} eachItem={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderJobItem() {
    const {jobItemStatus} = this.state
    switch (jobItemStatus) {
      case jobItemConstant.inprogress:
        return this.renderLoadingView()
      case jobItemConstant.success:
        return this.renderSuccessView()
      case jobItemConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {jobItemList} = this.state
    console.log(jobItemList)
    return (
      <>
        <Header />
        <div className="job-item-overall-container">
          <div className="job-item-container">
            <div className="job-item-card">{this.renderJobItem()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
