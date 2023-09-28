import { useEffect, useState } from "react";
import { Category } from "../../models/category";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "../pages.css";
import { FieldValues, useForm } from "react-hook-form";
import { Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Reducers/configureStore";
import { loginUser } from "../../Reducers/AccountSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(loginUser(data));
      navigate("/");
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
      <Header headerText="Login Page" subText="" />
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
                        Log In
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
                            {!!errors.username && (
                              <Form.Text style={{ color: "red" }}>
                                Invalid User Name
                              </Form.Text>
                            )}
                            {!!!errors.username && (
                              <label
                                className="form-label"
                                htmlFor="form3Example1c"
                              >
                                User Name
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <FormControl
                              type="password"
                              className="form-control"
                              {...register("password", {
                                required: "Password is required",
                              })}
                            />
                            {!!errors.password && (
                              <Form.Text style={{ color: "red" }}>
                                Invalid Password
                              </Form.Text>
                            )}
                            {!!!errors.password && (
                              <label
                                className="form-label"
                                htmlFor="form3Example3c"
                              >
                                Password
                              </label>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleSubmit(submitForm)}
                            disabled={!isValid}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <p>
                          Don't have an account?{" "}
                          <a href="register" className="link-info">
                            Register here
                          </a>
                        </p>
                      </div>
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

export default Login;
