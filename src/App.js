import Login from "./components/Login";
import Browse from "./components/Browse";
import { createBrowserRouter,createRoutesFromElements ,Route ,RouterProvider} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login/>}/>
      <Route path="/browse" element={<Browse/>}/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
