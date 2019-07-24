import React from 'react';
import './App.scss';
import anime from "animejs";
import devSvg from './Dev2.svg';


{/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
        </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
        </a>
</header> */}

class App extends React.Component{

  componentDidMount() {
    this.animate();
  }
  // componentDidUpdate() {
  //   this.animate();
  // }

  animate = () => {
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

  render() {
    return (
      <div className="main-bg-gradient">
        <section class="moving-grid">
          <div class="container">
            <div class="static-lines">
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
              <div class="vert"></div>
            </div>
            <div class="moving-lines">
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
              <div class="horz"></div>
            </div>
          </div>
        </section>
        <div class="name-section">
          <img id="gabriel" src="Gabriel.svg"/>
          <img id="dev" src="Dev2.svg"/>
        </div>
        {/* <div class="content-cont">
          <div class="text-body">
            <h1>
              <span>Your Name</span>
              <h3>right here</h3>
            </h1>
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
