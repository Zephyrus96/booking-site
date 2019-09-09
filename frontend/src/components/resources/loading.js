import React from "react";
import "./loading.css";

const LoadingIcon = () => {
  return (
    <svg
      width="100px"
      height="100px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="loading-icon"
      style={{ background: "none" }}
    >
      <circle
        cx="50"
        cy="50"
        ng-attr-r="{{config.radius}}"
        ng-attr-stroke-width="{{config.width}}"
        ng-attr-stroke="{{config.c1}}"
        ng-attr-stroke-dasharray="{{config.dasharray}}"
        fill="none"
        strokeLinecap="round"
        r="40"
        strokeWidth="4"
        stroke="#5101d1"
        strokeDasharray="62.83185307179586 62.83185307179586"
        transform="rotate(11.9978 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="50"
        cy="50"
        ng-attr-r="{{config.radius2}}"
        ng-attr-stroke-width="{{config.width}}"
        ng-attr-stroke="{{config.c2}}"
        ng-attr-stroke-dasharray="{{config.dasharray2}}"
        ng-attr-stroke-dashoffset="{{config.dashoffset2}}"
        fill="none"
        strokeLinecap="round"
        r="35"
        strokeWidth="4"
        stroke="#221b24"
        strokeDasharray="54.97787143782138 54.97787143782138"
        strokeDashoffset="54.97787143782138"
        transform="rotate(-11.9978 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;-360 50 50"
          keyTimes="0;1"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoadingIcon;
