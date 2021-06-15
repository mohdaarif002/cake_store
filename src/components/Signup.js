import React, { useState } from "react";
import axios from "axios";
import Wrapper from "../UI/Wrapper";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const url = "https://apifromashu.herokuapp.com/api/register";
    const data = { name: name, email: email, password: password };
    axios
      .post(url, data)
      .then((response) => console.warn("register response date--> ", response))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  return (
    <Wrapper title='Signup Page'>
    <div class="container">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="email" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </Wrapper>
  );
}

export default Signup;
