import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './style/style.css';
import exampleImage from './assets/default_img.png';


function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('Page');
    return savedPage ? JSON.parse(savedPage) : 1;
  });
  const [photos, setPhotos] = useState([]);
  const limit = 8;
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
      .then(response => {
       
        setPhotos(response.data);
        setCount(Math.ceil(5000 / limit)); 
        
      })
      .catch(err => {
        console.error(err);
        setPhotos([]); 
      })
      .finally(() => {
        setLoading(false)
      });
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value); 
    localStorage.removeItem('Page'); 
    localStorage.setItem('Page', value); 
  };

  return (
    <div className="bg-pink-600 max-2xl flex p-20">
      <div className='bg-white w-full flex flex-col text-center rounded-xl shadow-2xl'>
        <h3 className='font-medium text-3xl mt-20'>Food Blog</h3>
        <p className='font-normal text-slate-900 text-x mt-5'>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit <br /> aut fugit, sed quia consequuntur.</p>

        <div className="pt-14 px-20">
          <div className="grid grid-cols-4 gap-4">
            {photos.map((v) => (
              <div key={v.id} className="w-full">
                <img src={loading ? exampleImage : v.thumbnailUrl}  className="w-full h-auto rounded" />
               
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-center mt-16 mb-12'>
          <Stack spacing={2} className="mt-4">
            <Pagination
              count={count}
              page={page}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-page.Mui-selected': {
                  bgcolor: '#E91E63',
                  color: '#FFFFFF',
                },
                '& .MuiPaginationItem-previousNext': {
                  color: '#E91E63',
                },
              }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default App;


