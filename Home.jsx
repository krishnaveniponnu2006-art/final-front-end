import React, { useEffect, useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get"); // Update backend URL if needed
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      alert("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  const updateBlog = (item) => {
    navigate("/add", { state: item }); // Pass blog data to Add.jsx for editing
  };

  return (
    <div style={{ padding: "30px" }}>
      <Grid container spacing={3}>
        {blogs.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={item.img_url || "https://via.placeholder.com/300"} // placeholder if no image
                alt={item.title}
              />
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  
                </Typography>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="secondary" onClick={() => deleteBlog(item._id)}>
                  DELETE
                </Button>
                <Button variant="contained" color="secondary" onClick={() => updateBlog(item)}>
                  UPDATE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
