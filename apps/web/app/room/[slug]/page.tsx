import axios from "axios";
import { HTTP_URL } from "../../../config";
import Chat from "../../../components/Chat";

async function getData(slug: string) {
    // console.log(`${HTTP_URL}/room/${slug}`)
  const res = await axios.get(`${HTTP_URL}/room/${slug}`);
//   console.log(res.data)
  return res.data.Room.id;
}

export default async function ChatRoom({
  params,
}: {
  params: {
    slug: string;
  };
}) {

    const slug=(await params).slug;
    // console.log(typeof(slug))
    const roomId=await getData(slug);
    // console.log(roomId)

  return <div>
    <Chat id={roomId}/>
  </div>;
}
