import { useState, useEffect } from "react"
import {useNavigate, useParams} from 'react-router-dom'

function Cliente() {

    let{id} = useParams();

    const navigate = useNavigate();

    const [cadastro, setCadastro]=useState({
        id,
        nome:"",
        email:""
    })

    const handleChange=(e)=>{
        setCadastro({...cadastro,[e.target.name]:e.target.value})};

    const handleSubmit =(e)=>{
    e.preventDefault();
    fetch(`http://localhost:5000/${id ? id :""}`,{
        method:"post",
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify(cadastro)
    }).then(()=>{
        navigate("/")
    })      
    }

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:5000/${id}`)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                setCadastro(data)
            })
        }
    },[id])

    return (
      <>

        <form onSubmit={handleSubmit}>

            <input 
            type="text"
            name="nome"
            placeholder="Nome"
            value={cadastro.nome}
            onChange={handleChange}
            />

            <input
            type="email"
            name="email"
            placeholder="Email"
            value={cadastro.email}
            onChange={handleChange}
            />

            <button type="submit">Submit</button>

        </form>
      </>
    )
  }
  
  export default Cliente
  