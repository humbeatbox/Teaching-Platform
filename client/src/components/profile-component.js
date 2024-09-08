const ProfileComponent = ({ currentUser }) => {
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>You need to Login first!</div>}
      {currentUser && (
        <div>
          <h2>Personal Information</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Name : {currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>user ID : {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Register Email : {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Identity : {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
