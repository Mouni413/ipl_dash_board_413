// Write your code here
import './index.css'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamBannerImage: '',
    latestMatchDetails: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.renderTeamMatches()
  }

  renderTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }
    const {latestMatchDetails, recentMatches, teamBannerUrl} = updatedData
    const updatedLatestMatchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }
    const updatedRecentMatches = recentMatches.map(eachItem => ({
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      date: eachItem.date,
      firstInnings: eachItem.first_innings,
      id: eachItem.id,
      manOfTheMatch: eachItem.man_of_the_match,
      matchStatus: eachItem.match_status,
      result: eachItem.result,
      secondInnings: eachItem.second_innings,
      umpires: eachItem.umpires,
      venue: eachItem.venue,
    }))
    this.setState({
      teamBannerImage: teamBannerUrl,
      latestMatchDetails: updatedLatestMatchDetails,
      recentMatches: updatedRecentMatches,
      isLoading: false,
    })
  }

  renderTeamMatchesContainer = () => {
    const {teamBannerImage, latestMatchDetails, recentMatches} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <>
        <img
          src={teamBannerImage}
          alt="team banner"
          className="team-banner-image"
        />
        <LatestMatch key={id} latestMatchDetails={latestMatchDetails} />
        <div className="team-match-card-container">
          {recentMatches.map(eachItem => (
            <MatchCard key={eachItem.id} matchCardItem={eachItem} />
          ))}
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={`team-background ${id}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatchesContainer()}
      </div>
    )
  }
}

export default TeamMatches
