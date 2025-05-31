import ModalForm from "./components/ModalForm";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";
import { useEffect } from "react";
import { useClientStore } from "./stores/useClientStore";


const App = () => {

  const { clients } = useClientStore();
  
  // All Data
  useEffect(()=> {
    console.log("All client", clients);
  }, [clients])

  return (
    <>
      <Navbar />
      <TableList />
      <ModalForm />
    </>
  );
};

export default App;
