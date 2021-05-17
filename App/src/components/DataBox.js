import React, {useEffect, useState} from 'react'



const DataBox = ({id, imgPath, title, value}) =>
{
    const [hover, setHover] = useState(false);

  return(
            <>
                <div className = {`dataBox dataBox-${id}`} onMouseEnter = {() => setHover(true)} onMouseLeave = {() => setHover(false)}>
                    <div className ="title"> <h1>{title}</h1>  </div>
                    <div className ="value"> {value}  </div>
                    <div className = {`image image-${id}`}> </div>
                    <div className = {`underline-${id}`}></div>
                    <img className = {(hover)?`box-${id}--animation-on`:`box-${id}--animation-off`} src= {imgPath}/> 
                    <div className = {`animation-element`}></div>
                </div>
                
            </>
          
        )
}


export default DataBox