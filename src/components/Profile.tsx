import { Button, Form, Input, DatePicker, Alert } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import Default from "../images/Default.png";
import "./Profile.css";

const Profile: React.FC = () => {
  const history = useHistory();
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    setFileInputState(e.target.value);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const imageUrl = reader.result?.toString();
      setPreviewSource(imageUrl!);
    };
  };

  const onFinish = (values: any) => {
    setShowAlert(true);
    const user = {
      name: values.name,
      DOB: values.DOB.format("YYYY-MM-DD"),
      height: values.height,
      religion: values.religion,
      imageUrl: previewSource,
    };
    console.log(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    history.push("/login");
  };

  const inputFile = useRef<any>(null);
  const onButtonClick = () => {
    inputFile.current?.click();
  };

  const handleRemove = () => {
    setFileInputState("");
    setPreviewSource("");
  };

  return (
    <div className="main1">
      <div className="inner-main1">
        {showAlert ? (
          <Alert
            className="alert"
            message="Saved"
            type="success"
            showIcon
            onClose={() => setShowAlert(false)}
            closable
          />
        ) : null}
        <h1>My Profile</h1>
        <Form
          className="form"
          layout="vertical"
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item>
            <div className="image-con">
              <img
                alt="user"
                className="user-image"
                src={previewSource === "" ? Default : previewSource}
              />
              <input
                style={{ display: "none" }}
                accept=".png, .jpeg, .jpg"
                name="imageUrl"
                onChange={handleFileInputChange}
                value={fileInputState}
                id="file"
                type="file"
                ref={inputFile}
              />
              <div className="button-grp">
                <Button
                  size="small"
                  className="upload-button"
                  type="primary"
                  onClick={onButtonClick}
                >
                  Upload
                </Button>
                <Button size="small" danger onClick={handleRemove}>
                  Remove
                </Button>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="DOB"
            rules={[
              { required: true, message: "Please input your Date of Birth!" },
            ]}
          >
            <DatePicker className="date-picker" />
          </Form.Item>

          <Form.Item
            label="Religion"
            name="religion"
            rules={[{ required: true, message: "Please input your religion" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Height (in cm)"
            name="height"
            rules={[{ required: true, message: "Please input your height" }]}
          >
            <Input type="number" addonAfter="cm" className="input-number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
        <Button className="logout-button" onClick={handleLogout} danger>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
