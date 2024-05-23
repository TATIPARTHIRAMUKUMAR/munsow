import * as types from "./actionTypes.js";

const initialState = {
  // authActions
  loggedIn: true,
  userId: null,
  quizList: [],
  quizView: {},
  lessonsList: [],
  lessonView: {},
  usersList: [],
  userStats: {},
  adminStats: {},
  institutiondata: [],
  institutiondata_meta: {},
  countryList: {},
  institutionStats:{},
  institutionFilters:{},
  studentsList:{},
  teachersList:{},
  courseList:[],
  departmentList:[],
  branchList:[],
  institutionList:[],
  countryList:[],
  hardSkillsList: [],
  softSkillsList: [],
  interviewRolesList: [],
  companiesList: [],
  emotionStats: {},
  emotionFilters: {},
  userReport:[],
  userReportList:[],
  questionsList:[],
  behaviourAnalysis:[],
  ksAnalysis: [],
  ksFilters: [],
  userListByDepartment:[],
  summaryData:{},
  detailedCourse:{},
  detailedQuestionBank:{},
  courses:[],
  assignedUsers:[],
  unAssignedUsers:[],
  linksList:[],
  questionBanksList:[],

  practicalThinking:[],
  practicalFilters:{},
  placementTracker:{},
  statusList:[],
  colorTheme: {
    light: {
      // primaryBg-black
      // secondarybg-green
      // selecttextcolor-primarybg
      // selectIcon-primarybg
      //primarytextcolor-textcolor-white-E7EFEE
      //textcolor2 is not a part of theme
      //secondarytextcolor-textcolor3

      background: " #242D36 ",
      foreground: "#E7EFEE",
      selectBackground: "#2BE2D0",
      selectTextColor: "#242D35",
      selectBorder: "#212e3e",
      selectIcon: "#21263e",
      textColor: "#fafcfc",
      textColor2: "#8A8A8A",
      textColor3: "#252525",
    },
    dark: {
      background: "#242D36",
      foreground: "#E7EFEE",
      selectBackground: "#0fe1d2",
      selectTextColor: "#242D36",
      selectBorder: "#212e3e",
      selectIcon: "#21263e",
      textColor: "#ABB2BA",
      textColor2: "#8A8A8A",
      textColor3: "#252525",
    },
  },  

  loading: false
};

const DataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        loggedIn: action?.payload?.userId && true,
        userCred: action?.payload,
      };
    case types.QUIZ_LIST:
      return {
        ...state,
        quizList: action?.payload
      }
    case types.LESSON_LIST:
      {
        return {
          ...state,
          lessonsList: action?.payload?.data
        }
      }
    case types.LESSON_VIEW:
      {
        return {
          ...state,
          lessonView: action?.payload?.data
        }
      }
    case types.QUIZ_DATA:
      {
        return {
          ...state,
          quizView: action?.payload
        }
      }
    case types.USERS_LIST:
      {
        return {
          ...state,
          usersList: action?.payload
        }
      }
    case types.USER_STATS:
      {
        return {
          ...state,
          userStats: action?.payload
        }
      }
    case types.ADMIN_STATS:
      {
        return {
          ...state,
          adminStats: action?.payload
        }
      }
    case types.INSTITUTE_LIST: return {
      ...state,
      institutiondata: action.payload.data,
      institutiondata_meta: action.payload.meta,
      loading: false
    }
    case types.COUNTRIES_LIST: return {
      ...state,
      countryList: action.payload.data,
      loading: false
    }
    case types.INSTITUTION_STATS: return{
      ...state,
      institutionStats:action.payload.data,
      institutionFilters:action.payload.filters,
      loading:false
    }
    case types.STUDENTS_LIST: return{
      ...state,
      studentsList:action.payload,
      loading:false
    }
    case types.TEACHERS_LIST: return{
      ...state,
      teachersList:action.payload,
      loading:false
    }
    case types.DETAILED_COURSES: return{
      ...state,
      detailedCourse:action.payload.data,
      loading:false
    }
    case types.DETAILED_QUESTIONBANK: return{
      ...state,
      detailedQuestionBank:action.payload.data,
      loading:false
    }
    case types.COURSE_LIST: return{
      ...state,
      courseList:action.payload,
      loading:false
    }
    case types.DEPARTMENT_LIST: return{
      ...state,
      departmentList:action.payload,
      loading:false
    }
    case types.BRANCH_LIST: return{
      ...state,
      branchList:action.payload,
      loading:false
    }
    case types.HARD_SKILLS_LIST: return{
      ...state,
      hardSkillsList:action.payload,
      loading:false
    }
    case types.SOFT_SKILLS_LIST: return{
      ...state,
      softSkillsList:action.payload,
      loading:false
    }
    case types.INTERVIEW_ROLES_LIST: return{
      ...state,
      interviewRolesList:action.payload,
      loading:false
    }
    case types.COMPANIES_LIST: return{
      ...state,
      companiesList:action.payload,
      loading:false
    }
    case types.EMOTION_STATS: return{
      ...state,
      emotionStats:action.payload.data,
      emotionFilters:action.payload.filters,
      loading:false
    }
    case types.USER_REPORT: return{
      ...state,
      userReport:action.payload,
      loading:false
    }
    case types.USER_REPORT_LIST: return{
      ...state,
      userReportList:action.payload?.data,
      loading:false
    }
    case types.INSTITUTION_LIST: return{
      ...state,
      institutionList:action.payload,
      loading:false
    }
    case types.COUNTRY_LIST: return{
      ...state,
      countryList:action.payload,
      loading:false
    }
    case types.INTERVIEW_QUESTIONS: return{
      ...state,
      questionsList:action.payload,
      loading:false
    }
    case types.SUMMARY_DATA: return{
      ...state,
      summaryData:action.payload,
      loading:false
    }
    case types.BEHAVIOUR_ANALYSIS: return{
      ...state,
      behaviourAnalysis:action.payload.data.data,
      loading:false
    }
    case types.STATUS_LIST: return{
      ...state,
      statusList:action.payload.entity_mapping,
      loading:false
    }
    case types.KS_ANALYSIS: return{
      ...state,
      ksAnalysis: action.payload.data,
      ksFilters:action.payload.filters,
      loading:false
    }
    case types.USERS_LIST_BY_DEPARTMENT: return{
      ...state,
      userListByDepartment: action.payload.data,
      loading:false
    }
    case types.ASSIGNED_USERS: return{
      ...state,
      assignedUsers: action.payload?.data?.assined_users,
      unAssignedUsers:action.payload?.data?.unassined_users,
      loading:false
    }
    case types.COURSES: return{
      ...state,
      courses: action.payload.courses,
      loading:false
    }
    case types.SCREENING_USER_LINKS_LIST: return{
      ...state,
      linksList: action.payload.data,
      loading:false
    }
    case types.PLACEMENT_TRCKER: return{
      ...state,
      placementTracker: action.payload,
      placementTrackermeta:action.payload.meta,
      loading:false
    }
    case types.QUESTIONBANKS: return{
      ...state,
      questionBanksList: action.payload.data,
      loading:false
    }
    case types.PRACTICAL_THINKING: return{
      ...state,
      practicalThinking: action.payload.data,
      practicalFilters:action.payload.filters,
      loading:false
    }
    case types.SET_REDUX_STATE : { 
      return {
      ...state,
      [action.payload.name]: action.payload.value
    }}
    default:
      return state;
  }
};
export default DataReducers;
