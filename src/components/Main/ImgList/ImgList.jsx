import { Component } from 'react';
import { IMGURLPATH } from '../../../utils/common'; 
import style from '../Main.module.scss'

class ImgList extends Component {
    
    constructor(props){
        super(props);
        const { name , id , count } = this.props.imgData;

        this.id = id;
        this.name = name;

        this.state = {
            imgCount : count,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (typeof this.props.updateImgCount === 'function') {
            this.props.updateImgCount(this.id);
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.imgData.count !== this.props.imgData.count) {
            this.setState({ imgCount: this.props.imgData.count });
        }
        
    }

    render() {
        return (
					<div>
						<img
							src={`${IMGURLPATH}${this.name}`}
							className={style.smileGif}
							onClick={() => this.handleClick()}
							alt=""
						/>
						{<p className={style.count}>{this.state.imgCount}</p>}
					</div>
				);
    }
}


export default ImgList;