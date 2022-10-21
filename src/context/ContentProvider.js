import React, { useEffect, useReducer, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const ContentContext = React.createContext();
const contentAxios = axios.create();

contentAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function ContentProvider(props) {
  const location = useLocation().pathname;
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    posts: [
      {
        _id: "",
        title: "",
        imgUrl: "",
        description: "",
        user: "",
        comments: [],
        likes: [],
        timestamp: "",
        __v: 0,
      },
    ],
    message: "",
    edit: false,
    currentPost: {},
  };

  const [state, dispatch] = useReducer(contentReducer, initState);
  const [singlePost, setSinglePost] = useState();
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  function contentReducer(state, action) {
    let newState;
    const prevPosts = [...state.posts];
    switch (action.type) {
      case "getPosts":
        newState = {
          ...state,
          posts: action.value,
          order: action.order,
        };
        break;
      case "getOnePost":
        newState = {
          ...state,
          currentPost: action.value,
        };
        break;
      case "appendPosts":
        newState = {
          ...state,
          posts: [...state.posts, action.value],
        };
        break;
      case "removePost":
        newState = {
          ...state,
          posts: action.value,
        };
        break;
      case "updatePosts":
        const updatedPostIndex = prevPosts.findIndex(
          (post) => post._id === action.value._id
        );
        prevPosts[updatedPostIndex] = action.value;
        newState = {
          ...state,
          posts: prevPosts,
        };
        break;
      case "setSinglePost":
        newState = {
          ...state,
          currentPost: action.value,
        };
        break;
      case "addComment":
        newState = {
          ...state,
          currentPost: {
            ...state.currentPost,
            comments: action.value,
          },
        };
        break;
      case "removeComment":
        newState = {
          ...state,
          currentPost: {
            ...state.currentPost,
            comments: action.value,
          },
        };
        break;
      case "edit":
        newState = {
          ...state,
          edit: true,
        };
        break;
      default:
        throw new Error();
    }
    return newState;
  }

  const getUserPosts = useCallback(() => {
    contentAxios
      .get("/api/post/user")
      .then((res) => {
        dispatch({ type: "getPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  })

  function getAllPosts() {
    contentAxios
      .get("/api/post/")
      .then((res) => {
        dispatch({ type: "getPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getOnePost(postId) {
    contentAxios
      .get(`/api/post/singlePost/${postId}`)
      .then((res) => {
        dispatch({ type: "setSinglePost", value: res.data[0] });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addPost(newPost) {
    contentAxios
      .post("/api/post", newPost)
      .then((res) => {
        dispatch({ type: "appendPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deletePost(postId) {
    contentAxios
      .delete(`/api/post/${postId}`)
      .then((res) => {
        const freshPosts = state.posts.filter((post) => post._id !== postId);
        dispatch({ type: "removePost", value: freshPosts });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function editPost(postId, editedPost) {
    contentAxios
      .put(`/api/post/${postId}`, editedPost)
      .then((res) => {
        dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function likePost(postId) {
    contentAxios
      .put(`/api/post/like/${postId}`)
      .then((res) => {
        location === `/single-post/${postId}`
          ? dispatch({ type: "setSinglePost", value: res.data })
          : dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function removeLike(postId) {
    contentAxios
      .put(`/api/post/removeLike/${postId}`)
      .then((res) => {
        location === `/single-post/${postId}`
          ? dispatch({ type: "setSinglePost", value: res.data })
          : dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.reponse.data.errMsg));
  }

  function addComment(newComment, postId) {
    contentAxios
      .post(`/api/comment/${postId}`, newComment)
      .then((res) => {
        dispatch({
          type: "addComment",
          value: res.data.comments,
        });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deleteComment(postId, commentId) {
    contentAxios
      .delete(`/api/comment/${postId}/${commentId}`)
      .then((res) => {
        dispatch({
          type: "removeComment",
          value: res.data.comments,
        });
      })
      .catch((err) => {
        console.log(err.response.data.errMsg);
      });
  }

  function handleSinglePost(postId) {
    console.log("postId submitted by to handleSinglePost");
    console.log(postId);
    getOnePost(postId);
  }

  async function uploadFile(file, fileName) {
    const formData = new FormData();
    formData.append("file", file, fileName);

    try {
      const res = await contentAxios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercent(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      err.response.status === 500
        ? console.error(new Error("500: there was an error with the server"))
        : console.error(err.response.data.msg);
    }
  }

  return (
    <ContentContext.Provider
      value={{
        state,
        dispatch,
        getUserPosts,
        getAllPosts,
        getOnePost,
        addPost,
        deletePost,
        likePost,
        removeLike,
        addComment,
        singlePost,
        setSinglePost,
        deleteComment,
        editPost,
        handleSinglePost,
        uploadFile,
        uploadedFile,
        setUploadedFile,
        uploadPercent,
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
}
