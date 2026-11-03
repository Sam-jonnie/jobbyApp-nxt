import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {FiSearch} from 'react-icons/fi'
import LoaderComponent from '../LoaderComponent/LoaderComponent'

import Header from '../Header/Header'
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

const profileApiConstant = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jobApiConstant = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileInfo: {},
    profileStatus: profileApiConstant.initial,
    jobInfo: [],
    employmentType: [],
    minimumPackage: '',
    search: '',
    jobStatus: jobApiConstant.initial,
  }

  getProfileApi = async () => {
    this.setState({profileStatus: profileApiConstant.inprogress})
    const token = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formattedProfileArray = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileInfo: formattedProfileArray,
        profileStatus: profileApiConstant.success,
      })
    } else {
      this.setState({profileStatus: profileApiConstant.failure})
    }
  }

  renderFailureView = () => (
    <button onClick={this.getProfileApi} className="retry-button" type="button">
      Retry
    </button>
  )

  renderSuccessView = () => {
    const {profileInfo} = this.state
    return (
      <div className="profile-banner">
        <img
          className="profile-picture"
          src={profileInfo.profileImageUrl}
          alt="profile"
        />
        <h1 className="profile-name">{profileInfo.name}</h1>
        <p className="profile.bio">{profileInfo.shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => <LoaderComponent />

  getJobApi = async () => {
    this.setState({jobStatus: jobApiConstant.inprogress})
    const {search, employmentType, minimumPackage} = this.state
    const token = Cookies.get('jwt_token')
    const jobApi = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${minimumPackage}&search=${search}`
    console.log(jobApi)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const jobResponse = await fetch(jobApi, options)
    const jobData = await jobResponse.json()
    if (jobResponse.ok) {
      const formattedJobInfo = jobData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(formattedJobInfo)
      this.setState({
        jobStatus: jobApiConstant.success,
        jobInfo: formattedJobInfo,
      })
    } else {
      this.setState({jobStatus: jobApiConstant.failure})
    }
  }

  componentDidMount = () => {
    this.getProfileApi()
    this.getJobApi()
  }

  noJobFound = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-feild-heading">No Jobs Found</h1>
      <p className="no-feild-caption">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="Failure view"
      />
      <h1 className="no-feild-heading">Oops! Something Went Wrong</h1>
      <p className="no-feild-caption">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.getJobApi} className="retry-button" type="button">
        Retry
      </button>
    </div>
  )

  renderJobSuccessView = () => {
    const {jobInfo} = this.state
    const isNoJobInfo = jobInfo.length === 0

    return (
      <>
        {isNoJobInfo ? (
          this.noJobFound()
        ) : (
          <ul className="job-info-container">
            {jobInfo.map(eachItem => (
              <li key={eachItem.id} className="top-section">
                <Link className="link" to={`/jobs/${eachItem.id}`}>
                  <div className="align-top-section">
                    <img
                      src={eachItem.companyLogoUrl}
                      alt="company logo"
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
                  <div className="lpa-container">
                    <div className="loc-type-container">
                      <div className="emp-type-container">
                        <FaStar className="icons-li" />
                        <p className="middle-sec-info">{eachItem.location}</p>
                      </div>
                      <div className="emp-type-container">
                        <FaStar className="icons-li" />
                        <p className="middle-sec-info">
                          {eachItem.employmentType}
                        </p>
                      </div>
                    </div>
                    <p className="lpa-annum">{eachItem.packagePerAnnum}</p>
                  </div>
                  <hr className="line2" />
                  <h1 className="description">Description</h1>
                  <p className="caption-li">{eachItem.jobDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderJobLoadingView = () => <LoaderComponent />

  renderJob = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case jobApiConstant.inprogress:
        return this.renderJobLoadingView()
      case jobApiConstant.success:
        return this.renderJobSuccessView()
      case jobApiConstant.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  userInput = event => {
    this.setState({search: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobApi()
  }

  onEnter = async event => {
    if (event.key === 'Enter') {
      console.log('Entered')
      this.getJobApi()
    }
  }

  onChangeEmploymentType = types => {
    console.log(types.target.id)
    this.setState(
      prev => ({
        employmentType: [...prev.employmentType, types.target.id],
      }),
      this.getJobApi,
    )
  }

  changeSalary = salary => {
    console.log(salary.target.id)
    this.setState({minimumPackage: salary.target.id}, this.getJobApi)
  }

  renderProfile() {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileApiConstant.inprogress:
        return this.renderLoadingView()
      case profileApiConstant.success:
        return this.renderSuccessView()
      case profileApiConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {search} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="align-bg-desktop">
            {this.renderProfile()}
            <hr className="line2" />
            <h1 className="type-range-title">Type of Employment</h1>
            <ul className="emp-type-input">
              {employmentTypesList.map(eachItem => {
                const types = eachItem.employmentTypeId
                return (
                  <li
                    key={eachItem.employmentTypeId}
                    className="radio-container"
                  >
                    <input
                      onChange={this.onChangeEmploymentType}
                      type="checkbox"
                      className="input-category"
                      id={eachItem.employmentTypeId}
                      name="typeOfEmployment"
                      value={eachItem.label}
                      types={eachItem.employmentTypeId}
                    />
                    <label
                      className="label-category"
                      htmlFor="{eachItem.employmentTypeId}"
                    >
                      {eachItem.label}
                    </label>
                  </li>
                )
              })}
            </ul>
            <hr className="line2" />
            <h1 className="type-range-title">Salary Range</h1>
            <ul className="emp-type-input">
              {salaryRangesList.map(eachItem => {
                const salary = eachItem.salaryRangeId
                return (
                  <li key={eachItem.salaryRangeId} className="radio-container">
                    <input
                      onChange={this.changeSalary}
                      type="radio"
                      className="input-category"
                      id={eachItem.salaryRangeId}
                      name="typeOfEmployment"
                      value={eachItem.label}
                      salary={eachItem.salaryRangeId}
                    />
                    <label
                      className="label-category"
                      htmlFor="{eachItem.employmentTypeId}"
                    >
                      {eachItem.label}
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="nav-job-card">
            <div className="search-bar-mobile">
              <input
                value={search}
                onChange={this.userInput}
                onKeyDown={this.onEnter}
                type="search"
                className="input-container"
                placeholder="Search"
              />
              <button
                testid="searchButton"
                className="search-icon"
                onClick={this.onClickSearchIcon}
              >
                <FiSearch />
              </button>
            </div>
            <div className="align-bg-sm">
              {this.renderProfile()}
              <hr className="line2" />
              <h1 className="type-range-title">Type of Employment</h1>
              <ul className="emp-type-input">
                {employmentTypesList.map(eachItem => {
                  const types = eachItem.employmentTypeId
                  return (
                    <li
                      key={eachItem.employmentTypeId}
                      className="radio-container"
                    >
                      <input
                        onChange={this.onChangeEmploymentType}
                        type="checkbox"
                        className="input-category"
                        id={eachItem.employmentTypeId}
                        name="typeOfEmployment"
                        value={eachItem.label}
                        types={eachItem.employmentTypeId}
                      />
                      <label
                        className="label-category"
                        htmlFor="{eachItem.employmentTypeId}"
                      >
                        {eachItem.label}
                      </label>
                    </li>
                  )
                })}
              </ul>
              <hr className="line2" />
              <h1 className="type-range-title">Salary Range</h1>
              <ul className="emp-type-input">
                {salaryRangesList.map(eachItem => (
                  <li key={eachItem.salaryRangeId} className="radio-container">
                    <input
                      onChange={this.onChangeminimumPackage}
                      type="radio"
                      className="input-category"
                      id={eachItem.salaryRangeId}
                      name="typeOfEmployment"
                      value={eachItem.label}
                    />
                    <label
                      className="label-category"
                      htmlFor="{eachItem.salaryRangeId}"
                    >
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {this.renderJob()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
