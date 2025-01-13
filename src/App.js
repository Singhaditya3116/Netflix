import Login from "./components/Login";
import Browse from "./components/Browse";
import MovieRecommendation from "./components/MovieRecommendation";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/movie" element={<MovieRecommendation/>} />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
