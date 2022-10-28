import { AnchorProvider, Program } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "src/context/functions/getPostById";
import idl from "src/idl.json";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider) {
  return new Program(idl, PROGRAM_KEY, provider);
}

export const FullPost = () => {
  const { id } = useParams();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    try {
      if (provider) {
        const getPost = async () => {
          const program = getProgram(provider);
          const post = await getPostById(id.toString(), program);
          setPost(post);
          console.log(post);
        };
        getPost();
      }
    } catch { }
  }, [provider]);

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }
  }, [connection, wallet]);


  return (
    <section>
      <a href="/" className="rounded-lg flex justify-center items-center py-2 px-4 text-sm font-medium text-white bg-gradient-to-r pink focus:outline-none shadow-md 
			ml-3 mr-2 transform hover:-translate-y-px focus:shadow-sm focus:-translate-y-0
			" style={{ width: "20%", margin: "60px auto 0"}}>Back</a>

    
    <article className="background-color" style={{color: "#ffffff"}}>
      <div className="container mt-5 mb-5">
    <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-6">
            <div className="">
                <div style={{textAlign: "center"}}>
                  <p style={{fontSize: "x-large", fontWeight: "700", marginBottom: "10px"}}>{post?.title}</p>
                  <p style={{fontSize: "large", fontWeight: "400", marginBottom: "20px"}}>{post?.date}</p> 
                </div> 
                <img src={`https://vuqle.infura-ipfs.io/ipfs/${post?.imagehash}`} class="img-fluid" />
                <div className="p-2">
                    <p className="text-justify">{post?.content}</p>
                </div>
            </div>
        </div>
    </div>
</div>
      
    </article>
    </section>
  );
};
