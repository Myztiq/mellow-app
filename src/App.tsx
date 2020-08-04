import React from 'react';
import './App.css';
import moment from 'moment';

const App = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [temperature, setTemperature] = React.useState(160);
  const [endHour, setEndHour] = React.useState(1);
  const [endMinute, setEndMinute] = React.useState(0);
  const [duration, setDuration] = React.useState(30);
  const [response, setResponse] = React.useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const endDate = moment(`${moment().format('YYYY-MM-DD')} ${endHour}:${endMinute}`, 'YYYY-MM-DD k:m');
    const startDate = endDate.clone().subtract(duration, 'minutes').subtract(20, 'minutes')
    const params = {
      username,
      password,
      temp: temperature,
      startCook: startDate.toISOString(),
      endCook: endDate.toISOString()
    }

    const response = await window.fetch('https://3vkjw2u0f4.execute-api.us-east-1.amazonaws.com/dev/schedule-cook', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
    })
    const text = await response.text();
    setResponse(text)
  }

  return (
    <div className="App">
      <header className="App-header">
        Mellow App
      </header>
      <div  className="body">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type='text' placeholder='username' value={username} onChange={(event) => {setUsername(event.target.value)}} />
          </label>
          <label>
            Password:
            <input type='password' placeholder='password' value={password} onChange={(event) => {setPassword(event.target.value)}} />
          </label>
          <label>
            Temp (f):
            <input type='number' value={temperature} onChange={(event) => {setTemperature(parseInt(event.target.value, 10))}} />
          </label>
          <label>
            End:
            <input type='number' value={endHour} onChange={(event) => {setEndHour(parseInt(event.target.value, 10))}} />
            <input type='number' value={endMinute} onChange={(event) => {setEndMinute(parseInt(event.target.value, 10))}} />
          </label>
          <label>
            Duration (minutes):
            <input type='number' value={duration} onChange={(event) => {setDuration(parseInt(event.target.value, 10))}} />
          </label>
          <button>
            Submit
          </button>
        </form>
        <pre>
        {response}
        </pre>
      </div>
    </div>
  );
}

export default App;
