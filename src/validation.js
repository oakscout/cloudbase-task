//function for form validation 

export function validation(values){
    
    const errors={};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;  //for email validation
    if(!values.lastName){
        errors.lastName = "Last name is required";
    }
    if(!values.firstName){
        errors.firstName = "First name is required";
    } 
    if(!values.email){
        errors.email = "Email is required";
    } else if (!regex.test(values.email)){
        errors.email = "Email is not valid";
    }
    
    return errors;
    }
