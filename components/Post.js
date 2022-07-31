import {
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  DotsHorizontalIcon,
  HeartIcon as HeartIconFill,
} from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "instaPosts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),

    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "instaPosts", id, "likes"), (snapshot) =>
        setComments(snapshot.docs)
      ),

    [db, id]
  );

  console.log("comment", comments, "likes", likes);

  useEffect(
    () =>
      setHasLiked(
        likes?.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(db, "instaPosts", id, "likes", session?.user?.uid)
      ).then(() => setHasLiked(false));
    } else {
      await setDoc(doc(db, "instaPosts", id, "likes", session.user?.uid), {
        username: session.user?.username,
      }).then(setHasLiked(true));
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "instaPosts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          <img
            className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
            src={userImg}
            alt=""
          />
          <p className="cursor-pointer font-bold">{username}</p>
        </div>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      <img src={img} className="object-cover w-full" alt="" />

      {session && (
        <div className="flex justify-between p-x-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFill onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Caption  */}
      <p className="p-5 truncate">
        {likes.length > 0 && <p className="font-bold mb-1">{likes.length}</p>}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5  text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0 outline-none"
            type="text"
            placeholder="Add a comment ..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
