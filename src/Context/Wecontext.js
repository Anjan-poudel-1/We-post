import react,{useEffect,useState,createContext,useReducer,useContext} from 'react'
import { postreducer } from './postreducer';
import {auth,provider,storage,firestore,timestamp} from '../firebase'



export const Wecontext = createContext();

export const WeProvider = (props)=>{
    const[userdata,setUserdata]= useState(null);
 
const[filename,Setfilename] = useState(null);
const[progress,Setprogress]= useState(null);
const[url,setURL]= useState(null);
const [islogged,isloggedHandler]= useState(false)
    let inititalState= {

        loading:false,
        user:userdata,
        error:null,
        signedIn:false,
        file:null
    }

   
    const [state,dispatch] = useReducer(postreducer,inititalState);






useEffect(() => {

    let tempUserdata=localStorage.getItem("userdata")?JSON.parse(localStorage.getItem("userdata")):null;
    
    dispatch({type:'AUTH_SUCCESS',payload:tempUserdata});
},[]);
useEffect(() => {
   
    localStorage.setItem("userdata",JSON.stringify(userdata));
}, [userdata])


//LOGIN AND LOGOUT FUNCTIONALITY

 const SignIn = async()=>{

dispatch({type:'LOADING_AUTHENTICATION'});

    await auth.signInWithPopup(provider).then(
        (res)=>{
            console.log(res.user);
            dispatch({type:'AUTH_SUCCESS',payload:res.user});
            setUserdata(res.user)
            isloggedHandler(true);
        }
    ).catch((error)=>{
console.log(error)
dispatch({type:'AUTH_FAILED',payload:error})
    });

    
           

}


 const logout = async()=>{
   localStorage.setItem('url',null);
    await auth.signOut().then(
      ()=>{
          console.log("logout success");
          dispatch({type:'LOGOUT_SUCCESS'});
          setUserdata(null);
          isloggedHandler(false);
      }  
    ).catch((error)=>{
        console.log("Not logout success")
    })
}


//POST UPLOAD FUNCTIONALITY
//storage
const dispatchsetfile=(fileinput)=>{
    dispatch({type:'SET_FILE',payload:fileinput});
    const newId = Date.now();
const newIdStr = newId.toString()
const newFilename = newIdStr.concat(fileinput.name);
    Setfilename(newFilename);
}

const storeImage = (fileinput,caption)=>{
    dispatchsetfile(fileinput)
const newId = Date.now();
const newIdStr = newId.toString()
const newFilename = newIdStr.concat(fileinput.name);

let Storageref = storage.ref(newFilename);
let Documentref = firestore.collection('post')
console.log()
Storageref.put(fileinput).on('state_changed',

(snap)=>{
    let percent = (snap.bytesTransferred/snap.totalBytes)*100
    Setprogress(percent);

},(err)=>{
    console.log(err);
},async()=>{
    const urlobtained = await Storageref.getDownloadURL();
Documentref.add({
    caption:caption,
    imageurl:urlobtained,
    personimage:state.user.photoURL,
    personName:state.user.displayName,
    createdAt:timestamp(),
    filename:filename,
   email:state.user.email
})
    setURL(urlobtained);
}

)
dispatch({type:'Clear_File'});
setURL(null)
}






    let value={
        SignIn,
        logout,
        storeImage,
        setUserdata,
        filename,
        url,
        progress,
        loading:state.loading,
        user:state.user,
        error:state.error,
        file:state.file
    }

    return(
        <Wecontext.Provider value={value}>
            {props.children}
        </Wecontext.Provider>
    )
}