import React from "react";
import { default as NextLink } from 'next/link'

import { posts } from 'styles'


//importações
import Prismic from '@prismicio/client'
import { RichText } from "prismic-reactjs"; 
import { Client } from "../utils/prismicHelpers";
import useUpdatePreviewRef from '../utils/useUpdatePreviewRef';



const Home = ({posts}) => {
	console.log(posts)
    return (
    <> 
      <h1>teste Home page</h1>
      <NextLink href="/blog">
      	<a>link para blog</a>
      </NextLink>
      <h2>Teste de posts:</h2>
      {posts.map((post) => (
      	<div key={post.id}>
      		<h3>{RichText.asText(post.data.title)}</h3> 
      		<p>{RichText.asText(post.data.resume)}</p>
      		<img src={post.data.capa.url} alt=""/>
        </div>
      ))}
      {/*<h3>{RichText.asText(posts[1].data.title)}</h3>*/}
      
    </>
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
