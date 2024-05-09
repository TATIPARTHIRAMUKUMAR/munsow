import React, { useEffect } from 'react';
import { Paper, Typography, Grid, Card, CardContent, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadDetailedQuestionBanks } from '../../../redux/action';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OptionIcon from '@mui/icons-material/RadioButtonChecked';

const QuestionBankView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailedQuestionBank } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(loadDetailedQuestionBanks(id));
  }, [dispatch, id]);

  return (
    <Box className="min-h-screen pt-5 pb-20" sx={{ background: '#f9f9f9' }}>
      <Grid container justifyContent="center">
        <Grid item xs={24} md={12} lg={10}>
          <Paper elevation={1} sx={{ m: 3, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h3" gutterBottom color="primary">
              {detailedQuestionBank?.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Created on: {detailedQuestionBank?.created_date}
            </Typography>
            <Typography variant="body1" paragraph>
              {detailedQuestionBank?.description}
            </Typography>
            <Divider light />

            {detailedQuestionBank?.questions?.map((question, index) => (
              <Card key={index} sx={{ my: 4, boxShadow: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <QuizIcon color="primary" /> {index + 1} : {question.question}
                  </Typography>
                  {/* <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                    {question.question}
                  </Typography> */}
                  <List>
                    {question.options.map((option, idx) => (
                      <ListItem key={idx} sx={{ p: 1 }}>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>{idx + 1}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={option} />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body2" color="success.main">
                    <CheckCircleOutlineIcon /> Correct Answer : {question.correctAnswer.join(', ')}
                  </Typography>
                </CardContent>
                <Divider variant="middle" />
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionBankView;
