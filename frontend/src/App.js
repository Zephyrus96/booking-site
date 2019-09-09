import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import Navbar from "./components/navigation/navbar/navbar";
import Sidebar from "./components/navigation/sidebar/sidebar";
import EventsPage from "./pages/events/Events";
import BookingsPage from "./pages/bookings/Bookings";
import Topbar from "./components/navigation/topbar/topbar";
import IndexPage from "./pages/landing";
import { ModalProvider } from "./context/modal-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import EventDetails from "./pages/event-details/event-details";
import { DropdownProvider } from "./context/dropdown-context";
import { AuthProvider } from "./context/auth-context";

import "./App.css";

function App() {
  const link = createHttpLink({
    uri: "http://localhost:5000/graphql",
    credentials: "include"
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache
  });

  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <ApolloProvider client={client}>
            <ModalProvider>
              <DropdownProvider>
                <AuthProvider>
                  <main className="main-content">
                    <Switch>
                      <Route path="/" exact>
                        <Topbar />
                        <Navbar />
                        <Sidebar />
                        <IndexPage />
                      </Route>

                      <Route path="/events" exact>
                        <Topbar />
                        <Navbar />
                        <Sidebar />
                        <EventsPage />
                      </Route>

                      <Route path="/bookings" exact>
                        <Topbar />
                        <Navbar />
                        <Sidebar />
                        <BookingsPage />
                      </Route>

                      <Route path="/events/:id" exact>
                        <Topbar />
                        <Navbar />
                        <Sidebar />
                        <Route path="/" component={EventDetails} />
                      </Route>
                    </Switch>
                  </main>
                </AuthProvider>
              </DropdownProvider>
            </ModalProvider>
          </ApolloProvider>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
