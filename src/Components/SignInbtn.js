import React,{useContext} from 'react'
import { Button} from '@material-ui/core';
import {Wecontext} from '../Context/Wecontext'
function SignInbtn(props) {

    const {SignIn} = useContext(Wecontext);

    return (
        <Button variant="contained" color="secondary" onClick={SignIn}>
 {props.label}
        </Button>
    )
}

export default SignInbtn
