import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import {Navigate, redirect} from "react-router-dom";




export const Login = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppRootStateType, boolean>( state => state.auth.isLoggedIn);

    const formik = useFormik({

        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'почта не заполнена'
                }
            }
            if (!values.password) {
                return {
                    email: 'пароль не заполнена'
                }
            }
        },

        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
           dispatch(loginTC(values))
        },
    });

    if(isLoggedIn) {
        return <Navigate to={"/"}/>;
    }

    return <Grid container justify='center'>
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox/>}
                        {...formik.getFieldProps("rememberMe")}
                        checked={formik.values.rememberMe}

                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}
