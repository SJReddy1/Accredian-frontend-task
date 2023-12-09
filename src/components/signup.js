import React , { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 10 }
    
    const [showPassword, setShowPassword] = useState(false);
      
        const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
        };
        const [values,setValues]=useState({
          name: '',
          email: '',
          gender: '',
          phone: '',
          password: '',
          cp:''
        });
        const navigate = useNavigate();
        const handleChange = (prop) => (event) => {
          setValues({ ...values, [prop]: event.target.value });
        };
      
        const handleSubmit = (event) => {
          event.preventDefault();
          if (
            values.name.trim() === '' ||
            values.email.trim() === '' ||
            values.gender.trim() === '' ||
            values.phone.trim() === '' ||
            values.password.trim() === ''
          ) {
            alert('Please fill in all the required fields.');
            return;
          }
          axios.post('http://localhost:8081/register', values)
          .then((res) => {
            if (res.data.Status === "Success") {
              alert("You have Registered Successfully");
              setValues({
                name: '',
                email: '',
                gender: '',
                phone: '',
                password: '',
                cp:''
              });
              // Optionally, navigate to another page after successful registration
              // navigate('/login'); // Import 'navigate' from 'react-router-dom'
            } else {
              alert(res.data.Error);
            }
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
            alert('An error occurred while processing your request. Please try again later.');
          });
        };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label='Name' placeholder="Enter your name" value={values.name}
            onChange={handleChange('name')}/>
                    <TextField fullWidth label='Email' placeholder="Enter your email" style={marginTop} value={values.email}
            onChange={handleChange('email')}/>
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="Gender" name="gender" style={{ display: 'initial' }} value={values.gender}
              onChange={handleChange('gender')}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone' placeholder="Enter your phone number" value={values.phone} 
            onChange={handleChange('phone')}/>
                    <TextField fullWidth label='Password' placeholder="Enter your password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange('password')}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}style={marginTop}/> 
                    
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" type={showPassword ? 'text' : 'password'} value={values.cp} onChange={handleChange('cp')}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}style={marginTop}/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;