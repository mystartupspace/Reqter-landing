//make an appropriate behavior for Flat date and time picker components it must behave as a normal input

import React from "react";
import { Button, CardFooter, Card, CardHeader, CardBody } from "reactstrap";
import { SubmitForm, Upload, FilterContents } from "./ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import SuccessSubmit from "./Pages/SuccessSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  FlatInput,
  FlatUploader,
  FlatNumberSet,
  FlatInlineSelect,
  FlatTimePicker,
  FlatDatePicker
} from "./FlatForm/FlatForm";
import LoadingSpinner from "../assets/images/spinner.svg";
import NumberFormat from "react-number-format";
import Validator from "./Validator/Validator";
import "../assets/styles/Coworking.scss";
class SessionRoom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        isValid: false,
        submitted: false,
        isSubmitting: false,
        fields: {
          name: {
            value: "",
            error: "",
            isValid: false
          },
          birthyear: {
            value: "",
            error: "",
            isValid: false
          },
          workingfield: {
            value: "",
            error: "",
            isValid: false
          },
          phonenumber: {
            value: "",
            error: "",
            isValid: false
          },
          city: {
            value: "",
            error: "",
            isValid: false
          },
          seats: {
            value: "",
            error: "",
            isValid: false
          },
          email: {
            value: "",
            error: "",
            isValid: false
          },
          resume: {
            uploadProgress: 0,
            value: "",
            error: "",
            isValid: false
          },
          country: {
            value: "5d35e8288e6e9a0017c28fcf",
            error: "",
            isValid: false
          }
        }
      },
      combo: {
        list_of_cities: {
          hasLoaded: false,
          items: []
        },
        coworking_working_field: {
          hasLoaded: false,
          items: []
        }
      }
    };
    this.validationRules = {
      name: ["required"],
      birthyear: ["required", "number"],
      educationfield: ["required"],
      phonenumber: ["required", "phonenumber"],
      city: ["required"],
      seats: ["required", "number"],
      email: ["email"]
    };
  }

  checkFormValidation = () => {
    const fields = this.state.form.fields;
    let boolean = true;
    for (let key in fields) {
      if (!fields[key].isValid) {
        boolean = false;
        break;
      }
    }
    this.setState({
      form: {
        ...this.state.form,
        isValid: boolean
      }
    });
  };
  checkboxStateHandler = (name, data) => {
    const checkBoxValuesArr = [];
    data.forEach(val => {
      checkBoxValuesArr.push(val.key);
    });
    const validation = Validator(checkBoxValuesArr, this.validationRules[name]);
    let toBeAssignObject = {
      error: validation.message,
      isValid: validation.valid
    };
    //if value is valid then assign value to form state
    if (validation.valid) {
      toBeAssignObject.value = checkBoxValuesArr;
    }
    this.setState(
      {
        form: {
          fields: {
            ...this.state.form.fields,
            [name]: {
              ...this.state.form.fields[name],
              ...toBeAssignObject
            }
          }
        }
      },
      () => {
        this.checkFormValidation();
      }
    );
  };
  dateStateHandler = (date, name) => {
    console.log(date);
  };
  formStateHandler = e => {
    let _this = e.target ? e.target : e;
    const name = _this.name;
    const value = _this.value;
    const validation = Validator(value, this.validationRules[name]);
    this.setState(
      {
        form: {
          ...this.state.form,
          fields: {
            ...this.state.form.fields,
            [name]: {
              ...this.state.form.fields[name],
              value: value,
              error: validation.message,
              isValid: validation.valid
            }
          }
        }
      },
      () => this.checkFormValidation()
    );
  };
  submitForm = () => {
    const inputs = this.state.form.fields;
    let _isValid = true;
    const _fields = {};
    const _formObjectGoingToSubmit = {};
    let _validation = {};
    for (let index in inputs) {
      _formObjectGoingToSubmit[index] = inputs[index].value;
      _validation = Validator(inputs[index].value, this.validationRules[index]);
      if (!_validation.valid) {
        _isValid = false;
        _fields[index] = {
          value: inputs[index].value,
          error: _validation.message,
          isValid: false
        };
      }
    }
    this.setState({
      form: {
        ...this.state.form,
        isValid: _isValid,
        fields: {
          ...this.state.form.fields,
          ..._fields
        }
      }
    });
    //if the form was valid then submit it
    if (_isValid) {
      this.setState(
        {
          form: {
            ...this.state.form,
            isSubmitting: true
          }
        },
        () => {
          SubmitForm("session_room", _formObjectGoingToSubmit, res => {
            if (res.code === 200) {
              this.setState({
                form: {
                  ...this.state.form,
                  submitted: true
                }
              });
            } else {
              this.setState({
                form: {
                  ...this.state.form,
                  isSubmitting: false
                }
              });
            }
          });
        }
      );
    }
  };
  uploadFile = e => {
    Upload(
      e.target.files[0],
      res => {
        if (res.data.success) {
          this.setState({
            form: {
              ...this.state.form,
              fields: {
                ...this.state.form.fields,
                resume: {
                  ...this.state.form.fields.resume,
                  isValid: true,
                  value: [{ en: res.data.file.url, fa: res.data.file.url }]
                }
              }
            }
          });
        } else {
          this.setState({
            form: {
              ...this.state.form,
              fields: {
                ...this.state.form.fields,
                resume: {
                  ...this.state.form.fields.resume,
                  error: res.success_result.message
                }
              }
            }
          });
        }
      },
      res => {
        this.setState({
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              resume: {
                ...this.state.form.fields.resume,
                uploadProgress: res.progress
              }
            }
          }
        });
      }
    );
  };

  urlParser = url => {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  };

  generateCheckboxDataFromApi = (name, defaultChecked) => {
    FilterContents(name, res => {
      const arr = [];
      res.data.map((val, key) => {
        arr.push({
          title: val.fields.name.fa,
          key: val._id,
          boxValue: key + 1,
          dir: "rtl",
          value: val._id,
          defaultChecked: defaultChecked && defaultChecked === val._id
        });
        return null;
      });
      this.setState({
        combo: {
          ...this.state.combo,
          [name]: {
            hasLoaded: true,
            items: arr
          }
        }
      });
    });
  };
  componentDidMount() {
    const exportedUrlParams = this.urlParser(this.props.location.search);
    const selectedCity = exportedUrlParams.city,
      neededSeats = exportedUrlParams.seats;
    this.setState({
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          seats: {
            ...this.state.form.fields.seats,
            value: !isNaN(Number(neededSeats)) && neededSeats,
            isValid: !isNaN(Number(neededSeats))
          },
          city: {
            ...this.state.form.fields.city,
            value: selectedCity,
            isValid: selectedCity && true
          }
        }
      }
    });
    this.generateCheckboxDataFromApi("list_of_cities", selectedCity);
    this.generateCheckboxDataFromApi("coworking_working_field");
  }
  render() {
    return (
      <section
        className="form-section rtl-layout"
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {this.state.form.submitted ? (
          <Card className="form-card">
            <SuccessSubmit />
          </Card>
        ) : (
          <React.Fragment>
            <Card className="form-card">
              <section id="form1" className="wizardForm show">
                <CardHeader>
                  <span className="fa-layers fa-fw icon">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      pull="right"
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>فرم درخواست اتاق جلسات</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  <FlatInput
                    label="نام و نام خانوادگی"
                    type="text"
                    placeholder="نام و نام خانوادگی را وارد کنید"
                    name="name"
                    id="name"
                    autoFocus
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.name.error}
                  />
                  <div className="field-row">
                    <span className="field-title">زمان جلسه</span>
                    <br />
                    <br />
                    <div
                      className="FlatTimePicker"
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      {/* <FlatDatePicker onChange={this.dateStateHandler} /> */}

                      {/* <FlatTimePicker onChange={this.dateStateHandler} /> */}
                      <NumberFormat
                        mask="_"
                        format="####/##/##"
                        type="text"
                        style={{ direction: "ltr", textAlign: "left" }}
                      />
                    </div>
                  </div>
                  <FlatInput
                    label="سال تولد"
                    type="number"
                    max={9999}
                    min={1270}
                    placeholder="مثال : 1359"
                    name="birthyear"
                    id="birthyear"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.birthyear.error}
                  />
                  <div className="field-row">
                    <span className="field-title">حوزه فعالیت</span>

                    {/* fill checkboxes */}
                    {this.state.combo.coworking_working_field.hasLoaded ? (
                      <FlatInlineSelect
                        type="checkbox"
                        items={this.state.combo.coworking_working_field.items}
                        onChange={this.checkboxStateHandler}
                        dir="rtl"
                        name="workingfield"
                      />
                    ) : (
                      <Skeleton count={5} style={{ lineHeight: 2 }} />
                    )}
                    <span className="error-message">
                      {this.state.form.fields.workingfield.error}
                    </span>
                  </div>
                  <div className="contact-section">
                    <FlatInput
                      label="شماره تماس"
                      type="text"
                      placeholder="شماره تماس خود را وارد کنید"
                      name="phonenumber"
                      id="phonenumber"
                      onChange={this.formStateHandler}
                      error={this.state.form.fields.phonenumber.error}
                    />
                    <FlatInput
                      label="ایمیل"
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                      name="email"
                      id="email"
                      onChange={this.formStateHandler}
                      error={this.state.form.fields.email.error}
                    />
                  </div>
                  <div className="field-row">
                    <span className="field-title">شهر</span>

                    {/* fill checkboxes */}
                    {this.state.combo.list_of_cities.hasLoaded ? (
                      <FlatInlineSelect
                        type="radio"
                        items={this.state.combo.list_of_cities.items}
                        onChange={this.checkboxStateHandler}
                        dir="rtl"
                        name="city"
                      />
                    ) : (
                      <Skeleton count={2} style={{ lineHeight: 2 }} />
                    )}
                    <span className="error-message">
                      {this.state.form.fields.city.error}
                    </span>
                  </div>
                  <FlatNumberSet
                    label="تعداد صندلی"
                    type="number"
                    range={[1, 10]}
                    defaultValue={this.state.form.fields.seats.value}
                    name="seats"
                    id="seats"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.seats.error}
                  />
                  <FlatUploader
                    label="آپلود رزومه"
                    name="resume"
                    id="resume"
                    placeholder="یک فایل انتخاب کنید"
                    progress={this.state.form.fields.resume.uploadProgress}
                    progresscolor="lightblue"
                    onChange={this.uploadFile}
                    error={this.state.form.fields.resume.error}
                  />
                </CardBody>
              </section>
              <CardFooter>
                <Button
                  className="navigation-button submit"
                  onClick={() => this.submitForm()}
                >
                  {this.state.form.isSubmitting ? (
                    <img
                      src={LoadingSpinner}
                      alt=""
                      style={{ margin: "-12px 16px" }}
                    />
                  ) : (
                    "ثبت و ارسال "
                  )}
                </Button>
              </CardFooter>
            </Card>
          </React.Fragment>
        )}
      </section>
    );
  }
}

export default SessionRoom;
