import { Button } from '@material-ui/core'
import React from 'react'

const Dashboard = () => {
    const user = localStorage.getItem("user")
    function logout() {
        localStorage.removeItem("user")
        // window.location.reload();
    }
    return (
        <div>
            <Button 
            onClick={logout}>
                Logout
            </Button>
        </div>
    )
}

export default Dashboard
