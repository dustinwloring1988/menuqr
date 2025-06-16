import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QRListPage from './pages/QRListPage';
import NewQRPage from './pages/NewQRPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/qr" exact component={QRListPage} />
        <Route path="/qr/new" exact component={NewQRPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;