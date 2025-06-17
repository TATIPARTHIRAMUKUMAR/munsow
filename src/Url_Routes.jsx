import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/Login/Login";
import HeaderFooterLayout from "./HeaderFooterLayout";
import Profile from "./screens/Profile";
import Users from "./screens/Users";
import GLOBAL_CONSTANTS from "../GlobalConstants";
import QuizListing from "./screens/QuizListing";
import Register from "./screens/Login/Register";
import StudentLogin from "./screens/Login/StudentLogin";
import StudentRegister from "./screens/Login/StudentRegister";
import Summary from "./screens/Admin/Summary";
import Students from "./screens/Admin/Students/Students";
import Teachers from "./screens/Admin/Teachers/Teachers";
import AdminDashboard from "./screens/Admin/Dashboard/Dashboard";
import AddStudents from "./screens/Admin/AddStudents/AddStudents";
import AddTeachers from "./screens/Admin/AddTeachers/AddTeachers";
// import UserReport from "./screens/UserReport/UserReport";
import StudentDashboard from "./screens/Student Dashboard/StudentDashboard";
import EmotionSensing from "../src/screens/Admin/Analysis/EmotionSensing/EmotionSensing";
import StepperComponent from "./screens/PracticeNow/Practice";
import NotificationsPage from "./screens/Notifications/Notifications";
import SettingsPage from "./screens/StudentSettings/Settings";
import HelpAndSupportPage from "./screens/Help/Help";
import KSAnalysis from "./screens/Admin/Analysis/KSAnalysis";
import Skills from "./screens/Admin/Analysis/Skills";
import BehaviourAnalysis from "./screens/Admin/Analysis/BehaviourAnalysis";
import PracticalThinking from "./screens/Admin/Analysis/PracticalThinking";
import HelpSupportAdmin from "./screens/Help/AdminHelp";
import SettingsPageAdmin from "./screens/AdminSettings/Settings";
// import ReportIndex from "./screens/UserReport/ReportsList";
import LoadQuestionsData from "./screens/PracticeNow/LoadQuestionsData";
import LoadResultsData from "./screens/PracticeNow/LoadResultsData";
import VideoAnalysis from "./screens/NewUserReport/VideoAnalysis";
import SpeechAnalysis from "./screens/NewUserReport/SpeechAnalysis";
import Configurations from "./screens/Admin/Configurations/Configurations";
import QuestionBankForm from "./screens/Teacher/CreateQuestionBank/CreateQuestionBank";
// import TopicandSubtopic from "./screens/Course/Topic/TopicandSubtopic";
import TopicSubtopic from "./screens/Course/TopicSubtopic/TopicSubtopic";
import CustomStepperComponent from "./screens/Course/CourseStepper";
import TeacherLogin from "./screens/Login/TeacherLogin";
import ComingSoonPage from "./screens/ComingSoon";
import CourseList from "./screens/Course/CourseList";
import CourseView from "./screens/Course/CourseView/CourseView";
import StudentCourseView from "./screens/Course/StudentCourseView/CourseView";
import StudentCourseList from "./screens/Course/StudentCourseView/StudentCourseList";
import CourseEdit from "./screens/Course/StudentCourseView/CourseEdit";
// import CourseView from "./screens/Course/CourseView";
import NewUserReport from "./screens/NewUserReport/NewUserReport";
import ReportIndex from "./screens/NewUserReport/ReportsList";
import ScreeningUserRegister from "./screens/Login/ScreeningUserRegister";
import LinksList from "./screens/Admin/ScreeningUsers/LinksList";
import CreateLink from "./screens/Admin/ScreeningUsers/CreateLink";
import StudentDashboardScreenig from "./screens/Student Dashboard/StudentDashboard-Screening";
import QuestionBanksList from "./screens/Teacher/CreateQuestionBank/QuestionBankList";
import QuestionBankView from "./screens/Teacher/CreateQuestionBank/QuestionBankView";
import EnhancedTable from "./screens/Admin/Placements";
import Placements from "./screens/Admin/Placements";
import StudentQuizList from "./screens/Quiz/StudentQuizView/StudentQuizList";
import QuizPage from "./screens/Quiz/QuizPage";
import AssignmentList from "./screens/Assignments/AssignmentsList";
import CreateAssignment from "./screens/Assignments/CreateAssignment";

import AssignmentView from "./screens/Quiz/ResultsView";

import HardSkills from "./screens/Admin/Analysis/HardSkills";
import SoftSkills from "./screens/Admin/Analysis/SoftSkills";

import StudentMRCLM from "./screens/MRCLM/StudentMRCLM";
import TopicBrief from "./screens/MRCLM/TopicBrief";
import QuizBrief from "./screens/MRCLM/QuizBrief";

function Url_Routes() {
  return (
    <BrowserRouter>
      <Routes>
        {
          (GLOBAL_CONSTANTS?.loggedIn || true) &&
          <>
            {
              GLOBAL_CONSTANTS?.user_cred?.role_id == 1 ? <>
                <Route exact path="/quiz" element={<HeaderFooterLayout Component={<QuizListing />} />} />
                <Route exact path="/users" element={<HeaderFooterLayout Component={<Users />} />} />
                <Route exact path="/profile" element={<HeaderFooterLayout Component={<Profile />} />} />
                <Route exact path="/studentList" element={<HeaderFooterLayout Component={<Students />} />} />
                <Route exact path="/teachersList" element={<HeaderFooterLayout Component={<Teachers />} />} />
                {/* <Route exact path="/adminDashboard" element={<HeaderFooterLayout Component={<AdminDashboard />} />} /> */}
                <Route exact path="/addStudent" element={<HeaderFooterLayout Component={<AddStudents />} />} />
                <Route exact path="/addTeacher" element={<HeaderFooterLayout Component={<AddTeachers />} />} />
                <Route exact path="/summary" element={<HeaderFooterLayout Component={<Summary />} />} />
                <Route exact path="/emotionSensing" element={<HeaderFooterLayout Component={<EmotionSensing />} />} />
                {/* <Route exact path="/ksanalysis" element={<HeaderFooterLayout Component={<KSAnalysis />} />} /> */}
                <Route exact path="/hardskills" element={<HeaderFooterLayout Component={<HardSkills />} />} />
                <Route exact path="/softskills" element={<HeaderFooterLayout Component={<SoftSkills />} />} />
                <Route exact path="/skills" element={<HeaderFooterLayout Component={<Skills />} />} />
                <Route exact path="/behaviourAnalysis" element={<HeaderFooterLayout Component={<BehaviourAnalysis />} />} />
                <Route exact path="/practicalThinking" element={<HeaderFooterLayout Component={<PracticalThinking />} />} />
                <Route exact path="/adminHelp" element={<HeaderFooterLayout Component={<HelpSupportAdmin />} />} />
                <Route exact path="/adminSettings" element={<HeaderFooterLayout Component={<SettingsPageAdmin />} />} />
                <Route exact path="/configurations" element={<HeaderFooterLayout Component={<Configurations />} />} />

              </> : <>
                <Route exact path="/report" element={<HeaderFooterLayout Component={<ReportIndex />} />} />
                <Route exact path="/reportView" element={<HeaderFooterLayout Component={<NewUserReport />} />} />
                <Route exact path="/profile" element={<HeaderFooterLayout Component={<Profile />} />} />
                <Route exact path="/interview" element={<HeaderFooterLayout Component={<LoadQuestionsData />} />} />
                <Route exact path="/interview-results" element={<HeaderFooterLayout Component={<LoadResultsData />} />} />
                <Route exact path="/video-analysis" element={<HeaderFooterLayout Component={<VideoAnalysis />} />} />
                <Route exact path="/speech-analysis" element={<HeaderFooterLayout Component={<SpeechAnalysis />} />} />
                <Route exact path="/practice" element={<HeaderFooterLayout Component={<StepperComponent />} />} />
                <Route exact path="/notifications" element={<HeaderFooterLayout Component={<NotificationsPage />} />} />
                <Route exact path="/help" element={<HeaderFooterLayout Component={<HelpAndSupportPage />} />} />
                <Route exact path="/settings" element={<HeaderFooterLayout Component={<SettingsPage />} />} />
                <Route exact path="/studentDashboard" element={<HeaderFooterLayout Component={<StudentDashboard />} />} />
                <Route exact path="/studentDashboardScreening" element={<HeaderFooterLayout Component={<StudentDashboardScreenig />} />} />
                <Route exact path="/studentMRCLM" element={<HeaderFooterLayout Component={<StudentMRCLM />} />} />
                <Route exact path="/studentMRCLM/view/:id" element={<HeaderFooterLayout Component={<TopicBrief />} />} /> 
                <Route exact path="/studentMRCLM/quiz_view/:id" element={<HeaderFooterLayout Component={<QuizBrief />} />} /> 
              </>
            }
          </>
        }
        <Route exact path="/adminDashboard" element={<HeaderFooterLayout Component={<AdminDashboard />} />} />
        <Route exact path="/screeningUsers" element={<HeaderFooterLayout Component={<LinksList />} />} />
        <Route exact path="/screeningUsers/createLink" element={<HeaderFooterLayout Component={<CreateLink />} />} />
        <Route exact path="/placements" element={<HeaderFooterLayout Component={<Placements />} />} />

        <Route exact path="/" element={<StudentLogin />} />
        <Route exact path="/institutionLogin" element={<Login />} />
        <Route exact path="/studentRegister" element={<StudentRegister />} />
        <Route exact path="/studentRegistration/:id" element={<ScreeningUserRegister />} />
        <Route exact path="/registration" element={<Register />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route exact path="/questionBanksList/questionBank" element={<HeaderFooterLayout Component={<QuestionBankForm />} />} />
        <Route exact path="/questionBanksList" element={<HeaderFooterLayout Component={<QuestionBanksList />} />} />
        <Route exact path="/questionBanksList/view/:id" element={<HeaderFooterLayout Component={<QuestionBankView />} />} />



        {/* <Route exact path="/topics" element={<HeaderFooterLayout Component={<TopicandSubtopic />} />} /> */}
        <Route exact path="/topics" element={<HeaderFooterLayout Component={<TopicSubtopic />} />} />
        <Route exact path="/courseList/create" element={<HeaderFooterLayout Component={<CustomStepperComponent />} />} />
        <Route exact path="/teacherLogin" element={<TeacherLogin />} />
        <Route exact path="/comingSoon"  element={<HeaderFooterLayout Component={<ComingSoonPage />} />} />
        <Route exact path="/courseList"  element={<HeaderFooterLayout Component={<CourseList />} />} />
        <Route exact path="/courseList/view/:id" element={<HeaderFooterLayout Component={<CourseView />} />} />

        <Route exact path="/studentCourseList"  element={<HeaderFooterLayout Component={<StudentCourseList />} />} />
        <Route exact path="/studentCourseList/view/:id" element={<HeaderFooterLayout Component={<StudentCourseView />} />} />
        <Route exact path="/studentCourseList/edit/:id" element={<HeaderFooterLayout Component={<CourseEdit />} />} />
        <Route exact path="/assignments"  element={<HeaderFooterLayout Component={<AssignmentList />} />} />
        <Route exact path="/assignments/createAssignment"  element={<HeaderFooterLayout Component={<CreateAssignment />} />} />
        <Route exact path="/assignments/view/:id" element={<HeaderFooterLayout Component={<AssignmentView />} />} />

        <Route exact path="/studentQuizList"  element={<HeaderFooterLayout Component={<StudentQuizList />} />} />
        <Route exact path="/studentQuizList/view/:id"  element={<HeaderFooterLayout Component={<QuizPage />} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Url_Routes;
