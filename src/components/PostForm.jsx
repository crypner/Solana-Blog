import { FC, ReactNode, useState } from "react";
import { Button } from "src/components/Button";
import { useBlog } from "src/context/Blog";



export const PostForm = (props) => {
  const { user } = useBlog();
  const {
    onSubmit,
    postImageHash,
    postTitle,
    postContent,
    setPostContent,
    setPostImageHash,
    setPostTitle,
    formHeader,
    buttonText = "Post",
  } = props;
  const [loading, setLoading] = useState(false);
 
  return (
    <div className="rounded-lg py-4 px-6 bg- flex flex-col ">
      {formHeader}
      <input
        id="PostImageHash"
        value={postImageHash}
        onChange={(e) => setPostImageHash(e.target.value)}
        type="text"
        placeholder="Post Image Hash"
        className="bg-white rounded-3xl h-10 px-4 black"
        hidden
      />
      <input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        type="text"
        placeholder="Post title"
        className="bg-white rounded-3xl h-10 px-4 black"
      />
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        name="content"
        id="content-area"
        rows={3}
        placeholder="Describe your post..."
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></textarea>
      <Button
        className="mt-3"
        disabled={!user}
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          setLoading(false);
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
