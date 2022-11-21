import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
        <DatePicker />
      </header>
    </div>
  );
}

export default App;
