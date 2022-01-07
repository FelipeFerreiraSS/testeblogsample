import React from "react";
import { default as NextLink } from 'next/link'


//importações
import Prismic from '@prismicio/client'
import { RichText } from "prismic-reactjs"; 
import { Client } from "../utils/prismicHelpers";
import useUpdatePreviewRef from '../utils/useUpdatePreviewRef';

import { Date } from 'prismic-reactjs';
import { format } from 'date-fns-tz'


const Home = ({posts}) => {

	// const date = Date(posts[0].data.date)
	// const displayDate = format(date,'dd, MMMM, yyyy');

	console.log()

    return (
	    <main style={{maxWidth: "1000px", margin: "auto"}}> 
	      <h1>teste Home page</h1>
	      <h2>Categorias</h2>

	      <NextLink href="/tag/front-end">
	      	<a>Front-end</a>
	      </NextLink>
	      <NextLink href="/tag/back-end">
	      	<a>Back-end</a>
	      </NextLink>
	      <h3>blog original</h3>
	      <NextLink href="/blog">
	      	<a>link para blog</a>
	      </NextLink>

	      <h2>Teste de posts:</h2>
	      
	      {posts.map((post) => (
	      	<div key={post.id} style={{display: "flex"}}>
	      		<div style={{display: "bloq"}}>
	      			<h3>{RichText.asText(post.data.title)}</h3>
	      			<p>{post.data.date}</p>
	      			<p>{RichText.asText(post.data.resume)}</p>
	      		</div>
	      		<img src={post.data.capa.url} alt="" style={{width: "200px"}}/>
	        </div>
	      ))}

	    </main>
    );
  }
;

export async function getStaticProps({ previewData }) {

  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { ref: previewRef } : null

  const blogHome = await Client().getSingle("blog_home", refOption) || null

  const postsQueryOptions = { orderings: "[my.post.date desc]", ...(refOption)}
  const posts = await Client().query(Prismic.Predicates.at("document.type", "post"), postsQueryOptions)

  return {
    props: {
      blogHome,
      posts: posts ? posts.results : [],
      previewRef,
    }
  }
}


export default Home;
