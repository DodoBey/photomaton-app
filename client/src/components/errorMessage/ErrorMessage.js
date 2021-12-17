import { Alert } from "@mui/material"


const ErrorMessage = (props) => {
    return (
        <Alert severity="error">{props.error}</Alert>
    )
}

export default ErrorMessage
