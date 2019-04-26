import React, { Component } from 'react'

class ChoseAvatar extends Component {
  constructor(props) {
    super(props)

    this.isScroll = true
    this.prevSwipeClientX = null
    this.state = {
      pointer: new this.slider(9, 5, this.props) 
    }
  }

  slider(avatarsCount, сountShowAvatars, props) {
    var avatarNumber = +props.selectedAvatar > 2 ? +props.selectedAvatar - 2 : +props.selectedAvatar + avatarsCount - 2

    this.avatarNumber = () => avatarNumber
    this.selectAvatar = () => (avatarNumber + 2) % avatarsCount || avatarsCount
    this.next = () => {
      avatarNumber === avatarsCount ? avatarNumber = 1 : avatarNumber++
      props.chose(this.selectAvatar())
    }
    this.back = () => {
      avatarNumber === 1 ? avatarNumber = avatarsCount : avatarNumber--
      props.chose(this.selectAvatar())
    }
    this.сountShowAvatars = () => Array(сountShowAvatars).fill(true).map((x, i) => {
      return { 
        index: (i + avatarNumber) % avatarsCount || avatarsCount, 
        style: -Math.abs(i - 2) + 2 
      } 
    })
    this.change = value => {
      avatarNumber = value > 2 ? value - 2 : value + avatarsCount - 2
      props.chose(this.selectAvatar())
      return 1
    }
  }

  wheel(e) {
    if (this.isScroll) {
      if (e.touches && this.prevSwipeClientX === null) {
        this.prevSwipeClientX = e.touches[0].clientX
      } else if (e.touches) {
        const isRightSwipe = e.touches[0].clientX - this.prevSwipeClientX > 0
        isRightSwipe ? this.state.pointer.back() : this.state.pointer.next()
        this.prevSwipeClientX = null
        this.isScroll = !this.isScroll
        setTimeout(() => this.isScroll = !this.isScroll, 400)
      } else {
        e.deltaY < 0 ? this.state.pointer.back() : this.state.pointer.next()
        this.setState({pointer: this.state.pointer})
        this.isScroll = !this.isScroll
        setTimeout(() => this.isScroll = !this.isScroll, 200)
      }  
      this.setState({pointer: this.state.pointer})
    }
  }

  render() {
    return (
      <div 
        className = {this.props.className} 
        onWheel = {e => this.wheel.bind(this, e)() } 
        onTouchMove = {e => this.wheel.bind(this, e)()}
        style = {(this.state.pointer >= 0) ? {} : {justifyContent: 'flex-end'} } 
      >
        {this.state.pointer.сountShowAvatars().map(avatar => {
          return (
            <div 
              key = {avatar.index} 
              style = { {background: `url('/avatars/${avatar.index}.jpg') 0% 0% / cover`} }
              className = {`round round__${avatar.style}` } 
              onClick = {() => this.state.pointer.change(avatar.index) && this.setState({pointer: this.state.pointer})}
            >
            </div>
          )
        })}
      </div>
    )
  }
}

export default ChoseAvatar