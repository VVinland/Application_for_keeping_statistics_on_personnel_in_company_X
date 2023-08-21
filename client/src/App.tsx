import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/appRouter/AppRouter";
import { useContext, useEffect } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import './style/commonStyle.css';

function App() {
  const { user } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      user.checkAuth();
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
