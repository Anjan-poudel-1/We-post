import React,{useState,useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Paper,Button, Typography } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {Wecontext} from '../Context/Wecontext'
const useStyles = makeStyles((theme)=>({
    textarea:{
        resize:"none",
        height:"50px",
        width:"90%",
    
        outline:"none",
        border:"none",
        padding:"0 10px",
        [theme.breakpoints.down('sm')]:{
height:"40px",
paddingBottom:"0"
        }
    },
    footer:{
        display:"flex",
        justifyContent:"space-between",
       
    },
    showfile:{
        padding:"10px 0"
    }


}));

function Uploadpost() {
    const classes = useStyles();

const {storeImage} = useContext(Wecontext);

    const [file,Setfile] = useState(null);
const[error,SetError] = useState('');
const[imageURL,SetImageURL] = useState(null);

const [caption,setCaption] = useState('');
    const onFileChange = (event)=>{
        let inputfile = event.target.files[0];
        console.log(inputfile);
        let type = ['image/png','image/jpg','image/jpeg'];
        if(inputfile && type.includes(inputfile.type)){

var selectedImageURL = URL.createObjectURL(inputfile);
console.log(selectedImageURL);
Setfile(inputfile);
SetImageURL(selectedImageURL);

}
        else{
            Setfile(null);
            SetError("Please upload an image file only!");
        }

    }
    const deleteFileuploaded = ()=>{
        Setfile(null)
    }

    const handleCaptionChange= (event)=>{
        setCaption(event.target.value)
    }


    const uploadPostHandler= ()=>{
        if(file){
            storeImage(file,caption);
            Setfile(null);
            setCaption('');
            SetError('')
        }
        
      
    }


    return (
        <div className={classes.wrap}>
            <Paper style={{padding:"20px"}} elevation={3}>
                <p style={{fontSize:"30px",padding:"0",margin:"0"}}>Create A Post</p> <br/>
                <textarea placeholder="Write a caption..." 
                className={classes.textarea} 
                onChange={handleCaptionChange}
                value={caption}>

                </textarea>

                <div >
                {file?
                (
                <div className={classes.showfile}>
                    
                    
                   
    <img src={imageURL} height="120px" style={{borderRadius:"10px"}}/>
                    
                    <Button variant="text" color="primary" 
                    style={{fontSize:"12px"}}
                    onClick={deleteFileuploaded}>
                        Remove</Button>
                </div>)
                :
                <Typography color="secondary" style={{padding:"10px 0"}}>
                    {error}
                    </Typography>
                    }
                </div>
               
                
                <div className={classes.footer}>
                    <label htmlFor="content_upload">
                    <AddAPhotoIcon  style={{cursor:"pointer"}}/>
                    </label>

                    <input id="content_upload" type="file" 
                    style={{opacity:"0",height:"0",width:"0"}}
                    onChange={onFileChange}>

                    </input>
                <Button disabled={file?false:true} onClick={uploadPostHandler}>Upload</Button>
                </div>
                
            </Paper>
        </div>
    )
}

export default Uploadpost
