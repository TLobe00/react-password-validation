import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [inputFields, setInputFields] = useState({
    password: "",
    passwordVerify: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const validateValues = (inputValues) => {
    let errors = {};
    let tmpErrors = {};
    if (inputValues.password.length < 6) {
      tmpErrors.iLength = "Password must be at least 6 characters";
    }
    if (!containsUpperCase(inputValues.password)) {
      tmpErrors.iUpperCase = "Password must contain an upper case letter";
    }
    if (!containsLowerCase(inputValues.password)) {
      tmpErrors.iLowerCase = "Password must contain a lower case letter";
    }
    if (!containsNumber(inputValues.password)) {
      tmpErrors.iNumber = "Password must contain a number";
    }
    if (!containsSpecial(inputValues.password)) {
      tmpErrors.iSpecial = "Password must contain a special character";
    }
    if (inputValues.password !== inputValues.passwordVerify) {
      errors.passwordVerify = "Passwords do not match";
    }
    if (Object.keys(tmpErrors).length !== 0) {
      errors.password = tmpErrors;
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    console.log(inputFields);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <div className="App">
      {Object.keys(errors).length === 0 && submitting ? (
        <span className="success">Successfully submitted ✓</span>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          value={inputFields.password}
          onChange={handleChange}
        ></input>
        {errors.password ? (
            <p className="error">
              {Object.entries(errors.password).map(([key,val]) => (  
                <ul>
                  <li key={key}>{val}</li>
                </ul>
              ))}
            </p>
          ) : null}
        <br />
        <label for="passwordVerify">Verify Password</label>
        <input
          type="password"
          name="passwordVerify"
          value={inputFields.passwordVerify}
          onChange={handleChange}
        ></input>
          {errors.passwordVerify ? (
            <p className="error">
              <ul><li key="notMatch">{errors.passwordVerify}</li></ul>
            </p>
          ) : null}
        <br />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function containsUpperCase(str) {
  let isUpperCaseChk = false;
  if (str.length > 0 && str.match(/[A-Z]/)) {
    let i = 0;
    for (; i < str.length; i++) {
      if (str.charAt(i) === str.charAt(i).toUpperCase()) {
          return true;
      }
    }
    return isUpperCaseChk;
  } else {
    return isUpperCaseChk;
  }
}

function containsLowerCase(str) {
  let isLowerCaseChk = false;
  if (str.length > 0 && str.match(/[a-z]/)) {
    let i = 0;
    for (; i < str.length; i++) {
      if (str.charAt(i) === str.charAt(i).toLowerCase()) {
          return true;
      }
    }
    return isLowerCaseChk;
  } else {
    return isLowerCaseChk;
  }
}

function containsNumber(str) {
  if (str.length > 0) {
    if (str.match(/\d/)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function containsSpecial(str) {
  let specialChars = ['!','@','#','$','%','^','&','*','(',')','_','-','+','=','{','[','}',']','|',':',';','"','\'','<',',','>','.'];
  let strSplit = str.split('');
  if (str.length > 0) {
    if (strSplit.find(strItem => specialChars.includes(strItem))) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export default App;
