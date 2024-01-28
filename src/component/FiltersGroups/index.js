import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroups = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div>
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          id="searchButton"
          className="button"
          onClick={getJobs}
        >
          <BsSearch className="icon" />a
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="employment-type-container">
        <h1 className="heading">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachItem => {
            const {changeEmploymentList} = props
            const onSelectEmploymentType = event => {
              changeEmploymentList(event.target.value)
            }
            return (
              <li
                className="employment-list"
                key={eachItem.employmentTypeId}
                onChange={onSelectEmploymentType}
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  key={eachItem.employmentTypeId}
                  value={eachItem.employmentTypeId}
                />
                <label htmlFor={eachItem.employmentTypeId} className="label">
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-range-container">
        <h1 className="heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachItem => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachItem.salaryRangeId)
            }
            return (
              <li
                className="employment-list"
                key={eachItem.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  className="radio"
                  id={eachItem.salaryRangeId}
                  name="salary"
                />
                <label htmlFor={eachItem.salaryRangeId} className="label">
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filter-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="line" />
      {renderTypeOfEmployment()}
      <hr className="line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroups
