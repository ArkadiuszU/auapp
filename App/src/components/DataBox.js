import React from 'react'

const DataBox = ({animateTriger, id, imgPath, title, value, statistic, value2}) =>
{
  return(
            <>
                <div className = {`dataBox dataBox-${id}`}>
                    <div className ="title"> <h1>{title}</h1>  </div>
                    <div className ="value"> {value} <br/> {value2} </div>
                    <div className ="stat">{(statistic.length<4)
                        ?"min: -  max: -  avg: -":statistic[statistic.map(e => e.name).indexOf(title)].message}</div>
                    <div className = {`image image-${id}`}> </div>
                    <div className = {`underline-${id}`}></div>
                    <img className = {(animateTriger)?(animateTriger<2)
                        ?`box-${id}--animation-on`:`box-${id}--animation-off`:""} src= {imgPath}/> 
                    <div className = {`animation-element`}></div>
                </div> 
            </>
        )
}
export default DataBox








