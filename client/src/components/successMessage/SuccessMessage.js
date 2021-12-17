import { Alert } from "@mui/material"


const SuccesMessage = (props) => {
    return (
        <Alert severity="success">{props.success}</Alert>
    )
}

export default SuccesMessage
