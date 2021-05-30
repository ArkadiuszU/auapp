import React, { useEffect, useState } from "react";

const About = ({ animateTriger, id, imgPath, title, value }) => {
  return (
    <div className="about-container">
     <div className="header">

     <h1>Inteligentne domy i budynki oraz Monitorowanie i wizualizacja procesów </h1>

     </div>
      <img className="rpi-image" src="/src/resources/img/pi3dirk.svg" />
      <img className="sensors-image" src="/src/resources/img/sensors.png" />
      <img className="data-image" src="/src/resources/img/digital.svg" />
      <div class="wifi-image">
        <svg
          viewBox="0 0 319 319"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#E5E5E5" />
          <g id="WIFI_icon 1" clip-path="url(#clip0)">
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
    </div>
  );
};

export default About;
