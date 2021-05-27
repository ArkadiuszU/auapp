import React, {useEffect, useState} from 'react'

const DataBox = ({animateTriger, id, imgPath, title, value}) =>
{
  return(
            <>
                <div className = {`dataBox dataBox-${id}`}>
                    <div className ="title"> <h1>{title}</h1>  </div>
                    <div className ="value"> {value}  </div>
                    <div className ="stat">min: {0} max: {100} avg: {50} </div>
                    <div className = {`image image-${id}`}> </div>
                    <div className = {`underline-${id}`}></div>
                    <img className = {(animateTriger)?(animateTriger<2)?`box-${id}--animation-on`:`box-${id}--animation-off`:""} src= {imgPath}/> 
                    <div className = {`animation-element`}></div>
                </div> 
            </>
        )
}

export default DataBox