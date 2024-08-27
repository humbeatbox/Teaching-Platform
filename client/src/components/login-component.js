const LoginComponent = (props) => {
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div className="form-group">
          <label htmlFor="username">Email : </label>
          <input type="text" className="form-control" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input type="password" className="form-control" name="password" />
        </div>
        <br />
        <div className="form-group">
          <button className="btn btn-primary btn-block">
            <span>Log in</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
