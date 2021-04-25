import React, { useEffect } from 'react'
import Plot from "./Plot"
import Table from "./Table"


const ContentBox = ({data, typeOfDataPresentation}) =>
{
  return(
    <div className="content-box-container" > 
        {(typeOfDataPresentation)?<Plot data={data}/>:<Table data={data}/>}
    </div>
)
}

export default ContentBox