import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="para">We are sorry</p>
    </div>
  </>
)

export default NotFound
