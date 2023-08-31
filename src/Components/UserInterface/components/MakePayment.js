import { useNavigate,useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import useRazorpay from "react-razorpay";
import { useEffect } from "react";

export default function MakePayment(){

const Razorpay = useRazorpay();
const navigate=useNavigate()
const location=useLocation()
const dispatch=useDispatch()

var user=useSelector((state)=>state.user)
var Total=Object.keys(user)

var vendorData=useSelector(state=>state.vendor)
var vendor=Object.values(vendorData)[0]

 const handlePayment = () => {
 // const order = await createOrder(params); //  Create order on your backend

    const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
    amount:Total*100 , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Abode",
    description: "Test Transaction",
    //image: `http://${serverURL}/images/pic.jpg`,
   
    
    handler: (res)=> {

    // dispatch({type:'CLEAR_CART',payload:[]})
     navigate("/home")

    },

    prefill: {
      name: vendor.firstname+" "+vendor.lastname,
     email: vendor.emailid,
     contact:vendor.mobileno,
    },

    notes: {
      address: "Razorpay Corporate Office",
    },

    theme: {
      color: "#3399cc",
    },

  };

  const rzpay = new window.Razorpay(options);
  rzpay.open();
}

  useEffect(function(){
   var timeout=setTimeout(handlePayment,1000)
  },[])

  return(
    <div>
  
    </div>
  )
}