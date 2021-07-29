import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { stateCodes } from '../search/stateCodes'
// import { UserContext } from "../user/UserProvider"
import { PostContext } from "./PostProvider"
import { Button, Input, Select, MenuItem, InputLabel } from "@material-ui/core"
import { FormControlLabel, Radio } from "@material-ui/core"
import { DateTime } from "luxon";

export const PostForm = () => {
//   const { updateUser, getUserById } = useContext(UserContext)
  const { addPost } = useContext(PostContext)
  const [ isLoading, setIsLoading ] = useState(true)
  const userId = localStorage.getItem("rare_user_id")
  const history = useHistory()
  const [user, setUser] = useState({})
  const now = DateTime.now()

  const [post, setPost] = useState({
    user_id: userId,
    category_id: 1,
    title: "",
    publication_date: 0,
    image_url: "",
    content: "",
    approved: 0
  })

  const [pic, setPic] =useState({
    file: "",
  })
  

  const handleControlledInputChange = e => {
    setIsLoading(false)
    const newPost = { ...post }
    newPost[e.target.id] = e.target.value
    setPost(newPost)
  }
  const handleControlledCategoryChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newPost = { ...post }
    /* search is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    newPost.category_id = event.target.value
    //Update State
    console.log(newPost)
    setPost(newPost)
  }
//   const handleControlledPicChange = e => {
//     const newPic = { ...pic }
//     newPic[e.target.id] = e.target.files
//     console.log(newPic.file[0])
//     setPic(newPic)
//   }
//   const handleControlledRadioChange = e => {
//     const newHouse = { ...house }
//     newHouse.userTypeId = e.target.value
//     setHouse(newHouse)
//   }

  const handleAdd = (e) => {
    setIsLoading(true)
    // debugger
    let newPost = {
        user_id: parseInt(userId),
        category_id: 1,
        title: post.title,
        publication_date: now.toISODate(),
        image_url: post.image_url,
        content: post.content,
        approved: 0
    }
    // const data = new FormData()
    // data.append("file", pic.file[0])
    // data.append("upload_preset", "swipeHome")
    
    // uploadpostPic(data)
    // .then((data) => newHouse.photos.push({href: data.secure_url}))

    addPost(newPost)
        .then(() => history.push(`/posts`))    
  }

  return (
    <div className="postForm__Container">
    <form className="postForm">
      <h2 className="userForm__title">Add Post</h2>
      <fieldset className="postInputField">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <Input margin="dense" type="text" id="title" required autoFocus className="form-control" placeholder="Title" value={post.title} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset className="postInputField">
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <Input margin="dense" type="text" id="content" required className="form-control" placeholder="Content" value={post.content} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      {/* <div className="postFormFlex"> */}
      {/* <fieldset className="postInputField">
          <div className="form-group post-state-field">
            <InputLabel htmlFor="location">State:</InputLabel>
            <Select name="state_mode" required id="state_code" className="SearchForm-control SearchFormDropDown-control" value={house.state_code} onChange={handleControlledStateChange}>
              {/* <option value="0">Select</option> */}
              {/* {stateCodes.map(s => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </div>
              </fieldset>  */ }
        <fieldset className="postInputField">
          <div className="form-group">
            <label htmlFor="image_url">Image URL:</label>
            <Input  margin="dense"type="text" id="image_url" className="SearchForm-control" placeholder="image URL" value={post.image_url} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
      {/* <fieldset  className="postInputField">
        <div className="radios">
                <FormControlLabel className="radio" id="userTypeId"  value="1" checked={parseInt(house.userTypeId) === 1 ? true : false} control={<Radio />} label="For Rent" onChange={handleControlledRadioChange} />
                <FormControlLabel className="radio" id="userTypeId"  value="2" checked={parseInt(house.userTypeId) === 2 ? true : false } control={<Radio />} label="For Sale" onChange={handleControlledRadioChange} />
                </div>
      </fieldset> */}
      <div className="postButton-flex">
      <Button variant="contained" color="primary" className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleAdd()
          }}>
          Add Post
      </Button>
      </div>
    </form>
    </div>
  )
}