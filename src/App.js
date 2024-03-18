import './App.css';


import Main from './components/Main';

const smileImgList = [
  {
    imgName: "1640-do-not-disturb.gif"
  },
  {
    imgName: "2400-demongirldance.gif"
  },
  {
    imgName: "2406-dragonroll.gif"
  },
  {
    imgName: "Dnd_comfy86.gif"
  },
  {
    imgName: "wizard_mage_dnd_magic.gif"
  } 
]


function App() {
  return (
    <div className='App__wrapper'>
        <Main smileImgList={smileImgList}/>
    </div>
  );
}

export default App;
