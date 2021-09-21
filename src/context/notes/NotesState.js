// here states of note is created
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "614867840efbd66cc21291a4",
      user: "614351f96019e9ac0b88ed96",
      title: "mytitle2",
      description: "second description is here to add",
      tag: "personal",
      date: "2021-09-20T10:50:44.317Z",
      __v: 0,
    },
    {
      _id: "61486f4a4c93f34c7c9f46a0",
      user: "614351f96019e9ac0b88ed96",
      title: "mytitle new",
      description: "new recent title has this description 8520",
      tag: "personal",
      date: "2021-09-20T11:23:54.060Z",
      __v: 0,
    },
    {
      _id: "61486f4a4c93f34c7c9f46a0",
      user: "614351f96019e9ac0b88ed96",
      title: "mytitle new",
      description: "new recent title has this description 8520",
      tag: "personal",
      date: "2021-09-20T11:23:54.060Z",
      __v: 0,
    },
    {
      _id: "61486f4a4c93f34c7c9f46a0",
      user: "614351f96019e9ac0b88ed96",
      title: "mytitle new",
      description: "new recent title has this description 8520",
      tag: "personal",
      date: "2021-09-20T11:23:54.060Z",
      __v: 0,
    },
    {
      _id: "61486f4a4c93f34c7c9f46a0",
      user: "614351f96019e9ac0b88ed96",
      title: "mytitle new",
      description: "new recent title has this description 8520",
      tag: "personal",
      date: "2021-09-20T11:23:54.060Z",
      __v: 0,
    },
    {
      _id: "61486f4a4c93f34c7c9f46a0",
      user: "614351f96019e9ac0b88ed96",
      title: "mytitle new",
      description: "new recent title has this description 8520",
      tag: "personal",
      date: "2021-09-20T11:23:54.060Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
