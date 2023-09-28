import { useEffect, useState } from "react";
import { Category } from "../../models/category";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "../pages.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Reducers/configureStore";
import { FieldValues, useForm } from "react-hook-form";
import { FormControl } from "react-bootstrap";
import { registerUser } from "../../Reducers/AccountSlice";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(registerUser(data));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("https://localhost:7267/api/Categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <>
      <Navbar categories={categories} totalItemsCount={0} />
      <Header headerText="Registration" subText="" />
      <section
        className="vh-100 py-5 background"
        style={{
          backgroundImage:
            'url("https://madawaskadoors.ca/wp-content/uploads/2021/11/What-Is-Oak-Wood-The-Complete-Guide-To-Solid-Oak-Wood.jpeg")',
        }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <FormControl
                              type="text"
                              className="form-control"
                              {...register("username", {
                                required: "User Name is required",
                              })}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your User Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <FormControl
                              type="email"
                              className="form-control"
                              {...register("email", {
                                required: "Email is required",
                              })}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <FormControl
                              type="password"
                              className="form-control"
                              {...register("password", {
                                required: "password is required",
                              })}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleSubmit(submitForm)}
                            disabled={!isValid}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      {" "}
                      <img
                        src={
                          "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        }
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
