import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useEffect, useState} from "react"
import { Button } from "src/components/Button"
import { PostForm } from "src/components/PostForm"
import { useBlog } from "src/context/Blog"
import { useHistory } from 'react-router-dom'
import React, { Component } from "react";

import { create as ipfsHttpClient } from "ipfs-http-client";

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
  }
  showFileUpload() {
    this.fileUpload.current.click();
  }

  render() {
    const handleSubmit= ()=>{
      document.getElementById("imageupload").click()
    }
    return (
      <div className="AddImage">
        <input
          type="file"
          id="my_file"
          style={{ display: "none" }}
          ref={this.fileUpload}
          onChange = {handleSubmit}
        />
        <img id="postImageSrc" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjZmZmIj4KICA8cGF0aCBkPSJtNTAxLjU0IDM2My4yMmMxMC41OSAwIDE5LjM3NSA4LjUxOTUgMTkuMzc1IDE5LjM1OSAwIDEwLjU4Ni04Ljc4NTIgMTkuMzU5LTE5LjM3NSAxOS4zNTloLTE1LjIzOGMtMTAuODUyIDAtMTkuMzc1LTguNzc3My0xOS4zNzUtMTkuMzU5IDAtMTAuODQ0IDguNTIzNC0xOS4zNTkgMTkuMzc1LTE5LjM1OXoiLz4KICA8cGF0aCBkPSJtMzc2LjI2IDM2NGM0NC42ODggMCA4MS4xMDkgMzUuODgzIDgxLjEwOSA4MC41NDcgMCA0NC42NjQtMzYuNDIyIDgwLjI4NS04MS4xMDkgODAuNTQ3LTQ0LjY4OC0wLjI2MTcyLTgxLjM3MS0zNS44ODMtODEuMzcxLTgwLjU0NyAwLTQ0LjY2NCAzNi42OC04MC41NDcgODEuMzcxLTgwLjU0N3ptNDIuMzYzIDgwLjU0N2MwLTIyLjk3Ny0xOC44NTktNDEuODItNDIuMzYzLTQxLjgyLTIzLjc2NiAwLTQyLjYyMSAxOC44NDQtNDIuNjIxIDQxLjgyIDAgMjIuNzE5IDE4Ljg1OSA0MS44MiA0Mi42MjEgNDEuODIgMjMuNTA0IDAgNDIuMzYzLTE5LjEwMiA0Mi4zNjMtNDEuODJ6Ii8+CiAgPHBhdGggZD0ibTM4OS45NSAxNjguNTcgNTIuNDQxIDUyLjQwNmM3Ljc0NjEgNy43NDIyIDcuNzQ2MSAxOS44NzUgMCAyNy4zNjMtNy40OTIyIDcuNzQyMi0xOS44OTEgNy43NDIyLTI3LjM4MyAwbC0xOS4zNzUtMTkuMzU5djgzLjEyOWMwIDEwLjU4Ni04Ljc4NTIgMTkuMzU5LTE5LjM3NSAxOS4zNTktMTAuODUyIDAtMTkuMzc1LTguNzc3My0xOS4zNzUtMTkuMzU5di04My4xMjlsLTE5LjYyOSAxOS4zNTljLTcuNDkyMiA3Ljc0MjItMTkuNjI5IDcuNzQyMi0yNy4zODMgMC03LjQ5MjItNy40ODgzLTcuNDkyMi0xOS44NzUgMC0yNy4zNjNsNTIuNjk5LTUyLjQwNmMxLjU0NjktMS4yOTMgMy4xMDE2LTIuNTgyIDQuNjUyMy0zLjM1OTQgMS41NDY5LTEuMDMxMiAzLjM1OTQtMS41NDY5IDUuMTY4LTIuMDY2NCAxLjI4NTIgMC4wMTE3MTkgMi41NzgxLTAuMjUgMy44NzExLTAuMjVzMi41ODIgMC4yNjE3MiAzLjg3NSAwLjI2MTcyYzEuODA4NiAwLjUxNTYyIDMuNjE3MiAxLjAzMTIgNS4xNjggMi4wNjY0IDEuNTQ2OSAwLjc2OTUzIDMuMDkzOCAyLjA2MjUgNC42NDQ1IDMuMzQ3N3oiLz4KICA8cGF0aCBkPSJtNTIwLjY2IDU4OS4xMWgtMjg5LjA1Yy0zNy45NzMtMC4yNjE3Mi02OC43MTEtMzAuOTc3LTY4LjcxMS02OC42Njh2LTE1OS4wM2MwLTM3Ljk0OSAzMC45OTYtNjguNDE0IDY4LjcxMS02OC40MTRoNTQuNTA0YzEwLjU5IDAgMTkuMzc1IDguNTE5NSAxOS4zNzUgMTkuMzU5IDAgMTAuNTg2LTguNzg1MiAxOS4zNTktMTkuMzc1IDE5LjM1OWwtNTQuNTA0IDAuMDAzOTA2Yy0xNi41MzEgMC0yOS45NjUgMTMuNDI2LTI5Ljk2NSAyOS42ODh2MTU5LjA0YzAgOC4wMDM5IDMuMzU5NCAxNS40OTIgOC43ODUyIDIwLjkxNCA1LjY4MzYgNS42Nzk3IDEyLjkxNCA5LjAzNTIgMjEuMTg0IDkuMDM1MmgyODkuMDVjMTYuMjczIDAgMjkuNzA3LTEzLjY4NCAyOS43MDctMjkuOTQ1bDAuMDAzOTA2LTE1OS4wNGMwLTE2LjUyMy0xMy4xNzYtMjkuNjg4LTI5LjcwNy0yOS42ODhoLTU0Ljc2NmMtMTAuNTkgMC0xOS4zNzUtOC43NzczLTE5LjM3NS0xOS4zNTkgMC0xMC44NDQgOC43ODUyLTE5LjM1OSAxOS4zNzUtMTkuMzU5aDU0Ljc2NmMzNy43MDctMC4wMDc4MTIgNjguNDQ5IDMwLjQ2MSA2OC40NDkgNjguNDA2djE1OS4wM2MwIDM3LjY5MS0zMC40OCA2OC40MDYtNjguNDU3IDY4LjY2OHoiLz4KIDwvZz4KPC9zdmc+Cg=="
          width="30px" style={{margin: "0 auto",width: "60%", cursor: "pointer"}}
          title="Upload Banner Image"
          onClick={this.showFileUpload}
        />
      </div>
    );
  }
}

export const Dashboard = () => {
  const history = useHistory()
  const [connecting, setConnecting] = useState(false)
  const { connected, select } = useWallet()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [postImageHash, setPostImageHash] = useState("")

  
  

  const projectId = "2Gi3qHZFvQv4ggUOzvWVdaDdHRg";
  const projectSecret = "993b4a672f36325ccaa0bf17fa1c2e23";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers:{
      authorization
    }
  })

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = (form[0]).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setPostImageHash(result.path)

    
    document.getElementById("postImageSrc").src = "https://vuqle.infura-ipfs.io/ipfs/" + result.path

  };



  const [images, setImages] = useState([])

  // Static Data
  const { user, initialized, initUser, showModal, setShowModal, createPost, posts } = useBlog()
  
  /////////////////

  const onConnect = () => {
    setConnecting(true)
    select(PhantomWalletName)
  }

  useEffect(() => {
    if (user) {
      setConnecting(false)
    }
  }, [user])

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14  shadow-md">
        <div className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 colorWhite"
            >
              Vuqle
            </div>
          </h2>
          {connected ? (
            <div className="flex items-center">
              
              {user ? (<img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />):(
                <p></p>
              )}
              
              <p className=" font-bold text-sm ml-2 capitalize">
                {user?.name}
              </p>
              {initialized ? (
                  <Button
                    className="ml-3 mr-2"
                    onClick={() => {
                      setShowModal(true)
                    }}
                  >
                    Create Post
                  </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    initUser()
                  }}
                >
                  Initialize User
                </Button>
              )}
              
            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          {/* <h1 className="title">The Blog</h1> */}
          <div className="App">
          
        </div>
        <div>
        
      </div>
          <div className="row" style={{maxWidth: "640px"}}>

            <div className="all__posts">
              {posts.map((item) => {
                return (
                  <article style={{cursor: "pointer"}} className="post__card-2"
                    onClick={() => {
                      history.push(`/read-post/${item.publicKey.toString()}`)
                    }}
                    key={item.account.id}
                  >
                    <div className="post__card_-2">
                      <div
                        className="post__card__image-2"
                        style={{
                          backgroundImage: `url("https://vuqle.infura-ipfs.io/ipfs/${item.account.imagehash}")`,
                        }}
                      ></div>
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat">{item.account.date}<span className="dot"> </span>{item.account.title} </div>
                          <p className="post__card_alttitle-2">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
        <div className={`modal ${showModal && 'show-modal'}`} >
          <div className="modal-content">
            <span className="close-button"
              onClick={() => setShowModal(false)}
            >×</span>  
            <div className="rounded-lg py-4 px-6 bg- flex">
            {ipfs && (
              <>
                
                <form onSubmit={onSubmitHandler} style={{width: "100%"}}>
                <AddImage />
                  
                  <button id="imageupload" type="submit" style={{width: "100%", display: "none"}}>submit</button>
                </form>
              </>
            )}          
            </div>
            <PostForm
              postImageHash={postImageHash}
              postTitle={postTitle}
              postContent={postContent}
              setPostImageHash={setPostImageHash}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              onSubmit={() => createPost(postImageHash, postTitle, postContent)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
