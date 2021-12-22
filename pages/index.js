import React from "react";

import { default as NextLink } from 'next/link'


const Home = () => {
    return (
    <>  
      <h1>teste Home page</h1>
      <NextLink href="/blog">
      <a>link para blog</a>
    </NextLink>
    </>
    );
  }
;

export default Home;
