import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
       <h3 className='title'>Самые высокие здания и сооружения</h3>
       <Table data={ buildings } amountRows="15" /> {/*здесь можно отключить пагинацию showPagination={false} и поменять количество строк для вывода*/}
    </div>
  );
}

export default App;