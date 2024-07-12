import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "~/Routes";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
