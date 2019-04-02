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
    const startElement = (+this.props.page > lastPage || !+this.props.page) ? 0 : (+this.props.page - 1) * contentСoverage
    const datas = this.props.datas.slice(startElement, startElement + contentСoverage)
    return(
      <div>
        {this.props.children}
        <div id = 'pagination-wrapper'>
          {datas}
          <Pages currentPage = {this.props.page || 1} datasLen = {datasLen} path = {this.props.path} contentСoverage = {contentСoverage} />
        </div>
      </div>
    )
  }
}

export default Paginator