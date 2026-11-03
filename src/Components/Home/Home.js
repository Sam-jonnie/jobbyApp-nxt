import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import './index.css'

const Home = props => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-section-title">Find The Job That Fits Your Life</h1>
        <p className="home-section-caption">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="find-job-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
