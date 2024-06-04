import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Layout from './components/Layout';
import Welfare from './components/Welfare';
import Accident from './components/Accident';
import Navigation from './components/Navigation';
import Community from './components/Community';
import WriteBoard from './components/WriteBoard';
import { PostProvider } from './components/PostContext';
import axios from 'axios';

const App = () => {
  // useEffect(() => {
  //   async function fetchdata() {
  //     const { data } = await axios.get('/proxy');
  //     console.log(data);
  //   }
  //   fetchdata();
  // }, []);

  const [posts, setPosts] = React.useState([]);
  return (
    <PostProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/welfare" element={<Welfare />} />
          <Route path="/accident" element={<Accident />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route
            path="/community"
            element={<Community posts={posts} setPosts={setPosts} />}
          />
          <Route path="/community/write" element={<WriteBoard />} />
        </Route>
      </Routes>
    </PostProvider>
  );
};

export default App;
