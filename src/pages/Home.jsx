import React from 'react'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div>
        <section className='mt-40 ml-20 flex flex-col gap-4'>
            <h1 className='text-4xl text-start font-medium text-'>Welcome to Developers Blog.</h1>
            <p className=''>A place to read, write and understand topics.</p>
            <button className=''>Start Reading</button>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
