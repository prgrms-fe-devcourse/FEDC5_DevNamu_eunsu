import MyThreadItem from "./ThreadItem";

const Date = ({ date }: { date?: string }) => {
  return <p className="text-m mt-40pxr py-1pxr font-bold">{date ?? "12월 26일 화요일"}</p>;
};

//TODO 로직 구현시 'GET /posts/author/{authorId}' 로 Post[]받아와서 channel로 무능|칭찬|응원 구분하기 (2023.12.30)
//의문) 내가 쓴 Comments는 API에서 GET으로 받아올 수 없는데 어떻게 하지? (2023.12.30)

const MyThreadBody = () => {
  return (
    <div className="p-10pxr">
      <Date date="오늘" />
      <MyThreadItem type="comment" channel="무능" content="아 오늘 아무것도안함" />
      <MyThreadItem type="post" channel="칭찬" />
      <MyThreadItem type="post" channel="응원" />

      <Date date="어제" />
      <MyThreadItem type="comment" channel="무능" content="아 오늘 아무것도안함" />
      <MyThreadItem type="post" channel="칭찬" />
      <MyThreadItem type="post" channel="응원" />
    </div>
  );
};

export default MyThreadBody;
