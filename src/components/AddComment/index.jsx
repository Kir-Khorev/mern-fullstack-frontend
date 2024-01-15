import React, { useState } from 'react';
import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from '../../axios';

export const Index = (props) => {
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentSubmit = async (e) => {
    try {
      setIsLoading(true);

      const fields = {
        name: props.user.fullName,
        photo: 'props.user.fullName',
        text: commentText,
        postId: props.postId,
      };

      await axios.post('/comments', fields);
      setCommentText('');

      // console.log('response', response);
      // console.log('Comment created:', response.data);
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsLoading(false);
      setCommentText('');
    }
  };

  return (
    <form className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        src="https://mui.com/static/images/avatar/5.jpg"
      />
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={handleCommentSubmit}
        >
          Send
        </Button>
      </div>
    </form>
  );
};
