import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import {useBlogContext} from '../hooks/useBlogContext'


function BlogForm() {
  const{dispatch}= useBlogContext()
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(null);
  const [emptyFeilds, setemptyFeilds]= useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, desc };
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setemptyFeilds(json.emptyFeilds)
    }
    if (response.ok) {
      setTitle('');
      setDesc('');
      setError(null);
      setemptyFeilds([])
      console.log('new blog created', json);
      dispatch({type:'CREATE _BLOG', payload: json})
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <h3>
              <Input variant="filled" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} 
              // className={emptyFeilds.includes('title') ? 'error':''}
              />
            </h3>
            <Input  variant="outline" placeholder="Blog description" onChange={(e) => setDesc(e.target.value)} value={desc}
            // className={emptyFeilds.includes('desc') ? 'error':''}
            />
          </div>
        </div>
        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
}

export default BlogForm;
