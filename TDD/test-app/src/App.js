import logo from './logo.svg';
import './App.css';
import SearchComponent from './tdd/SearchComponent';
import UserList from './components/UserList';
import Login from './components/Login';

function App() {

  const users = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "David Wilson",
    "Emma Davis",
    "Fiona Green",
    "George Harris",
  ];

  return (
    <div className="App">
      <Login />
      {/* <UserList /> */}
      {/* <SearchComponent users={users} /> */}
    </div>
  );
}

export default App;
