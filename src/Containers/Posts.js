import React,{useEffect,useState,useContext} from 'react'
import ProgressBar from '../Components/ProgressBar'
import {firestore,storage} from '../firebase'
import {makeStyles} from '@material-ui/core/styles'
import {Paper,Button} from '@material-ui/core'
import {Wecontext} from '../Context/Wecontext'
import Comments from '../Components/Comments'
import DisplayComments from '../Components/DisplayComments'
import { motion } from 'framer-motion'
const useStyles = makeStyles((theme)=>({
    postWrap:{

    },
    head:{
        display:"flex",
        justifyContent:"space-between",
        padding:"10px"
    },
    indivisualPost:{
        marginTop:"30px",
     
    },
    caption:{
        padding:"5px 15px 15px 15px"
    },
    commentSection:{

    },
    displayImage:{
        marginBottom:"15px"
    },
    [theme.breakpoints.down('sm')]:{
        caption:{
            padding:"0 15px 15px 15px"
        } ,
        displayImage:{
            marginBottom:"10px"
        }
    }
    
}));

function Posts() {
    const classes = useStyles();
const {user} = useContext(Wecontext);
    const[posts,setPosts]= useState();
const [comments,setComments]= useState();
    useEffect(() => {
        const documentRef= firestore.collection('post');
        documentRef.orderBy('createdAt','desc').onSnapshot((snap)=>{
            let arr=[];
            snap.docs.map(a=>{
             
                arr.push({data:a.data(),id:a.id});
            })
            setPosts(arr);
        });

       
        
    }, [])
    useEffect(() => {
        const commentRef = firestore.collection('comments');
        commentRef.orderBy('createdAt').onSnapshot((snapshot)=>{
            let commentarr=[];
            snapshot.docs.map(a=>{
                commentarr.push({data:a.data(),id:a.id});
            })
            setComments(commentarr);
        })
        
    }, [])
   
    const deletepost = (id,filename,comments)=>{

      firestore.collection('post').doc(id).delete().then(()=>{
            console.log("deleted");
            
        });
         storage.ref(`${filename}`).delete().then(()=>{
            console.log("delete")
        });



    }
    const deleteComment=(id)=>{
        const reference = firestore.collection('comments').doc(id).delete().then(()=>{
            console.log("deleted");
            
        });
    }


    return (
        <div >
           
            <ProgressBar/>

<div className={classes.postWrap}>


{
               posts? <>
               {posts.map(a=>{
                  
                
                  
                  return(
                  
                  <motion.div>
                  <Paper className={classes.indivisualPost} key={a.id}>
                       
                       <div className={classes.head}>
<div className={classes.personalinfo}>
    <div style={{display:"flex",alignItems:"center"}}>
<img src={`${a.data.personimage}`} style={{height:"40px",width:"40px",borderRadius:"50%"}} />
<div style={{marginLeft:"12px",fontSize:"18px"}}>{a.data.personName}</div>
</div>
</div>
<div>
    {
       user? (a.data.email===user.email?(<Button color="secondary" onClick={()=>deletepost(a.id,a.data.filename,comments)}>
        DELETE
        </Button>):""):""
    }

</div>

                       </div>


<div className={classes.displayImage}>
<img src={a.data.imageurl} width="100%" ></img>
</div>
{a.data.caption?(<div className={classes.caption}>

<div>{a.data.caption}</div>

</div>):''}

<div className={classes.commentSection}>

{comments? (comments.map((x)=>{
    if(x.data.postid===a.id){
        return(
            <DisplayComments key={x.id} data={x} style={{  paddingBottom:"10px"}} deleteComment={deleteComment}/>
        )
    }
})) :""}
     
{user? <Comments postdetails={a} />:""  }   
                </div>



</Paper>
</motion.div>
                   )
               })
            }

               
                </>    
               
               :""
               

}




</div>

        </div>
    )
}

export default Posts
