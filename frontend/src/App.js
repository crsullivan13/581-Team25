import logo from './logo.svg';
import './App.css';
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";



function handleClick(){
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
	<Tabs>
	<div label="Tab1">
		<div>
			<button type="button" onClick={handleClick}>Tab1 button</button>
		</div>
	</div>
	<div label="Tab2">
	</div>
	<div label="Tab3">
	</div>
	</Tabs>
	</header>
    </div>
  );
}

export default App;