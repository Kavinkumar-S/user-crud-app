import "./App.css";
 import { useForm } from "react-hook-form"
import { useReducer,useState } from "react";
import EditForm from "./Editform";
function App() {

    const [isedit,setIsedit] = useState(false)


  const intialusers = [
    {
      id: Date.now(),
      name: "dhoni",
    },
  ];

  const reducer = (state, action) => {
    console.log("state before swicth", state);

    switch (action.type) {
      case "AddUser":
        console.log("AddtoCart state : ", state);
        console.log("AddtoCart action : ", action);
      // let value
      return [...state,action.dataobj]
      case "DeleteUser":
      console.log("DeleteUser state",state);
      console.log(" DeleteUser action",action);

      return state.filter(user=>
        {if(user.id !== action.userid ) 
        {
          return user
        }
        }
        )

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, intialusers);

  console.log("state", state);
  const { register, handleSubmit ,reset} = useForm()
  const handleAdduser = (data) => {
   let dataobj=  {
     id: Date.now()
     ,
    ...data
  }
  console.log(dataobj,"dataobj"); 
   dispatch({type:"AddUser",dataobj})

  reset();
  }

  const handleDelete=(userid)=>{
    console.log("userid : ",userid);
    dispatch({
      type:"DeleteUser",
      userid:userid
    })
  }
  return (
    <>
      <div className="p-5 m-5">
        <div className="container m-5">
          <div className="row">
            <div className="col-md-7 m-auto">
              <h4 className="text-center">Users List App</h4>

              <form className="text-center mt-4" onSubmit={handleSubmit(handleAdduser)}>
                <input type="text"  {...register("name", { required: true, })}/>
                <button>Add</button>
              </form>

          {
            state.map(user=>
            <div className="user-container d-flex justify-content-around align-items-center mt-3">
             
             { isedit ? 
         
              <EditForm user={user}  />
              :
              <p>
                {user.name}
              </p>
              
              }
             
              <button onClick={()=>setIsedit(true)}>
              edit
              </button>
              <p className="close-btn" 
              onClick={()=>{
                handleDelete(user.id)
              }}
              >
                X
              </p>
          </div>)}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
