import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContentContext } from "../context/ContentProvider";
import FileUploader from "../components/FileUploader";

const initInputs = {
  title: "",
  description: "",
  imgUrl: "",
  tag: "",
};

export default function PostForm(props) {
  const { addPost, editPost, dispatch, state, uploadedFile, setUploadedFile } =
    useContext(ContentContext);
  const [inputs, setInputs] = useState(initInputs);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.edit === true) {
      const thisPost = state.currentPost;
      setInputs({
        title: thisPost.title,
        description: thisPost.description,
        imgUrl: thisPost.imgUrl,
        tag: thisPost.tag,
      });
    }
  }, [state.edit, state.currentPost]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (uploadedFile.filePath) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        imgUrl: uploadedFile.filePath,
      }));
    }
  }, [uploadedFile])

  function handleSubmit(e) {
    e.preventDefault();
    if (state.edit === false) {
      addPost(inputs);
    } else {
      editPost(state.currentPost._id, inputs);
      dispatch({ type: "edit" });
    }
    setInputs(initInputs);
    navigate(-1);
    setUploadedFile({})
  }

  const { title, description, imgUrl, tag } = inputs;
  return (
    <div className="post-form-box page">
      <h3 className='page-title'>Create a new post</h3>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Content"
          className="post-description"
        />
          <FileUploader />
        {
          uploadedFile.filePath 
          ? <a href={uploadedFile.filePath} target="_blank" rel="noreferrer noopener" className='link-element'>Uploaded Image</a>
          :<input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={handleChange}
          placeholder="Paste image URL here, or upload image before submitting your post"
        />}
        <select
          id="tag"
          value={tag}
          onChange={handleChange}
          name="tag"
          className="select-tag"
        >
          <option value={null} className="null-select">
            Select Tag
          </option>
          <option value="happy-plant">Happy Plant</option>
          <option value="seeking-advice">Seeking Advice</option>
          <option value="new-growth">New Growth</option>
          <option value="identification">Identification</option>
          <option value="new-plant">New Plant</option>
          <option value="props">Props</option>
        </select>
        <button
          type="submit"
          className="submit-button"
          disabled={title?.length < 1}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            setUploadedFile({})
            navigate(-1)
          }}
          className="cancel-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
