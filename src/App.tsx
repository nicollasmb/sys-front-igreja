import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/table/table-nav";

export function App() {
  return (
    <div>
      <Header />

      <div className="max-w-[1112px] mx-auto py-5 flex flex-col gap-5">
        <AttendeeList />
      </div>
    </div>
  );
}
