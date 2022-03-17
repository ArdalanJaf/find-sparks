const RegisterPartOne = (props) => {
  const {
    email: emailErrors,
    password: passwordErrors,
    firstName: firstNameErrors,
    lastName: lastNameErrors,
  } = props.errors;

  console.log(props.newUserData);

  return (
    <>
      <div>
        <h1>Registration form</h1>
        <div className="formRow">
          <label>
            Email Address:
            <input type="email" placeholder="Email" name="email" />
            <p>{emailErrors}</p>
          </label>
        </div>
        <div className="formRow">
          <label>
            Password:
            <input
              type="password"
              placeholder="Password (8 characters minimum)"
              name="password"
              minLength="8"
              required
            />
            <p>{passwordErrors}</p>
          </label>
        </div>
        <div className="formRow">
          <label>
            First Name:
            <input type="name" placeholder="First Name" name="firstName" />
          </label>
          <p>{firstNameErrors}</p>
        </div>
        <div className="formRow">
          <label>
            Last Name:
            <input type="name" placeholder="Last Name" name="lastName" />
          </label>
          <p>{lastNameErrors}</p>
        </div>
        <nav>
          {Object.keys(props.newUserData).length > 1 &&
            emailErrors === undefined &&
            passwordErrors === undefined &&
            firstNameErrors === undefined && (
              <button
                className="nextButton"
                onClick={() => props.setRegScreen(1)}
              >
                Next
              </button>
            )}
        </nav>
      </div>
    </>
  );
};

export default RegisterPartOne;
