import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import AdminDashBoard from "./Components/Administrator/adminLogin/AdminDashBoard";
import AdminLoginInterface from "./Components/Administrator/adminLogin/AdminLoginInterface";

import Vendor from "./Components/vendorScreen/Vendor";
import VendorProperties from "./Components/vendorScreen/VendorProperties";
import VendorSubProperties from "./Components/vendorScreen/VendorSubProperties";
import VendorThirdPage from "./Components/vendorScreen/VendorThirdPage";
import VendorAddress from "./Components/vendorScreen/VendorAddress";
import VendorGuest from "./Components/vendorScreen/VendorGuest";
import VendorAmenities from "./Components/vendorScreen/VendorAmenities";
import VendorPicture from "./Components/vendorScreen/VendorPicture";
import VendorFinalPage from "./Components/vendorScreen/VendorFinalPage";

import Home from "./Components/UserInterface/screens/Home";
import VendorScreen from "./Components/UserInterface/screens/VendorScreen";
import ShowStates from "./Components/UserInterface/screens/ShowStates";
import ShowProperty from "./Components/UserInterface/screens/ShowProperty";
import PropertyScreen from "./Components/UserInterface/screens/PropertyScreen";
import Payment from "./Components/UserInterface/screens/Payment";
import MakePayment from "./Components/UserInterface/components/MakePayment";

import UserDataPage from "./Components/UserInterface/screens/UserDataPage";



function App() {
  return (
    <div >
      <Router>
        <Routes>
        <Route element={<AdminLoginInterface />} path="/adminlogininterface" />
        <Route element={<AdminDashBoard />} path="/admindashboard/*" />
          
        
        <Route element={<Vendor />} path="/vendor" />
        <Route element={<VendorProperties />} path="/vendorproperties" />
        <Route element={<VendorSubProperties />} path="/vendorsubproperties" />
        <Route element={<VendorThirdPage  />} path="/vendorthirdpage" />
        <Route element={<VendorAddress  />} path="/vendoraddress" />
        <Route element={<VendorGuest  />} path="/vendorguest" />
        <Route element={<VendorAmenities />} path="/vendoramenities" />
        <Route element={<VendorPicture />} path="/vendorpicture" />
        <Route element={<VendorFinalPage />} path="/vendorfinalpage" />
        
        <Route element={<Home />} path="/home" />
        <Route element={<VendorScreen />} path="/vendorscreen" />
        <Route element={<ShowStates />} path="/showstates" />
        <Route element={<ShowProperty />} path="/showproperty" />
        <Route element={<PropertyScreen />} path="/propertyscreen" />
        <Route element={<Payment />} path="/payment" />
        <Route element={<MakePayment />} path="/makepayment" />

        <Route element={<UserDataPage/>} path="/userdatapage" />

        </Routes>
      </Router>    
    </div>
  );
}

export default App;
