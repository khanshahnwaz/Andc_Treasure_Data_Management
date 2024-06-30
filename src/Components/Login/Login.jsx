import { Link, useNavigate } from "react-router-dom";
import remove from "../Assets/remove.png";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { PublicationContext } from "../../Context/PublicationState";
import Error from "../Modals/Error";
import Successful from "../Modals/Successful";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Loader from "../Loader/Loader";
const Login = () => {
  const context = useContext(PublicationContext);
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false); // to track if any modal(success or error) is open to execute mouseup even attached in form efficiently
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  // state to manage the error tooltip for every input box
  const [visiEmail, setViisiEmail] = useState(false);
  const [visiPassword, setVisiPassword] = useState(false);

  //  close the form on clicking anywhere
  function closeForm(e) {
    console.log(
      "Mouseup event is triggered in login form and modal condition is ",
      context.errorMessage
    );
    var container = document.getElementById("container");
    let errorBox=document.getElementById('errorBox')
    let successBox=document.getElementById('successBox')
    // whenever modal box is open to indicate successfull login or signup and we click on it this even is triggered which is not intented
    if (
      container &&
      !container.contains(e.target) && !errorBox && !successBox
      
    ) {
      // container.style.display = 'none';
      navigate("/");
    }
  }
  useEffect(
    () => document.addEventListener("mouseup", (e) => closeForm(e)),
    []
  );

  // Formik library
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email";
      }
      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log("submitted data in login form ", values);
      // once form is submitted either success or error modal will be opened for sure
      //   document.removeEventListener('mouseup',(e)=>closeForm(e))
      setFlag(true);
      const data = {
        Email: values.email,

        Password: values.password,
      };
      setLoader(true);
      // console.log("sent data",JSON.stringify(data))
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}home/faculty/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      setLoader(false);
      const result = await response.json();

      console.log(result.Message);
      // result.status===200?localStorage.setItem({token:result.token}):null
      if (result.status === 200) {
        localStorage.setItem("token", result.token);
        context.setSuccessMessage(result.Message);
        context.setCurrentUser(result.data);
        localStorage.setItem("data", JSON.stringify(result.data));
      } else {
        context.setErrorMessage(result.Message);
      }
      // navigateToHome();
    },
  });

  // useEffect(()=>{
  //     console.log("flag condition is",flag)
  //     if(flag){
  //         console.log("removing eventlistener")
  //         document.removeEventListener('mouseup',(e)=>closeForm(e))
  //     }

  // },[flag])

  useEffect(() => {
    if (formik.errors.email && formik.touched.email) {
      setViisiEmail(true);
    } else setViisiEmail(false);
    if (formik.errors.password && formik.touched.password) {
      setVisiPassword(true);
    } else setVisiPassword(false);
  }, [formik]);
  return (
    <>
      <Error url="/login" closeForm={closeForm} />
      <Successful url="/" />
            {/* <!-- Overlay element --> */}

      <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-700 bg-opacity-60"></div>

      <div
        id="container"
        className="flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-6 sm:p-10 lg:w-[50%] h-1/2 lg:h-4/5 w-[90%] "
      >
        <img
          src={remove}
          alt="remove"
          className="float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10 cursor-pointer"
          onClick={navigateToHome}
        />
        <Loader loader={loader} />

        {/* left division */}
        <div className="h-dvh bg-gradient-to-br from-[#7e22ce] to-[#a26bcd]  border-white rounded-lg shadow-lg w-[350px] hidden md:grid grid-flow-row ">
          <p className="text-left text-base font-bold text-white pl-10 mt-4">
            Andc_Treasure
          </p>
          <p className="text-2xl tracking-wider text-left lg:mt-10 p-10 text-white font-bold">
            Resume your <br /> journey with us
          </p>
          <p className="text-sm mt-2 text-left px-10 text-gray-200">
            Discover world best community of freelancers and business owners.
          </p>
          <div className=" lg:mt-44 p-3 lg:py-5 lg:px-5 lg:pb-4 mx-10 bg-[#5c1e7e] font-semibold lg:font-bold  text-left text-gray-200 h-dvh rounded-lg shadow-lg text-sm">
            Simply unbelievable! I am absolutely satisfied with my business.
            This is absolutely wonderful.
          </div>
        </div>
        {/* right division */}
        <div className="bg-white h-full w-[100%] lg:w-[50%] ">
          <div className="mt-5 p-5 lg:p-10 mb-0">
            <p className="text-left text-2xl font-bold tracking-wide text-[#7e22ce]">
              Login
            </p>
            <p className="mt-2 text-sm tracking-wide text-left font-semibold">
              Don't have an account?
              <Link to="/signUp">
                <span className="text-[#7e22c3]">Register</span>
              </Link>
            </p>
          </div>
          <div className="-mt-8 lg:pl-10 p-5 ">
            {/* Form section  */}

            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="float-left text-[#7e22ce] font-bold"
                  >
                    Email
                  </label>
                  <br />
                  <Tippy
                    visible={visiEmail}
                    content={formik.errors.email}
                    placement="top-end"
                  >
                    <input
                      type="text"
                      className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    ></input>
                  </Tippy>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="float-left text-[#7e22ce] font-bold"
                  >
                    Password
                  </label>
                  <br />
                  <Tippy
                    visible={visiPassword}
                    content={formik.errors.password}
                    placement="top-end"
                  >
                    <input
                      type="text"
                      className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    ></input>
                  </Tippy>
                </div>
              </div>

              {/* Forgot password section */}
              <p className="mb-2 text-sm tracking-wide text-left font-semibold text-[#7e22c3] cursor-pointer hover:opacity-50">
                Forgot your password?
              </p>

              <button
                type="submit"
                className=" font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
