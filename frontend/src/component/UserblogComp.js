import React, { useState } from 'react';
import { useBlogContext } from '../hooks/useBlogContext';
import { Button, Image, Input } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Editable, EditableInput, EditablePreview, useEditableControls } from '@chakra-ui/react';
import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

function UserblogComp({ blog }) {
  const { dispatch } = useBlogContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [editedTitle, setEditedTitle] = useState(blog.title);
  const [editedDesc, setEditedDesc] = useState(blog.desc);

  function EditableControls({ field }) {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    const handleEditSubmit = async () => {
      try {
        const response = await fetch(`/api/blogs/${blog._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ [field]: field === 'title' ? editedTitle : editedDesc }) // Adjust the payload as needed
        });

        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'UPDATE_BLOG', payload: json });
          console.log(`${field} edit successful`);
        } else {
          console.error(`${field} edit failed:`, json.message);
          // Handle error as needed
        }
      } catch (error) {
        console.error(`Error during ${field} edit:`, error);
        // Handle error as needed
      }
    };

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps({ onClick: handleEditSubmit })} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  const handleTitleChange = (value) => {
    setEditedTitle(value);
  };

  const handleDescChange = (value) => {
    setEditedDesc(value);
  };

  const handleTitleBlur = async () => {
    await handleEditSubmit('title', editedTitle);
  };

  const handleDescBlur = async () => {
    await handleEditSubmit('desc', editedDesc);
  };

  const handleEditSubmit = async (field, value) => {
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ [field]: value })
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'UPDATE_BLOG', payload: json });
        console.log(`${field} edit successful`);
      } else {
        console.error(`${field} edit failed:`, json.message);
        // Handle error as needed
      }
    } catch (error) {
      console.error(`Error during ${field} edit:`, error);
      // Handle error as needed
    }
  };

  const handleClick = async () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch(`/api/blogs/${blog._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BLOG', payload: json });
      console.log('Delete successful');
    } else {
      console.error('Delete failed:', json.message);
      // Handle error as needed
    }
  };

  return (
    <div>
      <div key={blog._id}>
        <Image
          src={blog.Image}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
          style={{ height: '229px', width: '333px' }}
        />
         <Button colorScheme='blue' >
          edit image
        </Button>

            
            {/* <label className="addPage-label">
              Blog image:
              <input
                type="file"
                required="required"
                className="addPage-input1"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            {uploadedImageUrl && (
              <img width={80} height={80} src={uploadedImageUrl} alt="" />
            )} */}

        <Editable
          textAlign='center'
          defaultValue={blog.title}
          fontSize='2xl'
          isPreviewFocusable={false}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}  // Handle onBlur event for the title
        >
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls field="title" />
        </Editable>

        <Editable
          textAlign='center'
          defaultValue={blog.desc}
          fontSize='2xl'
          isPreviewFocusable={false}
          onChange={handleDescChange}
          onBlur={handleDescBlur}  // Handle onBlur event for the description
        >
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls field="desc" />
        </Editable>

        <Button colorScheme='blue' onClick={handleClick}>
          Delete
        </Button>
        <Button colorScheme='blue' onClick={() => { setEditedTitle(blog.title); setEditedDesc(blog.desc); }}>
          Complete Edit
        </Button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}

export default UserblogComp;
