import { PublicKey, SystemProgram } from "@solana/web3.js";

export async function getPostById(postId, program) {
  try {
    const post = await program.account.postAccount.fetch(new PublicKey(postId));
    const userId = post.user.toString();
    if (userId === SystemProgram.programId.toString()) {
      return;
    }
    return {
      id: postId,
      imagehash: post.imagehash,
      title: post.title,
      content: post.content,
      date: post.date,
      userId,
    };
  } catch (e) {
    console.log(e.message);
  }
}
