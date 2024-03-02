import { Fragment, useEffect, useRef, useState } from "react";
 
import './Form.css'
import * as tf from '@tensorflow/tfjs'
import * as qna from "@tensorflow-models/qna"
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import Loader from 'react-loader-spinner'
 
 function Form(){

    const passageRef = useRef(null)
    const questionRef= useRef(null)
    //state management
    const[model,setModel] =useState(null);
    const[answer,setAnswer]=useState()

   // ##### Tensor-Flow Model ######
       const loadModel = async() =>{
        const loadModel = await qna.load()
        setModel(loadModel)
        console.log("Model Downloaded successfully!")
       }
       useEffect(() =>{
        loadModel()
       },[])
   // state management
 const[form,setForm] = useState({});
//  const[users,setUsers] =useState([]) for mapping and debugging
     

    const handleForm = (e) =>{
        // console.log(e.target.value,e.target.name);
        setForm({
            ...form,// destructure the previous values
            [e.target.name]:e.target.value
        })
    }

    // handling submit event
    const handleSubmit = async (e) =>{
        e.preventDefault()
       const response =  await fetch('http://localhost:8000/api/form',{
            method:'POST',
            body:JSON.stringify(form),
            headers:{
                "Content-Type":'application/json'
            }

        })
       const data = await  response.json()
        console.log(data)
        
    }
    // to fetch the saved data

    const getUsers =  async() =>{
        const response = await fetch('http://localhost:8000/api/form',{
            method:'GET'
        })
        const data = await response.json()
         console.log(data)
        // setUsers(data) for mapping/debugging
    }

    // function for answer or queries
    const answerQuestion = async(e)=>{
        if(model !==null && e.which===13){
            console.log('Your question submitted successfully')
            const passage = passageRef.current.value
            const question = questionRef.current.value
            const answers = await model.findAnswers(question,passage)
            setAnswer(answers)
            console.log(answers)
        }
    }

    useEffect(() =>{
       getUsers()
    },[])

    return (
        <>
        
        <div className="main">
            <form onSubmit={handleSubmit} className="frm">
                {/* <p>{JSON.stringify(form)}</p> */}  
                <span className="first">FirstName</span><br/>
                <input className="firstin" type="text"  name="firstname"  onChange={handleForm} ></input><br/>
                <span className="last">LastName</span><br/>
                <input className="lastin" type="text"  name="lastname" onChange={handleForm}></input><br/>
                <span className="gender"> What is your Gender ?</span><br/>
                <input  className="genderin" type="text" name="gender" onChange={handleForm}></input><br/>
                <span  className="blood">What is your Blood Group ?</span><br/>
                <input className="bloodin" type="text" name="bg" onChange={handleForm}></input><br/>
                <span className="disease">Name the Disease from which you suffered in past ?</span><br/>
                <input className="dieseasein" type="text" name="disease" onChange={handleForm} ></input><br/>
                <input className="btn" type="submit"></input>

            </form>

            {   model ==null ?
                <div>
                    <div>Model </div>
                </div>
                :
                <Fragment>
                    <span className="di"><h1>Passage For the Disease</h1></span><br/> {/* Brief context for the the disease .  */}
                    <textarea  className="txt" ref={passageRef} rows="10" cols="100" placeholder="context-Segment" ></textarea><br/>
                     <span className="qs"><h3>Enter your question ? </h3> </span><br/>
                    <input  className="txt" ref = {questionRef} onKeyPress={answerQuestion} size="60"/>
                    Answer
                    {answer ? answer.map((ans,idx) => <div><h3>Answer {idx+1} -  </h3>{ans.text} {ans.score} </div>):""  }
                </Fragment>

            }
        </div>
        {/* <div>
            <ul>
                {users.map(user=><li key={user._id} >{user.firstname},{user.lastname}</li>)}
            </ul>
        </div> */}
        
        </>
    )
 }

 export default Form