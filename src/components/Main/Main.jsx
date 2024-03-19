
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
            })),
            winnersData : [],
            winnersId : []
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
        return this.state.imgData.reduce((max,item) => ( (max > item.count) ? max : item.count ) ,0)
    }

    handleClick() {
        const maxCountValue = this.maxCount();
        const winnersImgData = this.state.imgData.filter((element) => element.count === maxCountValue)
        if(winnersImgData.length === 1){
            this.setState(prevState => ({
                winnersData: winnersImgData,
                winnersId: [...prevState.winnersId, winnersImgData[0].id]
              }));
        } 
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
                                <div className={style.winnerList__block}>
                                    <h2 className= {style.winnerList__title}> Переможець </h2>
                                    {this.state.winnersData.map((element) => (
                                        <ImgList
                                            key={`winnerList-${element.id}`}
                                            imgData={element}
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