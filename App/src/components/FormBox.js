import React, {useState} from 'react'


const FormBox = ({event , value}) =>
{

  const _CheckedHendle = ()=> 
  {
    event();
  }

  return(
          <>
            <div className="from-box-container" > 
            <label for="plot">plot</label>
              <input id="plot" type="checkBox" checked={value}  onChange={_CheckedHendle}/>
            <label for="table">table</label>
              <input id="table" type="checkBox" checked={!value}  onChange={_CheckedHendle}/>

              <label for="measurement_type">Choose a measurement type to plot</label>
              <select name="measurement_type" id="measurement_type">
                <option value="temperature">Temperatura</option>
                <option value="humidity">Wilgotność</option>
                <option value="insolation">Nasłonecznienie</option>
                <option value="pressure">Ciśnienie</option>
                <option value="comfort_factor">Współczynnik komfortu</option>
              </select>
            </div>
          </>
        )
}


export default FormBox