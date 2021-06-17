import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Nav from '../Components/Nav'
import Body from '../Containers/Body'

const useStyle= makeStyles((theme)=>({



}));
function Home() {
    const classes = useStyle();
    return (
        <div>
            <Nav/>
            <Body/>
        </div>
    )
}

export default Home
