import React, { useState } from 'react';
import useInterval from './useInterval';
import react_logo from './react-logo.svg';
import flask_logo from './flask-logo.svg';
import './Demo.css';
// import Timeline from './Timeline';

function getRandomColor() {
  let colorValues = ["red", "blue", "green"];
  return colorValues[Math.floor(Math.random() * colorValues.length)];
}

// function buttonClicked() {
//   console.log('Button was clicked!')
//   let s;
//   fetch('/random/quote')
//     .then(response => response.json())
//     .then(data => {
//       s = {quoteText: data.random_quote, quoteAuthor: data.quote_author};
//       // this.setState({ quoteText: data.random_quote });
//       // this.setState({ quoteAuthor: data.quote_author });
//       console.log(data);
//     });
//   return(s);
// }

function Demo() {
  const [currentTime, setCurrentTime] = useState('01/01/1970, 00:00:00');
  const [currentRandomNumber, setCurrentRandomNumber] = useState('-1');
  const [currentRandomString, setCurrentRandomString] = useState('<null>');
  const [quoteText, setQuoteText] = useState('To be or not to be.');
  const [quoteAuthor, setQuoteAuthor] = useState('William Shakespeare');

  const delay = 5000; // in milliseconds
  const quoteDelay = 3000; // in milliseconds

  Demo.refreshQuote = () => {
    console.log("Refreshing ... quote ...");
    fetch('/random/quote')
      .then(response => response.json())
      .then(data => {
        setQuoteText(data.random_quote);
        setQuoteAuthor(data.quote_author);
        console.log(data);
    });
    console.log("Refreshed quote.");  
  }
  useInterval(() => {
    Demo.refreshQuote();
  }, quoteDelay);

  Demo.refreshTime = () => {
    console.log("Refreshing ... time ...");
    fetch('/api/time')
      .then(response => response.json())
      .then(data => {
        setCurrentTime(data.datetime);
        console.log(data);
    });
    console.log("Refreshed time.");  
  }
  useInterval(() => {
    Demo.refreshTime();
  }, delay);

  Demo.refreshRandomNumber = () => {
    console.log("Refreshing ... random number ...");
    fetch('/random/number')
      .then(response => response.json())
      .then(data => {
        setCurrentRandomNumber(data.random_number);
        console.log(data);
    });
    console.log("Refreshed random number.");  
  }
  useInterval(() => {
    Demo.refreshRandomNumber();
  }, delay);

  Demo.refreshRandomString = () => {
    console.log("Refreshing ... random string ...");
    fetch('/random/string')
      .then(response => response.json())
      .then(data => {
        setCurrentRandomString(data.random_string);
        console.log(data);
    });
    console.log("Refreshed random string.");  
  }
  useInterval(() => {
    Demo.refreshRandomString();
  }, delay);

  Demo.buttonClicked = () => {
    console.log('Button was clicked!');
    Demo.refreshTime();
    Demo.refreshRandomNumber();
    Demo.refreshRandomString();
    Demo.refreshQuote();
  }

  return (
    <div className="Demo">
      <header className="Demo-header">
        <img src={react_logo} className="Demo-logo" alt="react-logo" />
        <img src={flask_logo} className="Demo-logo" alt="flask-logo" />
        <a
          className="Demo-link"
          href="https://github.com/robmarano/aws_elastic_beanstalk_flask"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn how to spin React with Python Flask
        </a>
        <button className="button" onClick={Demo.buttonClicked}>Click to Refresh</button>
        <p>The current time is</p>
        <div style={{background: `${getRandomColor()}`}}>
          {currentTime}
        </div>
        <p>The current random number is</p>
        <div style={{background: `${getRandomColor()}`}}>
          {currentRandomNumber}
        </div>
        <p>The current random string is</p>
        <div style={{background: `${getRandomColor()}`}}>
          {currentRandomString}
        </div>
        <p>The current quote is</p>
        <div>
          <blockquote>
          <p>{quoteText}</p>
          <footer>— <cite>{quoteAuthor}</cite>
          </footer>
          </blockquote>
        </div>
        <p></p>
        <p></p>
        <p></p>
      </header>
    </div>
  );
}

export default Demo;
