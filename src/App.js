import { Card, Button, CardTitle, CardText } from 'reactstrap';
import React, { useState, useEffect } from 'react';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const WORKING = 1;
  const BREAK = 2;
  const [status, setStatus] = useState(WORKING);

  const Stop = () => {
    setIsActive(false);
  }

  const Start = () => {
    setIsActive(true);
  }

  const Reset = () => {
    setStatus(WORKING);
    setMinutes(25);
    setSeconds(0);
  }

  useEffect(() => {
    if (isActive) {
      const intervalSeconds = setInterval(() => {

        if (minutes === 0 && seconds === 0 && status === WORKING) {
          setMinutes(4);
          setStatus(BREAK);
        } else if (minutes === 0 && seconds === 0 && status === BREAK) {
          setStatus(24);
          setStatus(WORKING);
        } else if (seconds === 0) {
          setMinutes(minutes - 1);
        }

        setSeconds(seconds === 0 ? 59 : seconds - 1);
      }, 1000);

      // essa função é equivalente a componentWillUnmount
      return () => { clearInterval(intervalSeconds); };
    }

  });

  return (
    <div class="container">
      <Card body outline color="secondary" className="text-center">
        <CardTitle tag="h5">Pomodoro Timer</CardTitle>
        <CardText>{minutes}:{seconds}</CardText>
        <div className="mb-2">
          <Button onClick={Stop} color="danger" size="lg">
           Stop
          </Button>{' '}
          <Button onClick={Start} color="success" size="lg">
            Start
          </Button> {' '}
          <Button onClick={Reset} color="secondary" size="lg">
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
