import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAssignedUsers, updateUsers } from '../../../redux/action';
import CourseOverview from '../CourseOverview';
import AssignUsers from '../AssignUsers';
import AssignTable from './AssignTable';
import AssignTable2 from './AssignTable2';
import { Tab, Tabs, Box, Paper, Button, Typography } from '@mui/material';

const CourseEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { assignedUsers, unAssignedUsers, detailedCourse } = useSelector((state) => state?.data);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [courseData, setCoursedata] = useState({});

    useEffect(() => {
        dispatch(loadAssignedUsers(id));
    }, [dispatch, id]);

    useEffect(() => {
        console.log("setAssigned", assignedUsers, unAssignedUsers);
    }, [assignedUsers]);

    useEffect(() => {
        console.log("selectedRows", selectedRows, courseData);
    }, [selectedRows]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleUnassignSelected = () => {
        const payload = {
            course_id: parseInt(id),
            user_ids: selectedRows,
        };

        dispatch(updateUsers("course/unassign", payload, (resp) => {
            // dispatch(loadAssignedUsers(id));
            navigate(-1)
        }));

        console.log("Unassigning selected users:", selectedRows);
    };

    const handleAssignSelected = () => {
        const payload = {
            course_id: parseInt(id),
            user_ids: selectedRows,
        };

        dispatch(updateUsers("course/assign", payload, (resp) => {
            navigate(-1)
        }));

        console.log("Assigning selected users:", selectedRows);
    };

    return (
        <div className="p-4">
            <CourseOverview course={detailedCourse} show={false} text={"Back to Course Details"} />
            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                    <Tab label="Assigned Users" />
                    <Tab label="Unassigned Users" />
                </Tabs>
                <TabPanel value={selectedTab} index={0}>
                    <Box mt={2} mb={3}>
                        <Button variant="contained" color="primary" onClick={handleUnassignSelected} disabled={selectedRows.length === 0}>
                            Unassign Course to Selected Users
                        </Button>
                    </Box>
                    {assignedUsers?.length > 0 && (
                        <AssignTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} courseData={courseData} setCoursedata={setCoursedata} studentsList={assignedUsers} />
                    )}
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <Box mt={2} mb={3}>
                        <Button variant="contained" color="primary" onClick={handleAssignSelected} disabled={selectedRows.length === 0}>
                            Assign Course to Selected Users
                        </Button>
                    </Box>
                    {unAssignedUsers?.length > 0 && (
                        <AssignTable2 selectedRows={selectedRows} setSelectedRows={setSelectedRows} courseData={courseData} setCoursedata={setCoursedata} studentsList={unAssignedUsers} />
                    )}
                </TabPanel>
            </Paper>
        </div>
    );
};

const TabPanel = ({ children, value, index }) => (
    <Box hidden={value !== index} sx={{ p: 3 }}>
        {children}
    </Box>
);

export default CourseEdit;
