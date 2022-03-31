import React from 'react';
import teste from '../img/mss.gif';
import Navbar from '../components/Navbar';


function Home() {
  return (
    <div>
      <Navbar />
      <div className='home'>
          <img  src={teste} alt="title" 
      />
      </div>
    </div>
  );
}

export default Home;