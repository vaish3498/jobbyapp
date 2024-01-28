const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="skill-item-container">
      <div className="skill-container">
        <img src={imageUrl} className="image" alt={name} />
        <p className="name">{name}</p>
      </div>
    </li>
  )
}

export default SkillsCard
