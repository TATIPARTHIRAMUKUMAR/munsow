import { Provider } from "react-redux";
import store from "./redux/store";
import Url_Routes from "./Url_Routes";

// toast
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {

  return (
    <Provider store={store}>
      <Url_Routes />
      <ToastContainer
        transition={Slide}
        autoClose={2000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}

