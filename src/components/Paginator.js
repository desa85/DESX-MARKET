import React, {Component} from 'react' 
import Pages from './Pages'

class Paginator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const contentСoverage = 6
    const datasLen = this.props.datas.length
    const lastPage = Math.ceil(datasLen / contentСoverage)
    const page = (+this.props.page > lastPage || !+this.props.page) ? 0 : (+this.props.page - 1) * contentСoverage
    const datas = this.props.datas.slice(page, page + contentСoverage)
    return(
      <div id = 'contents'>
        {this.props.children}
        <div id = 'items'>
          {datas}
        </div>
        <Pages mark = {this.props.page || 1} size = {datasLen} path = {this.props.path} contentСoverage = {contentСoverage} />
      </div>
    )
  }
}

export default Paginator