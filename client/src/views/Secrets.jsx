import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Secrets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [secrets, setSecrets] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function getSecrets() {
      try {
        const response = await axios.get("/api/secrets");
        console.log(response.data);
        if (response.data.length === 0) {
          console.log("No secrets found");
        } else {
          setSecrets(response.data);
        }
        setLoading(false);
      } catch (err) {
        if (err.response.status === 401) {
          console.log("Not authenticated");
          navigate("/login");
        } else {
          console.log("There was a problem");
        }
      }
    }
    getSecrets();
  }, [navigate]);

  return (
    <div>
      <div className="jumbotron text-center">
        <div className="container">
          <i className="fas fa-key fa-6x"></i>
          <h1 className="display-3">You&apos;ve Discovered My Secret!</h1>
          {loading ? (
            <p className="lead">Loading...</p>
          ) : secrets === null ? (
            <div>
              <i className="fas fa-sad-tear fa-6x"></i>
              <p className="lead">No secrets found</p>
            </div>
          ) : (
            secrets.map((secret) => {
              return (
                <p className="lead" key={secret._id}>
                  {secret.secret}
                </p>
              );
            })
          )}

          <hr />

          <a
            className="btn btn-light btn-lg m-[1vw]"
            role="button"
            onClick={() => {
              axios.post("/api/logout");
              navigate("/");
            }}
          >
            Log Out
          </a>
          <a
            className="btn btn-dark btn-lg m-[1vw]"
            href="/submit"
            role="button"
          >
            Submit a Secret
          </a>
        </div>
      </div>
    </div>
  );
};

export default Secrets;
