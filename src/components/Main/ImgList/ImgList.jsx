import { Component } from 'react';
import { IMGURLPATH } from '../../../utils/common'; 
import style from '../Main.module.scss'

class ImgList extends Component {
    
    constructor(props){
        super(props);
        const { name , id , count, isWinner} = this.props.imgData;

        this.id = id;
        this.name = name;

        this.state = {
            imgCount : count,
            isWinner : isWinner
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (!this.state.isWinner) {
            this.props.updateImgCount(this.props.imgData.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.imgData.count !== this.props.imgData.count) {
            this.setState({ imgCount: this.props.imgData.count });
        }
    
        if (prevProps.imgData.isWinner !== this.props.imgData.isWinner) {
            this.setState({ isWinner: this.props.imgData.isWinner });
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
						{!this.state.isWinner && <p className={style.count}>{this.state.imgCount}</p>}
					</div>
				);
    }
}


export default ImgList;