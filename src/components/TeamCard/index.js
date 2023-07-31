// Write your code here
import './index.css'

import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamItem} = props
  const {id, name, teamImageUrl} = teamItem
  return (
    <Link className="team-border-none" to={`/team-matches/${id}`}>
      <li className="team-card-container">
        <img src={teamImageUrl} alt={`${name}`} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
