/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable global-require */

/* global Koji */

import React, { Component } from 'react'

export function getFontFamily(ff) {
  const start = ff.indexOf('family=')
  if (start === -1) return 'sans-serif'
  let end = ff.indexOf('&', start)
  if (end === -1) end = undefined
  return ff.slice(start + 7, end)
}

class MainMenu extends Component {
  background = Koji.config.images.background
    ? `url(${Koji.config.images.background})`
    : Koji.config.colors.backgroundColor

  constructor(props) {
    super(props)

    this.startGame = this.startGame.bind(this)

    this.state = {
      font: 'Arial',
      playerName: Koji.config.strings.defaultPlayerName,
      roomName: Koji.config.strings.defaultRoomName,
      chosenImage: '',
    }
  }

  componentDidMount() {
    const link = document.createElement('link')
    link.href = Koji.config.strings.fontFamily
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    let newFont = getFontFamily(Koji.config.strings.fontFamily)
    const newStr = newFont.replace('+', ' ')
    newFont = newStr

    let imageLink = Koji.config.images.player
    if (localStorage.getItem('chosenImageLink')) {
      imageLink = localStorage.getItem('chosenImageLink')
    }

    this.setState({ font: newFont, chosenImage: imageLink })
    document.body.style.fontFamily = newFont

    try {
      document.getElementById('p5_loading').style.display = 'none'
    } catch (error) {
      //
    }

    let roomName = Koji.config.strings.defaultRoomName
    if (localStorage.getItem('roomName')) {
      roomName = localStorage.getItem('roomName')
    }

    let _playerName = Koji.config.strings.defaultPlayerName
    if (localStorage.getItem('playerName')) {
      _playerName = localStorage.getItem('playerName')
    }

    this.setState({
      roomName,
      playerName: _playerName,
    })
  }

  componentWillUnmount() {}

  openLeaderboard = () => {
    window.setAppView('leaderboard')
  }

  openCharacterPicker = () => {
    window.setAppView('characterPicker')
  }

  detectMobile = () => {
    // KEEP THE SEMICOLONS TO VOID ASI
    let check = false

    ;(function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true
    })(navigator.userAgent || navigator.vendor || window.opera)

    return check
  }

  startGame() {
    localStorage.setItem('roomName', this.state.roomName.toLowerCase())
    localStorage.setItem('playerName', this.state.playerName)

    window.setAppView('game')
  }

  handleSubmit() {
    this.startGame()
  }

  render() {
    return (
      <div
        id="main-menu"
        style={{
          background: this.background,
          color: Koji.config.colors.titleColor,
          backgroundSize: '',
        }}
      >
        <div>
          <div
            className="title"
            style={{ color: Koji.config.colors.titleColor }}
          >
            {Koji.config.strings.title}
          </div>

          <br />

          <div>
            <div
              className="instructions"
              style={{ color: Koji.config.colors.instructionsColor }}
            >
              {this.detectMobile()
                ? Koji.config.strings.mobile_instructions1
                : Koji.config.strings.desktop_instructions1}
            </div>
            <div
              className="instructions"
              style={{ color: Koji.config.colors.instructionsColor }}
            >
              {this.detectMobile()
                ? Koji.config.strings.mobile_instructions2
                : Koji.config.strings.desktop_instructions2}
            </div>
            <div
              className="instructions"
              style={{ color: Koji.config.colors.instructionsColor }}
            >
              {this.detectMobile()
                ? Koji.config.strings.mobile_instructions3
                : Koji.config.strings.desktop_instructions3}
            </div>
          </div>
        </div>

        <hr style={{ width: '75%', opacity: 0.15 }} />
        <div style={{ clear: 'both' }} />

        <form className="main-menu-form" onSubmit={this.handleSubmit}>
          <div className="main-menu-input-wrapper">
            <div className="main-menu-field">
              <label
                className="main-menu-input-label"
                style={{ color: Koji.config.colors.instructionsColor }}
              >
                Name
              </label>
              <input
                placeholder={Koji.config.strings.defaultPlayerName}
                onChange={event => {
                  this.setState({
                    playerName: event.target.value,
                  })
                  localStorage.setItem('playerName', event.target.value)
                }}
                type="text"
                value={this.state.playerName}
                style={{
                  backgroundColor: Koji.config.colors.buttonColor,
                  color: Koji.config.colors.buttonTextColor,
                  borderColor: Koji.config.colors.titleColor,
                  fontFamily: `${this.state.font}`,
                }}
                className="main-menu-input"
                required
              />
            </div>

            <div className="main-menu-field">
              <label
                className="main-menu-input-label"
                style={{ color: Koji.config.colors.instructionsColor }}
              >
                Game Room
              </label>
              <input
                placeholder={Koji.config.strings.defaultRoomName}
                onChange={event => {
                  this.setState({
                    roomName: event.target.value,
                  })
                  localStorage.setItem(
                    'roomName',
                    event.target.value.toLowerCase()
                  )
                }}
                type="text"
                value={this.state.roomName}
                style={{
                  backgroundColor: Koji.config.colors.buttonColor,
                  color: Koji.config.colors.buttonTextColor,
                  borderColor: Koji.config.colors.titleColor,
                  fontFamily: `${this.state.font}`,
                }}
                className="main-menu-input"
                required
              />
            </div>
          </div>

          <button
            className="main-menu-button"
            type="submit"
            onClick={this.startGame}
            style={{
              backgroundColor: Koji.config.colors.buttonColor,
              color: Koji.config.colors.buttonTextColor,
              fontFamily: `${this.state.font}`,
            }}
          >
            {Koji.config.strings.playButtonText}
          </button>
        </form>

        <div
          className="change-character-wrapper"
          style={{ borderColor: `${Koji.config.colors.buttonColor}` }}
        >
          <button
            className="main-menu-button"
            type="button"
            onClick={this.openCharacterPicker}
            style={{
              backgroundColor: Koji.config.colors.buttonColor,
              color: Koji.config.colors.buttonTextColor,
              fontFamily: `${this.state.font}`,
              margin: '0',
              borderRadius: '0',
            }}
          >
            {Koji.config.strings.changeCharacterText}
          </button>

          <img
            src={this.state.chosenImage}
            className="character-preview-img"
            alt="Choosen Player"
          />
        </div>

        <button
          type="button"
          className="main-menu-button"
          onClick={this.openLeaderboard}
          style={{
            backgroundColor: Koji.config.colors.buttonColor,
            color: Koji.config.colors.buttonTextColor,
            fontFamily: `${this.state.font}`,
          }}
        >
          {Koji.config.strings.leaderboardButtonText}
        </button>
      </div>
    )
  }
}

export default MainMenu
