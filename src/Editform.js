import { useForm } from "react-hook-form"
import React from "react"

const EditForm = (props)=>{
    const {user} = props
    console.log("user edit",user);
    const { register, handleSubmit ,reset} = useForm()
    const handleEdituser=(data)=>{
        console.log("handleEdituser : ",{...data,id:user.id});
        
    }
    return(<>
         <form onSubmit={handleSubmit(handleEdituser)}>
                <input type="text" {...register("name", { required: true, })} defaultValue={user.name} />
                 <button>
                  update
                  </button> 
              </form>
    </>)
}
export default EditForm;