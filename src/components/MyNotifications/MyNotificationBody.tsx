import MyNotificationItem from "./MyNotificationItem";
import { DUMMYNOTIFICAITION } from "./DUMMYNOTIFICATION";

const DUMMYDATA = [
  DUMMYNOTIFICAITION,
  DUMMYNOTIFICAITION,
  DUMMYNOTIFICAITION,
  DUMMYNOTIFICAITION,
  DUMMYNOTIFICAITION,
];
const MyNotificationBody = () => {
  return (
    <main className="p-10pxr">
      <ul className="list-none">
        {DUMMYDATA.map(({ _id, seen, author, comment, createdAt }) => {
          return (
            <MyNotificationItem
              key={_id}
              seen={seen}
              author={author.fullName}
              comment={comment.comment}
              createdAt={createdAt}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default MyNotificationBody;
