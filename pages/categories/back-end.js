import React from "react";
import { default as NextLink } from 'next/link'


//importações
import Prismic from '@prismicio/client'
import { RichText } from "prismic-reactjs"; 
import { Client } from "../../utils/prismicHelpers";
import useUpdatePreviewRef from '../../utils/useUpdatePreviewRef';


const Home = ({posts}) => {


	console.log(posts[0].tags)

    return (
    <main style={{maxWidth: "1000px", margin: "auto"}}> 
      <h1>Front-end</h1>

      {posts.map((post) => (
      	<div key={post.id} style={{display: "flex"}}>
      		<div style={{display: "bloq"}}>
      			<h3>{RichText.asText(post.data.title)}</h3>
      			<p>{post.data.date}</p>
                <p>{post.tags}</p>
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



  const posts = await Client().query(Prismic.Predicates.at("document.tags", ["back-end"]))

  return {
    props: {
      posts: posts ? posts.results : [],
    }
  }
}


export default Home;
