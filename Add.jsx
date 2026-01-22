import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  // Fill form if editing
  useEffect(() => {
    if (location.state) {
      setInputs({
        title: location.state.title,
        content: location.state.content,
        img_url: location.state.img_url,
      });
    }
  }, [location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (location.state) {
        // Update existing blog
        await axios.put(`http://localhost:3001/update/${location.state._id}`, inputs);
        alert("Blog updated successfully");
      } else {
        // Add new blog
        await axios.post("http://localhost:3001/add", inputs);
        alert("Blog added successfully");
      }
      navigate("/"); // go back to Home
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
      <Box sx={{ width: "600px", display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          placeholder="Title"
          name="title"
          value={inputs.title}
          onChange={inputHandler}
        />
        <TextField
          placeholder="Content"
          name="content"
          value={inputs.content}
          onChange={inputHandler}
          multiline
          rows={4}
        />
        <TextField
          placeholder="Image URL"
          name="img_url"
          value={inputs.img_url}
          onChange={inputHandler}
        />
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
