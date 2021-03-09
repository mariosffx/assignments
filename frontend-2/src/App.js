import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar"
// import ContactsList from "./components/ListContacts";
// import EditContact from "./components/EditContact";
// import AddContacts from "./components/AddContacts";
import AddContact from "./components/AddContact";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        {/* <Route path="/" exact component={ContactsList} /> */}
        {/* <Route path="/edit/:id" component={EditContact} /> */}
        <Route path="/add_contact" component={AddContact} />
      </main>
    </Router>
  );
}

export default App;
