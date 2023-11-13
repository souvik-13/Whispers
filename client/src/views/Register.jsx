import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userSaved, setUserSaved] = useState(false);
  const [userExists, setUserExists] = useState(false);

  async function buttonClicked(e) {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
    };
    async function registerUser() {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post("/api/register", data);
        // console.log(response);
        setUserSaved(true);
        setTimeout(() => {
          navigate("/secrets");
        }, 3000);
      } catch (err) {
        if (err.response.status === 500) {
          // console.log("There was a problem with the server");
          console.log(err.response.data);
        } else if (err.response.status === 409) {
          // console.log("User already exists");
          setUserExists(true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      }
    }
    registerUser();
  }

  useEffect(() => {
    if (userSaved) {
      // console.log("User saved");
    }
  });

  return (
    <div className="register-content">
      <div className="container mt-5">
        <h1>Register</h1>

        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                {/* <!-- Makes POST request to /register route --> */}
                <form action="/api/register" method="POST">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={buttonClicked}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- If user is saved to database, show this alert --> */}
      {userSaved && (
        <div className="alert alert-success text-center" role="alert">
          <div>
            <i className="fas fa-check"></i> User saved. Redirecting to secrets
            page...
          </div>
        </div>
      )}

      {/* <!-- If user already exists, show this alert --> */}
      {userExists && (
        <div className="alert alert-info text-center" role="alert">
          <div>
            <i className="fas fa-times"></i> User already exists. Redirecting
            to login page...
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
