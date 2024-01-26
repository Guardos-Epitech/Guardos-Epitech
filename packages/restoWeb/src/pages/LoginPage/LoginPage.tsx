import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "@src/utils/NavigateTo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "shared/components/Layout/Layout";
import axios from 'axios';
import styles from "@src/pages/LoginPage/LoginPage.module.scss";

interface LoginUser {
  username: string;
  password: string;
}

const initialUserState = {
  username: '',
  password: '',
};

const Login = () => {
  const [user, setUser] = useState<LoginUser>(initialUserState);
  const [errorForm, setErrorForm] = useState(false);
  const navigate = useNavigate();
  const baseUrl = `${process.env.DB_HOST}${process.env.DB_HOST_PORT}/api/login/restoWeb`;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle registration logic here
    try {
      const dataStorage = JSON.stringify({
        username: user.username,
        password: user.password
      });
      const response = await axios({
          method: 'POST',
          url: baseUrl,
          data: dataStorage,
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if (response.data === 'Invalid Access') {
        setErrorForm(true);
        localStorage.removeItem('user');
      } else {
        localStorage.setItem('user', response.data);
        setErrorForm(false);
        NavigateTo("/", navigate, {
          loginName: user.username
        })
      }
    } catch (error) {
        console.error(`Error in Post Route: ${error}`);
        throw error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Layout>
        <div className={styles.loginForm}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username or Email"
              name="username"
              value={user.username}
              onChange={handleChange}
              margin="normal"
              error={errorForm}
              helperText={errorForm ? 'Invalid Logindata' : ''}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              margin="normal"
              error={errorForm}
              helperText={errorForm ? 'Invalid Logindata' : ''}
            />
            <Button type="submit" variant="contained" color="primary" size='large'>
              Login
            </Button>
            <p className={styles.registerInfo}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't you have an account yet? Register yourself <a className={styles.registerLink} onClick={() => NavigateTo('/register', navigate, {})}>here</a>.
            </p>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;