import React, {useState} from 'react'


const FormBox = () =>
{
  const [typeOfDataPresentation, setTypeOfDataPresentation] = useState({line:true, table:false})
  return(
          <>
            <div className="from-box-container" > 
            Line 
              <input type="checkBox"  name="line"/>
            Table
              <input type="checkBox"  name = "table"/>
            </div>
          </>
        )
}


export default FormBox