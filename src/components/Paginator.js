import React, {Component} from 'react' 
import Pages from './Pages'

class Paginator extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const datasLen = this.props.datas.length
        const limitMark = Math.ceil(datasLen / 6)
        const page = (+this.props.page > limitMark || !+this.props.page) ? 0 : (+this.props.page - 1) * 6
        const datas = this.props.datas.slice(page, page + 6)
        return(
            <div id = 'contents'>
                {this.props.children}
                <div id = 'items'>
                    {datas}
                </div>
                <Pages mark = {this.props.page || 1} size = {datasLen} path = {this.props.path} />
            </div>
        )
    }
}

export default Paginator