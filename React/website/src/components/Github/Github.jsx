import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData()    
  return (
    <>
    <div>Github followers:{data.followers}</div>
    <img src={data.avatar_url} />
   </>
)
}

export default Github

export const githubInfoLoader = async ()=>{
    const response = await fetch("https://api.github.com/users/shubhanshukaintura")
    return response.json()
}