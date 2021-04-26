import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './resources/scss/index.scss';

import FormBox from "./components/FormBox"
import ContentBox from "./components/ContentBox"

import Data from "./data/data"


const App= () => {

  const [typeOfDataPresentation, setTypeOfDataPresentation] = useState(false);

  
  const CheckedHendle = () => 
  {
    console.log("no hej")
    setTypeOfDataPresentation(prev=> !prev)
  }



    return (
      <>
        <FormBox value = {typeOfDataPresentation} event={CheckedHendle}/>
         {(typeOfDataPresentation)?<ContentBox  typeOfDataPresentation = {true}  data={Data.GetData("temperature")}/>:<ContentBox  typeOfDataPresentation = {false}  data={Data.allData}/>}
      </>

   );
  }



ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));