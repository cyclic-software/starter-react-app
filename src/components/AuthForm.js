import React from "react";

export default function AuthForm(props) {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: { username, password },
    setShowModal,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <div className="button-box">
        <button>{btnText}</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </div>
      <p style={{ color: "red" }}>{errMsg}</p>
    </form>
  );
}
