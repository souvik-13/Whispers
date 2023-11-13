import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  async function buttonClicked(e) {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    axios({
      method: "post",
      url: "/api/login",
      data: data,
    })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setTimeout(() => {
          navigate("/secrets");
        }, 3000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // console.log("Wrong username or password");
          axios.post("/api/logout");
          setWrongCredentials(true);
          navigate("/login");
        } else {
          // console.log("There was a problem");
          navigate("/login");
        }
      });
  }

  useEffect(() => {
    if (!loading) {
      // console.log("User logged in");
    }
  });

  return (
    <div className="login-page grid grid-cols-1 gap-4">
      <div className="container mt-5">
        <h1>Login</h1>

        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                {/* <!-- Makes POST request to /login route --> */}
                <form action="/login" method="POST">
                  <div className="form-group">
                    <label htmlFor="email">Username</label>
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
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* <!-- <div className="col-sm-4">
      <div className="card">
        <div className="card-body">
          <a className="btn btn-block" href="/auth/google" role="button">
            <i className="fab fa-google"></i>
            Sign In with Google
          </a>
        </div>
      </div>
    </div> --> */}
        </div>
      </div>
      {!loading ? (
        <div className="alert alert-success text-center" role="alert">
          <div>
            <i className="fas fa-check-circle fa-3x"></i>
            <p>Logged in successfully. Redirecting to secrets...</p>
          </div>
        </div>
      ) : null}
      {wrongCredentials ? (
        <div className="alert alert-danger text-center" role="alert">
          <div>
            <i className="fas fa-times-circle fa-3x"></i>
            <p>Wrong username or password</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
