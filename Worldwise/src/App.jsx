import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import('./pages/AppLayout'));

import SpinnerFullPage from "./components/SpinnerFullPage";


import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";


import { CitiesProvider } from "./contexts/citiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";

import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage/>}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
            <Route path="/app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
          }>
            <Route path="cities/:id" element={<City />} />
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
            </Routes>
            </Suspense>
      </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
  );
}

export default App;
