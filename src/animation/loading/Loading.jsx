import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import "./Loading.css"

const Loading = ({ height }) => {
  const loaderStyle = height ? { height: `${height}vh` } : {};

  return (
    <section className="loader section" style={loaderStyle}>
      <div className="sweet-loading">
        <PulseLoader color="var(--accent-color)" className="sweet__loading-loader" />
      </div>
    </section>
  );
};

export default Loading;