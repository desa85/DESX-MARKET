import React, { Component } from 'react'

class ChoseAvatar extends Component {
  constructor(props) {
    super(props)

    this.scroll = true
    this.swipe = true
    this.state = {
      pointer: new this.slider(9, 5, this.props) 
    }
  }

  slider(end, cut, props) {
    var avatarNumber =  (+props.selectedAvatar > 2 ? +props.selectedAvatar - 2 : +props.selectedAvatar + end - 2)
    console.log(props.selectedAvatar)

    this.avatarNumber = () => avatarNumber
    this.selectAvatar = () => (avatarNumber + 2) % end || end
    this.next = () => (avatarNumber === end) ? avatarNumber = 1 : avatarNumber++ && props.chose(this.selectAvatar())
    this.back = () => avatarNumber === 1 ? avatarNumber = end : avatarNumber-- && props.chose(this.selectAvatar())
    this.cut = () => Array(cut).fill(true).map((x, i) => {return { index: (i + avatarNumber) % end || end, style: -Math.abs(i - 2) + 2 } })
    this.change = value => {
      avatarNumber = value > 2 ? value - 2 : value + end - 2
      props.chose(this.selectAvatar())
      return 1
    }
  }

  wheel(e) {
    if (this.scroll) {
      if (e.touches && typeof this.swipe === 'boolean') {
        this.swipe = e.touches[0].clientX
      } else if (e.touches) {
        this.swipe = (e.touches[0].clientX - this.swipe) > 0
        this.swipe ? this.state.pointer.back() : this.state.pointer.next()
        this.scroll = !this.scroll
        setTimeout(() => this.scroll = !this.scroll, 400)
      } else {
        e.deltaY < 0 ? this.state.pointer.back() : this.state.pointer.next()
        this.setState({pointer: this.state.pointer})
        this.scroll = !this.scroll
        setTimeout(() => this.scroll = !this.scroll, 200)
      }
      
      
    }
  }

  render() {
    return (
      <div className = {this.props.className} 
        onWheel = {e => this.wheel.bind(this, e)() } 
        onTouchMove = {e => this.wheel.bind(this, e)()}
        style = {(this.state.pointer >= 0) ? {} : {justifyContent: 'flex-end'} } 
        >
        {this.state.pointer.cut().map(avatar => {
          return (
            <div 
              key = {avatar.index} 
              style = { {background: `url('/avatars/${avatar.index}.jpg') 0% 0% / cover`} }
              className = {`round round__${avatar.style}` } 
              onClick = {() => this.state.pointer.change(avatar.index) && this.setState({pointer: this.state.pointer})}>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ChoseAvatar