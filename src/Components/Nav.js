import React,{useContext,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';
import SignInbtn from './SignInbtn'
import {Wecontext} from '../Context/Wecontext'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';



const useStyle= makeStyles((theme)=>({

    wrap:{
       
        display:"flex",
        justifyContent:"space-between",
        height:"70px",
        width:"80%",
      margin:"auto",
      alignItems:"center",
     [theme.breakpoints.down('xs')]:{
       width:"90%"
     }
    },
    titlewrap:{
     fontFamily:   'Pacifico',
     
    },
    myimage:{
        height:"40px",
        width:"40px",
        borderRadius:"50%",
cursor:"pointer",
opacity:"1",
transition:"0.3s",
'&:hover': {
    opacity: "0.8",
 }
    },
    root: {
        display: 'flex',
      },
      paper: {
        marginRight: theme.spacing(2),
      },
      
      

}));
function Nav() {
  const {user,logout,setUserdata} = useContext(Wecontext);
  useEffect(() => {
   
    
   
   if(user){
   
    setUserdata(user)
   }
     
 
  },[user])

    const classes = useStyle();
   
    let imageURL;
    if(user){
        imageURL= user.photoURL;
    }



    const [open, setOpen] = React.useState(false);
    
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleLogout = (event)=>{
        handleClose(event);
        logout();

    }

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  




    return (
        <div  style={{ backgroundColor:"#fff"}}>

<div className={classes.wrap}>
           <div style={{display:"flex"}}><Typography variant="h4" className={classes.titlewrap} style={{color:"#4A4A4A"}}>WE</Typography>
           <Typography variant="h4" className={classes.titlewrap} style={{color:"#2DACCD"}}>Post</Typography>
            </div>
            {user? 

            <>
            
 
<img src={`${imageURL}`}
 className={classes.myimage}
 ref={anchorRef}
 aria-controls={open ? 'menu-list-grow' : undefined}
 aria-haspopup="true"
 onClick={handleToggle}/>

<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
 {({ TransitionProps, placement }) => (
   <Grow
     {...TransitionProps}
     style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
   >
     <Paper>
       <ClickAwayListener onClickAway={handleClose}>
         <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
         
         <Typography style={{textAlign:"center",padding:"10px"}} color="textSecondary">
               {`${user.displayName}`}
            </Typography>
        
           

           <MenuItem onClick={handleLogout} style={{textAlign:"center"}}>Logout</MenuItem>
         </MenuList>
       </ClickAwayListener>
     </Paper>
   </Grow>
 )}
</Popper>
</>
            :<div className={classes.signinbtn}>
            <SignInbtn className={classes.btn} label="Sign In"/>
            </div>
            }
        </div>
        </div>
       
    )
}

export default Nav
