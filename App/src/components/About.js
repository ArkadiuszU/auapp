import React, { useEffect, useState } from "react";

const About = ({ animateTriger}) => {
  return (
    <div className={(animateTriger)?"about-container animation-class":"about-container"}>
      <div className="header">
        <h1>
        Mikrokontrolery w praktyce- laboratoria{" "}
        </h1>
      </div>
      <img className="rpi-image" src="/src/resources/img/pi3dirk.svg" />
      <img className="sensors-image" src="/src/resources/img/sensors.png" />
      <img className="data-image" src="/src/resources/img/digital.svg" />
      <img className="api-image" src="/src/resources/img/server-database.jpg" />
      <img className="gear-image" src="/src/resources/img/gear.png" />
      <img className="vis-image" src="/src/resources/img/infographic.png" />


      <div className = "get-image">
        <svg
          width="235"
          height="198"
          viewBox="0 0 435 298"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="api 1">

            <path
              id="Vector_2"
              d="M179.906 143H224V104.093L211.031 115.536L159.156 69L141 85.0206L193.74 131.557L179.906 143Z"
              fill="#2EA2DB"
            />
            <path
              id="Vector_3"
              d="M140.268 104H94V140.804L108.515 129.979L162.948 174L182 158.845L126.66 114.825L140.268 104Z"
              fill="#F16051"
            />
           
          </g>
        </svg>
      </div>
      
      
      <div className="wifi-image">
        <svg
          viewBox="0 0 319 319"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#E5E5E5" />
          <g id="WIFI_icon 1">
            <g id="layer1">
              <g id="g3848">
                <path
                  id="path-4"
                  d="M49.5248 298.122C36.8264 307.159 19.2065 304.191 10.1696 291.492C1.13276 278.794 4.10106 261.174 16.7995 252.137C29.4979 243.1 47.1179 246.068 56.1547 258.767C65.1916 271.465 62.2233 289.085 49.5248 298.122Z"
                  fill="#1B84DB"
                />
                <path
                  id="path-3"
                  d="M195.86 166.556C166.108 124.75 123.873 99.0446 83.2583 93.6907L67.6162 133.221C101.507 134.034 138.32 154.289 163.459 189.614C186.734 222.32 194.52 260.259 187.348 291.333L228.841 291.246C235.071 252.266 224.246 206.444 195.86 166.556Z"
                  fill="#1B84DB"
                />
                <path
                  id="path-2"
                  d="M120.759 214.943C103.836 191.163 79.5369 175.754 53.2173 169.604L39.9961 202.996C59.3317 207.984 77.0967 219.557 89.5954 237.12C101.329 253.608 106.558 272.742 105.815 291.494L141.696 291.407C143.931 265.197 137.223 238.078 120.759 214.943Z"
                  fill="#1B84DB"
                />
                <path
                  id="path-1"
                  d="M267.654 114.661C228.552 59.7161 172.161 25.4966 114.185 15.5454L99.3725 52.999C146.329 57.4239 197.075 87.8442 232.884 138.162C268.417 188.093 280.639 245.512 269.884 291.165L311.207 291.088C320.45 233.315 306.52 169.275 267.654 114.661Z"
                  fill="#1B84DB"
                />
              </g>
            </g>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="318.898" height="318.898" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
   
      <div className="measurment-device-description">
      <h1>Urządzenie pomiarowe</h1>
      <ul>
        <h2>Sprzęt</h2>
        <li> komputer jednopłytkowy Raspberry Pi 4 </li>
        <li>czujnik temperatury: MCP9808  </li>
        <li>czujnik temperatury zewnętrznej: DS18B20</li>
        <li>czujnik nasłonecznienia: BH1750 </li>
        <li>czujnik wilgotności: AM2320</li>
        <li>czujnik ciśnienia: LPS25H</li>
      </ul>
      <ul>
        <h2>Zadania układu</h2>
        <li>odczyt pomiarów z czujników- protokoły I2C/1-Wire</li>
        <li>wyznaczenie komfortu</li>
        <li>publikacja danych do API- client Http</li>
      </ul>
      </div>

      <div className="react-app-description">
      <h1>Wizualizacja danych</h1>
      <ul>
        <h2>Technologie</h2>
        <li>HTML CSS JS</li>
        <li> biblioteka React</li>
        <li>  pakiet react-chartjs-2</li>
      </ul>
      <ul>
        <h2>Zadania aplikacji</h2>
        <li>odczyt danych z API- protokół HTTP</li>
        <li>prezentacja aktualnych danych</li>
        <li>wizualizacja danych archiwalnych</li>
      </ul>
      </div>

      <div className="api-description">
      <h1>Serwer API</h1>
      <ul>
        <h2>Technologie</h2>
        <li>Własny silnik HTTP - język C</li>
        <li>Interfejs bazy MySQL - język C++</li>
        <li>Baza danych MySQL</li>
      </ul>
      </div>

      <div className="team-description">
      <h1>Skład grupy</h1>
      <ul>
        <li>Jurek Muszyński</li>
        <li>Kacper Sinkiewicz</li>
        <li>Arkadiusz Urbankiewicz</li>
      </ul>
      </div>

    </div>
  );
};

export default About;
