import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import ContactsList from "./components/ListContacts";
import EditContact from "./components/EditContact";
import AddContacts from "./components/AddContacts";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Route path="/" exact component={ContactsList} />
        <Route path="/edit/:id" component={EditContact} />
        <Route path="/add_contacts" component={AddContacts} />
      </main>
    </Router>
  );
}

export default App;
