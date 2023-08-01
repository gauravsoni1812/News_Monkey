import React, { Component } from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  state = {
    progress: 10,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress});
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar height="3px" color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={20}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/Business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={20}
                  country="in"
                  category="business"
                />
              }
            ></Route>
            <Route
              path="/Entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={20}
                  country="in"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              path="/Health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={20}
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              path="/Science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={20}
                  country="in"
                  category="science"
                />
              }
            ></Route>
            <Route
              path="/Sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={20}
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              path="/Technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={20}
                  country="in"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
