import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './resources/scss/index.scss';

import FormBox from "./components/FormBox"
import ContentBox from "./components/ContentBox"

import Data from "./data/data"


const App= () => {

  useEffect(()=>{

    console.log(Data.GetData("temperature"))
  
  },[])
  


    return (
      <>
        <FormBox/>
        {/* <ContentBox  typeOfDataPresentation = {false}  data={Data.allData}/> */}
        <ContentBox  typeOfDataPresentation = {true}  data={Data.GetData("temperature")}/>
      </>

   );
  }



ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));