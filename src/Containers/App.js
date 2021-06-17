import React,{useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Home from '../Pages/Home'
import {WeProvider} from '../Context/Wecontext'
import Loading from '../Components/Loading'
const useStyle= makeStyles((theme)=>({
root:{
  backgroundColor:"#F2F0EE"
},
loader:{
  height:"100vh",
  width:"100vw",
  position:"fixed",
  overflow:"hidden",
  backgroundColor:"#F2F0EE",
  zIndex:"999",
  display:"flex",
  justifyContent:"center",
 
}


}));
function App() {
const [loader,setloader]= useState(true);
  const classes = useStyle();

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setloader(false)
    }, 5000)
    return () => {
      clearTimeout(timeId)
    }
  }, [])
  return (
    <WeProvider>

 <div className={classes.root}>
  <div className={classes.loader} style={loader?{opacity:"1"}:{height:"0",width:"0",opcity:"0"}}>
  <Loading/>
    </div>
     <Home/>
    </div>

    </WeProvider>
   
  )
}

export default App
