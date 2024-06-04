import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import '../css/Community.scss';
import { PostContext } from '../components/PostContext';
import TopButton from './TopButton';

const Community = () => {
  const { posts, setPosts } = useContext(PostContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [showContentIndex, setShowContentIndex] = useState(-1);

  const toggleContent = (index) => {
    setShowContentIndex(index === showContentIndex ? -1 : index);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div className="comm-top">
        <nav className="navbar">
          <div>
            <p className="commTitle">제보 게시판</p>
          </div>
        </nav>
        <div className="buttonContainer">
          <Link to="/community/write">
            <button className="textButton">글 작성하기</button>
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="textList">
            {currentPosts.map((post, index) => (
              <div key={index} className="communityList">
                <div className="postHeader">
                  <span className="postNumber">
                    번호: {posts.length - indexOfFirstPost - index}
                  </span>
                  <h3>{post.title}</h3>
                  <span className="postDate">{post.date}</span>
                </div>
                {showContentIndex === index ? <p>{post.content}</p> : null}
                <button onClick={() => toggleContent(index)}>
                  {showContentIndex === index ? '내용 숨기기' : '내용 보기'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="nullList">게시글이 없습니다.</p>
        )}
        {posts.length > 0 && <div className="box"></div>}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={posts.length}
          itemsPerPage={postsPerPage}
          pagesPerGroup={5}
        />
      </div>
      <TopButton />
    </div>
  );
};

export default Community;
