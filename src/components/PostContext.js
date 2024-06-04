// src/component/PostContext.js
import React, { createContext, useState } from 'react';

// 초기 상태
const dummyPosts = [
  {
    title: '첫 번째 더미 게시글',
    content: '더미 내용1',
    date: new Date().toLocaleString(),
  },
  {
    title: '두 번째 더미 게시글',
    content: '더미 내용2',
    date: new Date().toLocaleString(),
  },
  {
    title: '세 번째 더미 게시글',
    content: '더미 내용3',
    date: new Date().toLocaleString(),
  },
];

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(dummyPosts);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
