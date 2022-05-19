import { useState, useEffect, useCallback } from "react";
import { BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import "./App.css";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const filteredList = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(function fetchData() {
    fetch("./data.json")
      .then((res) => res.json())
      .then((res) => setAppointmentList(res));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
        <BiArchive className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <AddAppointment
        setAppointmentList={setAppointmentList}
        appointmentList={appointmentList}
      />
      <Search
        query={query}
        orderBy={orderBy}
        sortBy={sortBy}
        onOrderByChange={(myOrder) => setOrderBy(myOrder)}
        onSortByChange={(mySort) => setSortBy(mySort)}
        onQueryChange={(query) => setQuery(query)}
      />
      <ul className="divide-y divide-gray-200">
        {filteredList.map(function (item) {
          return (
            <AppointmentInfo
              onDeleteAppointment={(appointmentId) => {
                setAppointmentList(
                  appointmentList.filter((item) => item.id !== appointmentId)
                );
              }}
              key={item.id}
              item={item}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
