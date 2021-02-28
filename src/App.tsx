import React, {useEffect} from 'react';
import anime from "animejs";
import devSvg from './Dev2.svg';

import './App.scss';

const animate = () => {
  anime({
    targets: '#gabriel',
    opacity: '1',
    easing: 'easeInOutQuad'
  });
  anime({
    targets: '#dev',
    opacity: '1',
    easing: 'easeInOutQuad'
  });
  // const { translateX, translateY } = this.props;
  // anime({
  //   targets: this.box,
  //   translateX: { value: translateX },
  //   translateY: { value: translateY },
  //   duration: 2000
  // });
};

const App = () => {
  useEffect(()=>{
    animate();
  })
  return (
      <div className="main-bg-gradient">
        <section className="moving-grid">
          <div className="container">
            <div className="static-lines">
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
              <div className="vert"></div>
            </div>
            <div className="moving-lines">
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
              <div className="horz"></div>
            </div>
          </div>
        </section>
        <div className="name-section">
          <img id="gabriel" src="Gabriel.svg"/>
          <img id="dev" src="Dev2.svg"/>
        </div>
        {/* <div className="content-cont">
          <div className="text-body">
            <h1>
              <span>Your Name</span>
              <h3>right here</h3>
            </h1>
          </div>
        </div> */}
      </div>
    );
}

export default App;
