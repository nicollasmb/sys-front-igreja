import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";
import { Header2 } from "./components/header2";

export function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <Header2></Header2>
      <AttendeeList />
    </div>
  );
}
