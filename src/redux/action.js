import * as types from "./actionTypes";
import axios from "axios";
import GLOBAL_CONSTANTS from "../../GlobalConstants.js";

// utils
import { toast } from "react-toastify";

export const user_login = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/login`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {

        if (!resp?.data?.status) {
          toast.error(resp?.data?.message);
        }
        else {
          toast.success("Logged in");
          localStorage.setItem("user_data", JSON.stringify(resp?.data));
          dispatch({
            type: types.LOGIN,
            payload: resp?.data,
          });

          sessionStorage.setItem("user_data", JSON.stringify(resp?.data))
          callback(resp?.data);
        }

      })
      .catch((error) => {

        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};


export const institution_login = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}institution/login`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {

        if (!resp?.data?.status) {
          toast.error(resp?.data?.message);
        }
        else {
          toast.success("Logged in");
          localStorage.setItem("user_data", JSON.stringify(resp?.data));
          dispatch({
            type: types.LOGIN,
            payload: resp?.data,
          });

          sessionStorage.setItem("user_data", JSON.stringify(resp?.data))
          callback(resp?.data);
        }

      })
      .catch((error) => {

        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

export const user_signup = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/register`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
        console.log("resp", resp)
        if (resp?.data?.status == false) {
          toast.error(resp?.data?.message);
        }
        else {
          console.log('heeh')
          toast.success(resp?.data?.message);
          callback(resp?.data);
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

export const screeining_user_signup = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/register_screening_user`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
        console.log("resp", resp)
        if (resp?.data?.status == false) {
          toast.error(resp?.data?.message);
        }
        else {
          console.log('heeh')
          toast.success(resp?.data?.message);
          callback(resp?.data);
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

const getQuizList = (data) => ({
  type: types.QUIZ_LIST,
  payload: data,
});

export const loadQuizList = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/quiz/full_list`, { headers })
      .then((resp) => {
        dispatch(getQuizList(resp?.data?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getQuizView = (data) => ({
  type: types.QUIZ_DATA,
  payload: data,
});

export const loadQuizQuestions = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/quiz/${id}/questions`, { headers })
      .then((resp) => {
        dispatch(getQuizView(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


const getLessonList = (data) => ({
  type: types.LESSON_LIST,
  payload: data,
});

export const loadLessonList = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/lesson/${GLOBAL_CONSTANTS?.user_cred?.user_id}/list`, { headers })
      .then((resp) => {
        dispatch(getLessonList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


const getLessonView = (data) => ({
  type: types.LESSON_VIEW,
  payload: data,
});

export const loadLessonView = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/lesson/${id}/get`, { headers })
      .then((resp) => {
        dispatch(getLessonView(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


export const quizSubmit = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}result/submit_answer`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
      })
      .catch((error) => {

        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

export const quizCreate = (data, callback) => {
  return function () {
    var headers = {
      "Content-Type ": "multipart/form-data",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}quiz/upsert_quiz`, data, {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
      })
      .catch((error) => {

        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

const getUserList = (data) => ({
  type: types.USERS_LIST,
  payload: data,
});

export const loadUserList = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/auth/user_list`, { headers })
      .then((resp) => {
        dispatch(getUserList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


export const activateUser = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    const note = toast.loading("Activating User ..")
    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}auth/${id}/activate`, {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
        toast.update(note, { render: "User Activated", type: "success", isLoading: false, autoClose: 2000 });

      })
      .catch((error) => {
        toast.update(note, { render: "Something went wrong", type: "success", isLoading: false, autoClose: 3000 });

      });
  };
};

export const deactivateUser = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    const note = toast.loading("Deactivating User ..")

    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}auth/${id}/deactivate`, {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
        toast.update(note, { render: "User Deactivated", type: "success", isLoading: false, autoClose: 2000, });

      })
      .catch((error) => {
        toast.update(note, { render: "Something went wrong", type: "success", isLoading: false, autoClose: 3000 });
      });
  };
};


export const activateQuiz = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    const note = toast.loading("Activating Quiz ..")
    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/activate`, {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
        toast.update(note, { render: "Quiz Activated", type: "success", isLoading: false, autoClose: 2000 });

      })
      .catch((error) => {
        toast.update(note, { render: "Something went wrong", type: "success", isLoading: false, autoClose: 3000 });

      });
  };
};

export const deactivateQuiz = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    const note = toast.loading("Deactivating Quiz ..")

    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/deactivate`, {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
        toast.update(note, { render: "Quiz Deactivated", type: "success", isLoading: false, autoClose: 2000, });

      })
      .catch((error) => {
        toast.update(note, { render: "Something went wrong", type: "success", isLoading: false, autoClose: 3000 });
      });
  };
};

export const deleteQuiz = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    const note = toast.loading("Deactivating Quiz ..")

    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/delete_quiz`, {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
        toast.update(note, { render: "Quiz deleted", type: "success", isLoading: false, autoClose: 2000, });

      })
      .catch((error) => {
        toast.update(note, { render: "Something went wrong", type: "success", isLoading: false, autoClose: 3000 });
      });
  };
};


export const downloadQuiz = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/download_quiz`, {
        headers,
      })
      .then((resp) => {
        callback(resp?.data);
      })
      .catch((error) => {

      });
  };
};

const getUserStats = (data) => ({
  type: types.USER_STATS,
  payload: data,
});

export const loadUserStats = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/user/statistics`, { headers })
      .then((resp) => {
        dispatch(getUserStats(resp?.data?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getAdminStats = (data) => ({
  type: types.ADMIN_STATS,
  payload: data,
});

export const loadAdminStats = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/auth/admin_statistics`, { headers })
      .then((resp) => {
        dispatch(getAdminStats(resp?.data?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const user_update = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}auth/update_user`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.error(resp?.data?.error);
        }
        else {
          toast.success("Updated Sucessfully");

        }
        callback(resp?.data);
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};



export const forgot_password = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/reset_password`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.error(resp?.data?.error);
        }
        else {
          toast.success("Updated Sucessfully");
        }
        callback(resp?.data);
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};



//---------------------------------------------



const getInstituteData = (data) => ({
  type: types.INSTITUTE_LIST,
  payload: data,
});

export const registerInstitute = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };

    axios.post(`${GLOBAL_CONSTANTS.backend_url}institution/register`, data, { headers })
      .then((resp) => {
        dispatch(getInstituteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getcountriesData = (data) => ({
  type: types.COUNTRIES_LIST,
  payload: data,
});

export const getcountries = () => {
  console.log(GLOBAL_CONSTANTS.backend_url)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };

    axios.get(`${GLOBAL_CONSTANTS.backend_url}institution/country_list`, { headers })
      .then((resp) => {
        dispatch(getcountriesData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


// #region admin Stats

const getInstitutionStats = (data) => ({
  type: types.INSTITUTION_STATS,
  payload: data,
});

export const loadInstitutionStats = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/statistics`, { headers, params })
      .then((resp) => {
        dispatch(getInstitutionStats(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


const getStudentList = (data) => ({
  type: types.STUDENTS_LIST,
  payload: data,
});

export const loadStudentList = (param) => {
  return function (dispatch) {

    let params = {}

    for (const key in param) {

      if (param[key] !== undefined && param[key] !== null && param[key] != "") {
        params[key] = param[key];
      }
    }

    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/user/list`, { params, headers })
      .then((resp) => {
        dispatch(getStudentList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


const getTeachersList = (data) => ({
  type: types.TEACHERS_LIST,
  payload: data,
});

export const loadTeachersList = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/user/list`, { params, headers })
      .then((resp) => {
        dispatch(getTeachersList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const uploadUser = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    // let toastId = toast("file upload", { autoClose: false });

    axios.post(`${GLOBAL_CONSTANTS?.backend_url}/user/upload`, data, { headers })
      .then((resp) => {
        console.log(resp)
        toast.success(resp?.data?.message);

        // toast.update(toastId, { render: resp?.data?.message, type: "error", autoClose: true })

        // dispatch(getTeachersList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const uploadConfigurations = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    // let toastId = toast("file upload", { autoClose: false });

    axios.post(`${GLOBAL_CONSTANTS?.backend_url}/institution/upload_configurations`, data, { headers })
      .then((resp) => {
        console.log(resp)
        toast.success(resp?.data?.message);

        // toast.update(toastId, { render: resp?.data?.message, type: "error", autoClose: true })

        // dispatch(getTeachersList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const getCourseList = (data) => ({
  type: types.COURSE_LIST,
  payload: data,
});

export const loadCourseList = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/course_list?${params}`, {headers })
      .then((resp) => {
        dispatch(getCourseList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getBrachList = (data) => ({
  type: types.BRANCH_LIST,
  payload: data,
});

export const loadBrachList = (params = {}) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/branch_list?${params}`, {headers })
      .then((resp) => {
        dispatch(getBrachList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const getDepartmentList = (data) => ({
  type: types.DEPARTMENT_LIST,
  payload: data,
});

export const loadDepartmentList = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/department_list?${params}`, {headers })
      .then((resp) => {
        dispatch(getDepartmentList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const getUsersList = (data) => ({
  type: types.USERS_LIST_BY_DEPARTMENT,
  payload: data,
});

export const loadUsersList = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/user/user_by_department_list?${params}`, {headers })
      .then((resp) => {
        dispatch(getUsersList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


const getInstitutionList = (data) => ({
  type: types.INSTITUTION_LIST,
  payload: data,
});

export const loadInstitutionList = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/institution_list`, { params, headers })
      .then((resp) => {
        dispatch(getInstitutionList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getCountryList = (data) => ({
  type: types.COUNTRY_LIST,
  payload: data,
});

export const loadCountryList = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/country_list`, { params, headers })
      .then((resp) => {
        dispatch(getCountryList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const user_create = (data, params, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Creating User", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/admin_create_user`, JSON.stringify(data), {
        params, headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "User Created Sucessfully", type: "success", autoClose: true })
          callback
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};



export const user_delete = (params, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Deleting User", { type: "loading", autoClose: false });
    axios
      .delete(`${GLOBAL_CONSTANTS.backend_url}user/delete`, {
        params, headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: 2000 })

        }
        else {
          toast.update(toastId, { render: "User Deleted Sucessfully", type: "success", autoClose: 2000 })
          callback
        }
      })
      .catch((error) => {
        console.log(error)
        toast.update(toastId, { render: "Something bad happend ", type: "error", autoClose: 2000 })
      });
  };
};

export const updateLinkStatus = (id,param_text, callback) => {
  console.log(id,param_text,"hehe")
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Updating Link Status", { type: "loading", autoClose: false });
    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}institution/screening/${id}/${param_text}`, { headers })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: 2000 })

        }
        else {
          // console.log("resp",resp)
          toast.update(toastId, { render: param_text=="deactive"?"Link Deactivated Successfully":"Link Activated Successfully", type: "success", autoClose: 2000 })
          callback(resp?.data)
        }
      })
      .catch((error) => {
        console.log(error)
        toast.update(toastId, { render: "Something bad happend ", type: "error", autoClose: 2000 })
      });
  };
};

export const interviewAllowed = (id, callback) => {
  // console.log(id,param_text,"hehe")
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Checking...", { type: "loading", autoClose: false });
    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}user/is_interview_allowed`, { headers })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: 2000 })

        }
        else {
          // console.log("resp",resp)
          // toast.update(toastId, { render: param_text=="deactive"?"Link Deactivated Successfully":"Link Activated Successfully", type: "success", autoClose: 2000 })
          callback(resp?.data)
        }
      })
      .catch((error) => {
        console.log(error)
        // toast.update(toastId, { render: "Something bad happend ", type: "error", autoClose: 2000 })
      });
  };
};


export const getLinkUsers = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios
      .get(`${GLOBAL_CONSTANTS.backend_url}institution/screening_user_list?screening_code=${id}`, { headers })
      .then((resp) => {
        if (resp?.data?.error) {
          // console.log("resp")
        }
        else {
          callback(resp?.data)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };
};

export const createLink = (payload, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Generating Link", { type: "loading", autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}institution/generate_screening_link`, payload, { headers })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: 2000 })

        }
        else {
          toast.update(toastId, { render: "Link Generated Sucessfully", type: "success", autoClose: 2000 })
          console.log("resp",resp)
          callback(resp?.data)
        }
      })
      .catch((error) => {
        console.log(error)
        toast.update(toastId, { render: "Something bad happend ", type: "error", autoClose: 2000 })
      });
  };
};

export const userStatUpdate = (id, endpoint, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}user/${id}/${endpoint}`, { headers: headers })
      .then((resp) => {
        console.log("resp", resp)
        if (resp?.data?.status) {
          window.location.reload();
          callback
        }
        // dispatch(loadStudentList({}));
        // dispatch(loadTeachersList({}));

      })
      .catch((error) => console.log(error));
  };
};


// #endregion admin Stats

// practice lists

const getHardSkillsList = (data) => ({
  type: types.HARD_SKILLS_LIST,
  payload: data,
});

export const loadHardSkillsList = (params = {}) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/hard_skills_list`, { params, headers })
      .then((resp) => {
        dispatch(getHardSkillsList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getSoftSkillsList = (data) => ({
  type: types.SOFT_SKILLS_LIST,
  payload: data,
});

export const loadSoftSkillsList = (params = {}) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/soft_skills_list`, { params, headers })
      .then((resp) => {
        dispatch(getSoftSkillsList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getInterviewRolesList = (data) => ({
  type: types.INTERVIEW_ROLES_LIST,
  payload: data,
});

export const loadInterviewRolesList = (params = {}) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/interview_roles_list`, { params, headers })
      .then((resp) => {
        dispatch(getInterviewRolesList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getCompaniesList = (data) => ({
  type: types.COMPANIES_LIST,
  payload: data,
});

export const loadCompaniesList = (params = {}) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/companies_list`, { params, headers })
      .then((resp) => {
        dispatch(getCompaniesList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getReportsList = (data) => ({
  type: types.USER_REPORT_LIST,
  payload: data,
});

export const loadReportsList = (params = {}) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}user/list_interviews?status=completed,report_inprogress,report_generated&user_id=${GLOBAL_CONSTANTS?.user_cred?.id}`, { params, headers })
      .then((resp) => {
        dispatch(getReportsList(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getEmotionStats = (data) => ({
  type: types.EMOTION_STATS,
  payload: data,
});

export const loadEmotionStats = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/deep_analysis/emotion_sensing`, { headers, params })
      .then((resp) => {
        dispatch(getEmotionStats(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getUserReport = (data) => ({
  type: types.USER_REPORT,
  payload: data,
});

export const loadUserReport = (report) => {
  return function (dispatch) {
    dispatch(getUserReport(report));
  };
};

const getInterviewQuestions = (data) => ({
  type: types.INTERVIEW_QUESTIONS,
  payload: data,
});

export const loadQuestions = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    // let toastId = toast("Wait .. redirecting to Interview Section", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/register_interview`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          // toast.update( toastId ,{render: resp?.data?.error,type:"error", autoClose: true})

        }
        else {
          dispatch(getInterviewQuestions(resp?.data));
          // toast.update( toastId ,{render:"Wait .. redirecting to Interview Section",type:"success", autoClose: true })
        }
      })
      .catch((error) => {
        // toast.error(
        //   error ?? "Something went wrong",
        //   {
        //     autoClose: 2000,
        //   }
        // );
      });
  };
};

export const prepare_interview = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Wait .. redirecting to Interview Section", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/register_interview`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "Wait .. redirecting to Interview Section", type: "success", autoClose: true })
          callback
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};



export const submit_interview = (data) => {
  // console.log("submit_interview",data);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}user/submit_answer`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {

        if (!resp?.data?.status) {
          toast.error(resp?.data?.message);
        }

      })
      .catch((error) => {

        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

const getBehaviourAnalysis = (data) => ({
  type: types.BEHAVIOUR_ANALYSIS,
  payload: data,
});

export const loadBehaviourAnalysis = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/deep_analysis/behavioral_analysis`, { params, headers })
      .then((resp) => {
        dispatch(getBehaviourAnalysis(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getKSAnalysis = (data) => ({
  type: types.KS_ANALYSIS,
  payload: data,
});

export const loadKSAnalysis = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/deep_analysis/ks_analysis`, { params, headers })
      .then((resp) => {
        dispatch(getKSAnalysis(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getPracticalThinkingAnalysis = (data) => ({
  type: types.PRACTICAL_THINKING_ANALYSIS,
  payload: data,
});

export const loadPracticalThinkingAnalysis = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}/institution/deep_analysis/practical_thinking_analysis`, { params, headers })
      .then((resp) => {
        dispatch(getPracticalThinkingAnalysis(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

export const setReduxState = (data) => ({
  type: types.SET_REDUX_STATE,
  payload: data,
});




const getSummmaryData = (data) => ({
  type: types.SUMMARY_DATA,
  payload: data,
});

export const loadSummaryData = (params) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}institution/management`, { params, headers })
      .then((resp) => {
        dispatch(getSummmaryData(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getCourses = (data) => ({
  type: types.COURSES,
  payload: data,
});

export const loadcourses = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}course/list`, {  headers })
      .then((resp) => {
        dispatch(getCourses(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getCourseDetails = (data) => ({
  type: types.DETAILED_COURSES,
  payload: data,
});

export const loadDetailedCourse = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}course/get/${id}`, {  headers })
      .then((resp) => {
        dispatch(getCourseDetails(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getAssignedUsers = (data) => ({
  type: types.ASSIGNED_USERS,
  payload: data,
});

export const loadAssignedUsers = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}course/get_users/${id}`, {  headers })
      .then((resp) => {
        dispatch(getAssignedUsers(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const getLinks = (data) => ({
  type: types.SCREENING_USER_LINKS_LIST,
  payload: data,
});

export const loadLinks = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    axios.get(`${GLOBAL_CONSTANTS?.backend_url}institution/screening_link_list`, {  headers })
      .then((resp) => {
        dispatch(getLinks(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};


export const create_course = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Creating Course .. please wait", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}course/create`, JSON.stringify(data), {
         headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "Course Created and now assign users", type: "success", autoClose: true })
          callback(resp)
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

export const assign_users = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Assigning to users .. please wait", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}course/assign`, JSON.stringify(data), {
         headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "Users Added and now create content", type: "success", autoClose: true })
          callback(resp)
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

export const course_content = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Creating topics .. please wait", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}course/create_content`, JSON.stringify(data), {
         headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "Content Created", type: "success", autoClose: true })
          callback(resp)
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

export const delete_course = (id, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Deleting Course .. please wait", { autoClose: false });
    axios
      .delete(`${GLOBAL_CONSTANTS.backend_url}course/delete/${id}`, {
         headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "Course Deleted", type: "success", autoClose: true })
          callback(resp)
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};


export const track_course = (data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Updating Course .. please wait", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}course/update_task`,JSON.stringify(data), {
         headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "Course Updated", type: "success", autoClose: true })
          callback(resp)
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};

export const updateUsers = (url,data, callback) => {
  return function () {
    var headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    let toastId = toast("Updating Users .. please wait", { autoClose: false });
    axios
      .post(`${GLOBAL_CONSTANTS.backend_url}${url}`,JSON.stringify(data), {
         headers,
      })
      .then((resp) => {
        if (resp?.data?.error) {
          toast.update(toastId, { render: resp?.data?.error, type: "error", autoClose: true })

        }
        else {
          toast.update(toastId, { render: "Users Updated", type: "success", autoClose: true })
          callback(resp)
        }
      })
      .catch((error) => {
        toast.error(
          error ?? "Something went wrong",
          {
            autoClose: 2000,
          }
        );
      });
  };
};