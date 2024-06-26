import { useEffect, useState, useContext } from "react";
import { app } from "firebaseAPP";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // 현재 firbase의 사용자 로그인 여부 체크
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "context/ThemeContext";

import Router from "./components/Router";
import Loader from "components/Loader";

function App() {
  const context = useContext(ThemeContext);
  const auth = getAuth(app); // getAuth는 app을 넣어야 작동함.
  // auth를 체크하기 전에 (initialize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  // auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  // auth의 관찰자 역할 (state 업데이트를 위한 것임)
  useEffect(() => {
    // 현재 로그인한 사용자 가져오기
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <div className={context.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;
