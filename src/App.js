import logo from './logo.svg';
//import './App.css';
import { DatePicker } from 'antd';
import FormLogin from './components/formLogin';
import MenuButton from './components/menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <FormLogin />
      <MenuButton />
      </header>
    </div>
  );
}

export default App;
