// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchCardItem} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchCardItem
  console.log(matchCardItem)
  return (
    <li className="match-card-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatus}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
