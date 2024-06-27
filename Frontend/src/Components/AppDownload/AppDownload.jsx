import React from "react";
import "./AppDownload.css";
import { memo } from "react";
import { assets } from "../../assets/assets";

function AppDownload() {
  return (
    <div className="AppDownload" id="Download">
      <p>
        For Better Experience Download <br /> Tomato App
      </p>
      <div className="downloadPlatform">
        <img
          className="playStoreImg"
          src={assets.play_store}
          alt="playstoreImg"
        />
        <img className="appStoreImg" src={assets.app_store} alt="appStoreImg" />
      </div>
    </div>
  );
}

export default memo(AppDownload);
