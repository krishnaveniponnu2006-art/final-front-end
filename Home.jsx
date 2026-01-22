import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch all blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3001/blogs"); // Make sure backend route exists
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete a blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/blog/${id}`);
      fetchBlogs(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  // Navigate to update page
  const updateBlog = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {blog.category || "General"}
                </Typography>
                <Typography variant="h6">{blog.title}</Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-around", paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => updateBlog(blog._id)}
                >
                  Update
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
