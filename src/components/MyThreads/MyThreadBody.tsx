import useUserStore from "@/stores/user";

import MyThreadItem from "./MyThreadItem";

import useMyThreadQuery from "@/apis/mythreads/useMyThreadQuery";

const Date = ({ date }: { date?: string }) => {
  return <p className="text-m mt-40pxr py-1pxr font-bold">{date}</p>;
};

//TODO) Comments는 API에서 GET으로 받아올 수 없는 문제 처리 논의 (2023.12.30)

const MyThreadBody = () => {
  const user = useUserStore((state) => state.user);
  const id = user?.id;

  //TODO: 현재는 비로그인 시에도 list목록이 보이게 id 직접 넣어줬지만, 비로그인시 동작 논의(2024.01.02)
  const { data, isPending } = useMyThreadQuery(id ? id : "658f0f92c31af67084101253");

  if (isPending || data === undefined) {
    return <span>Loading...</span>;
  }

  return (
    <main className="p-10pxr">
      <Date date="날짜 구분 필요..." />
      {data.map(({ _id, channel, title, createdAt }) => {
        return (
          <MyThreadItem
            key={_id}
            type="post"
            channel={channel.name}
            title={title}
            createdAt={createdAt}
          ></MyThreadItem>
        );
      })}
    </main>
  );
};

export default MyThreadBody;
