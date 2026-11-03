import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onClickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-card">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-sm"
          />
        </Link>
        <ul className="icons-for-mobile-view">
          <Link className="list" to="/">
            <li>
              <MdHome />
            </li>
          </Link>
          <Link className="list" to="/jobs">
            <li>
              <MdHome />
            </li>
          </Link>
          <li>
            <button
              onClick={onClickToLogout}
              className="logout-button"
              type="button"
            >
              <MdHome />
            </button>
          </li>
        </ul>
        <div className="icon-for-desktop-view">
          <ul className="ul-home-jobs">
            <Link className="list" to="/">
              <li className="list">Home</li>
            </Link>
            <Link className="list" to="/jobs">
              <li className="list">Jobs</li>
            </Link>
          </ul>
          <button
            onClick={onClickToLogout}
            className="logout-button-desktop"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
