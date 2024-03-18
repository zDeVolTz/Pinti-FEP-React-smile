
import { Component } from 'react';
import ImgList from './ImgList';
import style from './Main.module.scss';
import uniqid from 'uniqid';

class Main extends Component {
    
    constructor(props){
        super(props);
        this.smileImgList = this.props.smileImgList;
        this.state = {
            imgData : this.smileImgList.map(element => ({
                name : element.imgName,
                id: uniqid(),
                count: 0,
                isWinner : false
            })),
            winnersData : []
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.maxCount = this.maxCount.bind(this);
        this.updateImgCount = this.updateImgCount.bind(this);
    }

   

    updateImgCount(id) {
        this.setState(prevState => ({
            imgData: prevState.imgData.map(element => {
                if (element.id === id) {
                    return {
                        ...element,
                        count: element.count + 1
                    };
                } else {
                    return element;
                }
            })
        }))
    }

    

    maxCount() {
       const result = this.state.imgData.reduce((max,item) => ( (max > item.count) ? max : item.count ) ,0)
       return result;
    }

    handleClick() {
        const maxCountValue = this.maxCount();
        const winnersImgData = this.state.imgData
					.filter((element) => element.count === maxCountValue)
					.map((element) => ({ ...element, isWinner: true }));
        this.setState({ winnersData:  winnersImgData })
    }

    render() {
        return (
					<section className={style.main}>
						<div className= {style.smileList}>
							<div className={style.smileList__block}>
								{this.state.imgData.map((element) => (
									<ImgList
										key={`smileList-${element.id}`}
										imgData={element}
										updateImgCount={this.updateImgCount}
									/>
								))}
							</div>
                            <button onClick={this.handleClick} className={style.smileList__btn}>Отримати результат змагання</button>
						</div>
						{this.state.winnersData.length > 0 && (
                            <div className= {style.winnerList}>
                                <h2 className= {style.winnerList__title}>
                                    {this.state.winnersData.length === 1 ? 'Переможець': 'Переможці'}
                                </h2>
                                <div className={style.winnerList__block}>
                                    {this.state.winnersData.map((element) => (
                                        <ImgList
                                            key={`winnerList-${element.id}`}
                                            imgData={element}
                                            updateImgCount={this.updateImgCount}
                                        />
                                    ))}
                                </div>
                            </div>
						)}
					</section>
				);
    }
}


export default Main;