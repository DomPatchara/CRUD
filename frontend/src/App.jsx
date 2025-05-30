import ModalForm from "./components/ModalForm";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";
import { useState } from "react";

const App = () => {
  const [selectedId, setSelectedId] = useState("");

  // State Input
  const [user, setUser] = useState([
    {
      name: "",
      email: "",
      job: "",
      rate: "",
      isactive: "",
    },
  ]);

  // All Data
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  // Modal set State
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  // Open Modal :  modes ---> [1] add , [2] edit
  const handleOpen = (mode) => {
    setIsOpen(true);
    setModalMode(mode);
  };

  // Close Modal
  const handelCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Navbar
        handleOpen={handleOpen}
        setUser={setUser}
        onSearch={setSearchTerm}
      />
      <TableList
        handleOpen={handleOpen}
        clients={clients}
        setClients={setClients}
        setUser={setUser}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        searchTerm={searchTerm}
      />
      <ModalForm
        user={user}
        setUser={setUser}
        modalMode={modalMode}
        isOpen={isOpen}
        onClose={handelCloseModal}
        clients={clients}
        setClients={setClients}
        selectedId={selectedId}
      />
    </>
  );
};

export default App;
