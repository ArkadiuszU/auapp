import React from 'react'


const Table = ({data}) =>
{

  return(
          <>
              <div  className="row">
                <div className="col-1 mycol-header-first"></div>
                <div className="col-1 mycol-header"> id</div>
                <div className="col-1 mycol-header">temperature</div>
                <div className="col-1 mycol-header">humidity</div>
                <div className="col-1 mycol-header"> insolation</div>
                <div className="col-1 mycol-header"> pressure</div>
                <div className="col-1 mycol-header"> comfort_factor</div>
                <div className="col-2 mycol-header"> date</div>
                <div className="col-2 mycol-header"> time</div>
                <div className="col-1"> </div>
              </div>

          {data.map((el, id)=>
          {
            return (
              <div  className="row myrow">
                <div className="col-1 mycol-first"></div>
                <div className="col-1 mycol"> {id}</div>
                <div className="col-1 mycol"> {el.temperature}</div>
                <div className="col-1 mycol"> {el.humidity}</div>
                <div className="col-1 mycol"> {el.insolation}</div>
                <div className="col-1 mycol"> {el.pressure}</div>
                <div className="col-1 mycol"> {el.comfort_factor}</div>
                <div className="col-2 mycol"> {el.dateOfMeasurement.slice(0,10)}</div>
                <div className="col-2 mycol"> {el.dateOfMeasurement.slice(11,19)}</div>
                <div className="col-1"> </div>
              </div>
            )
          })
          }
          </>
        )
}

export default Table