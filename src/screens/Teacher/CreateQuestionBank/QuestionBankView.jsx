import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
  Container,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadDetailedQuestionBanks } from '../../../redux/action';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const QuestionBankView = () => {
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { detailedQuestionBank } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadDetailedQuestionBanks(id));
  }, [dispatch, id]);

  const handleBack = () => {
    history(-1);
  };

  return (
    <Box className="min-h-screen pt-5 pb-20" sx={{ background: '#f0f2f5' }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
              <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
                <IconButton onClick={handleBack} color="primary" sx={{ mr: 2 }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
                  {detailedQuestionBank?.name}
                </Typography>
              </Box>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
                Created on: {new Date(detailedQuestionBank?.created_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" paragraph>
                {detailedQuestionBank?.description}
              </Typography>
              <Divider light sx={{ mb: 3 }} />

              {detailedQuestionBank?.questions?.map((question, index) => (
                <Card key={index} sx={{ my: 3, boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                      <QuizIcon color="primary" sx={{ mr: 1 }} /> {index + 1}. {question.question}
                    </Typography>
                    <List>
                      {question.options.map((option, idx) => (
                        <ListItem
                          key={idx}
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            mb: 1,
                            backgroundColor: '#f9f9f9',
                            '&:hover': { backgroundColor: '#e0e0e0' },
                          }}
                        >
                          <ListItemIcon>
                            <Avatar
                              sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                width: 28,
                                height: 28,
                                fontSize: 16,
                              }}
                            >
                              {String.fromCharCode(65 + idx)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText primary={option} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                      <CheckCircleOutlineIcon sx={{ mr: 1 }} /> Correct Answer: {question.correctAnswer.join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default QuestionBankView;
