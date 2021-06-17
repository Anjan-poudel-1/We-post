export const postreducer = (state,action)=>{

    console.log(action.type)
    switch(action.type){
        case 'LOADING_AUTHENTICATION':return{
            ...state,
            loading:true
        }
        case 'AUTH_SUCCESS':return{
            ...state,
            loading:false,
            user:action.payload
        }
        case 'AUTH_FAILED':
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case 'Clear_File':
    
                return{
                    ...state,
                    file:null,
                }
            case 'SET_FILE':
                console.log("setting the file")
                return{
                    ...state,
                    file:action.payload
                }
        case 'LOGOUT_SUCCESS':
            return{
                ...state,
                loading:false,
                user:null
            }
      
            

        default:return state
    }

}