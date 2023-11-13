import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Submit = () => {
  const navigate = useNavigate();
  const [secret, setSecret] = useState("");
  


  return (
    <div className="container">
      <div className="jumbotron centered">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="secret-text">
          Don&apos;t keep your secrets, share them anonymously!
        </p>

        <form action="/submit" method="POST">
          <div className="form-group">
            <input
              type="text"
              className="form-control text-center"
              name="secret"
              placeholder="What's your secret?"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={(e)=>{
              e.preventDefault();
              console.log("Submitting secret...");
              axios.post("/api/submit", {secret: secret})
              .then((res)=>{
                console.log(res);
                navigate("/secrets");
              })
              .catch((err)=>{
                if(err.response.status === 409) {
                  console.log("Secret already exists.");
                }
                else if (err.response.status === 401) {
                  console.log("Not authenticated");
                  navigate("/login");
                }
                else {
                  console.log("There was a problem");
                }
              })
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Submit;
