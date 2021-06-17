import React,{useState,useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button } from '@material-ui/core';
import {firestore,timestamp} from '../firebase'
import {Wecontext} from '../Context/Wecontext'
const useStyle = makeStyles((theme)=>({
    wrap:{
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        padding:" 5px 20px 10px 20px",
        borderTop:"2px solid #F2F0EE"
    },
    emojipicker:{
        position:"absolute",
        
    }
}));

function Comments(props) {
    
const classes = useStyle();
const[comment,SetComment]= useState('');
const {user} = useContext(Wecontext);
const commentchangeHandler=(event)=>{
SetComment(event.target.value)
}

const commentPosthandler = (postdetails)=>{
    let postid= postdetails.id

let Documentref = firestore.collection('comments');
Documentref.add({
    postid,
    postdata:postdetails.data,
    comment:comment,
    email:user.email,
    createdAt:timestamp()
})
SetComment('');
}



    return (
        <div className={classes.wrap}>
            <textarea value={comment} placeholder="Write a comment..." onChange={commentchangeHandler} style={{border:"none",outline:"none",resize:"none",width:"80%",height:"100%"}}>

            </textarea>
<Button color="primary" disabled={comment?false:true} onClick={()=>commentPosthandler(props.postdetails)}>Post</Button>
        </div>
    )
}

export default Comments
