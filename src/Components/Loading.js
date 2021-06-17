import React from 'react'
import styles from './Loading.module.css'
function Loading() {
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div className={styles.roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
