import React from 'react'
import { useBlogContext } from '../hooks/useBlogContext';
import { Button } from '@chakra-ui/react';


function UserblogComp({blog}) {
    const {dispatch}= useBlogContext()
    const handleClick= async()=>{
        const response= await fetch('/api/blogs/'+blog._id,{
            method:'DELETE'
        })
        const json = await response.json()
        if(response.ok){
          dispatch({type:'DELETE_BLOG', payload: json})
          console.log('responce is ok')
        }
      }
  return (
    <div>
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.desc}</p>
          <Button colorScheme="blue" onClick={handleClick}>
        delete
      </Button>
        </div>
  </div>
  )
}

export default UserblogComp