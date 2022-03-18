import { useState } from "react";
import { schema, joiDataReorder, timeConverter } from "../../config/formConfig";
import Joi from "joi";
import RegisterPartOne from "./RegisterPartOne";
import RegisterPartTwo from "./RegisterPartTwo";
import RegisterPartThree from "./RegisterPartThree";
import "../Onboarding/register.css";
import Preferences from "./Preferences";

const Register = (props) => {
  const [newUserData, setNewUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [regScreen, setRegScreen] = useState(0);

  const onSubmit = () => {
    const newUserStructured = {
      // add userId
      signUpData: Date.now(),
      personalDetails: {
        name: {
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
        },
        dob: timeConverter(newUserData.dataOfBirth),
        location: { town: newUserData.town, postCode: newUserData.postCode },
        kids: Number(newUserData.haveKids),
        religion: newUserData.religion,
        height: newUserData.height,
        gender: newUserData.gender,
        smokers: Number(newUserData.smokes),
      },
      preferences: {
        lifeStyle: { openToKids: Number(newUserData.kidsAccepted) }, // add other lifestyle
        age: {
          min: Number(newUserData.minAge),
          max: Number(newUserData.maxAge),
        },
        acceptedReligions: newUserData.acceptedReligions,
        height: {},
      },
      login: { email: newUserData.email, password: newUserData.password },
    };
  };

  const onInput = (e) => {
    let value = e.target.value;

    if (e.target.name === "acceptedReligions") {
      const religionArray = [];
      for (let index = 0; index < e.target.selectedOptions.length; index++) {
        religionArray.push(Number(e.target.selectedOptions[index].value));
      }
      value = religionArray;
    }

    if (e.target.name === "genderPref") {
      const genderArray = [];
      for (let index = 0; index < e.target.selectedOptions.length; index++) {
        genderArray.push(Number(e.target.selectedOptions[index].value));
      }
      value = genderArray;
    }

    if (e.target.name === "dateOfBirth") {
      value = new Date(e.target.value).getTime();
    }
    const newState = { ...newUserData, [e.target.name]: value };
    setNewUserData(newState);
    onValidate(newState);
  };

  const onValidate = async (data) => {
    const _joiInstance = Joi.object(schema);
    try {
      // await _joiInstance.validateAsync(data);
      await _joiInstance.validateAsync(data, { abortEarly: false });
      setErrors({ errors: "" });
    } catch (errors) {
      setErrors(joiDataReorder(errors.details));
    }
  };

  console.log(newUserData);
  // console.log(errors);
  return (
    <>
      <div className="containerReg">
        <form
          className="form"
          onInput={onInput}
          onSubmit={onSubmit}
          name="registerForm"
        >
          {regScreen === 0 && (
            <RegisterPartOne
              setRegScreen={setRegScreen}
              errors={errors}
              newUserData={newUserData}
            />
          )}
          {regScreen === 1 && (
            <RegisterPartTwo setRegScreen={setRegScreen} errors={errors} />
          )}
          {regScreen === 2 && (
            <RegisterPartThree setRegScreen={setRegScreen} errors={errors} />
          )}
          {regScreen === 3 && (
            <Preferences setRegScreen={setRegScreen} errors={errors} />
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
