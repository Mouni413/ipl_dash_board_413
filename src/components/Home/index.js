import './index.css'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teams: [], isLoading: true}

  componentDidMount() {
    this.renderTeamApi()
  }

  renderTeamApi = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const updatedTeams = teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({teams: updatedTeams, isLoading: false})
  }

  renderHomePage = () => {
    const {teams} = this.state
    return (
      <>
        <div className="ipl-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <ul className="team-cards-container">
          {teams.map(eachItem => (
            <TeamCard key={eachItem.id} teamItem={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-background-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderHomePage()
        )}
      </div>
    )
  }
}

export default Home
