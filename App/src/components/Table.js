import React from 'react'


const Table = ({data}) =>
{

  return(
          <div className="scroll-table">
              <div  className="row row-header">
                <div className="col-1"> id</div>
                <div className="col-1">temperature</div>
                <div className="col-1">humidity</div>
                <div className="col-1"> insolation</div>
                <div className="col-1"> pressure</div>
                <div className="col-1"> comfort_factor</div>
                <div className="col-2"> date</div>
                <div className="col-2"> time</div>
              </div>

          {data.map((el, id)=>
          {
            
            return (
                  <div className={`row myrow animation-table-${id}`} key={id}>
                  <div className="col-1"> {id}</div>
                  <div className="col-1"> {Math.round(el.temperature * 100) / 100}</div>
                  <div className="col-1"> {el.humidity}</div>
                  <div className="col-1"> {el.insolation}</div>
                  <div className="col-1"> {el.pressure}</div>
                  <div className="col-1"> {el.comfort}</div>
                  <div className="col-2"> {el.created.slice(0,10)}</div>
                  <div className="col-2"> {el.created.slice(11,19)}</div>
                  </div>
            )
          })
          }
          </div>
        )
}

export default Table