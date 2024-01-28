import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="navbar-mobile-container">
          <Link to="/">
            <img
              className="nav-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="navbar-mobile-container">
            <li>
              <Link to="/">
                <AiFillHome className="link-icon" />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsBriefcaseFill className="link-icon" />
              </Link>
            </li>
            <li>
              <button
                className="mobile-button"
                type="button"
                onClick={onClickLogOut}
              >
                <FiLogOut className="link-icon" />a
              </button>
            </li>
          </ul>
        </div>

        <div className="navbar-large-container">
          <Link to="/">
            <img
              className="nav-large-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            className="desktop-button"
            type="button"
            onClick={onClickLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
