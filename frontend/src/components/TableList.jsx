import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getClients, deleteClient } from "../api/clientApi";
import ModalDelete from "./ModalDelete";
import toast from "react-hot-toast";
import { useClientStore } from "../stores/useClientStore";

const TableList = () => {
  const [open, setOpen] = useState(false);

  const {
    searchTerm,
    selectedId,
    setSelectedId,
    setUser,
    setIsOpen,
    setModalMode,
    clients,
    setClients,
  } = useClientStore();

  // First Render --->  Get All Data from Postgres
  useEffect(() => {
    const fetchData = async () => {
      const result = await getClients();
      console.log("API result", result);
      setClients(result);
    };

    fetchData();
  }, []);

  // Filter Data by SearchTerm
  const filterClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Edit Modal
  const handleEditClick = (id) => {
    setIsOpen(true);
    setModalMode("edit");
    setSelectedId(id);
    const client = clients.find((c) => c.id === id);
    setUser(client);
  };

  // Open Delete Modal
  const handleDeleteClick = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  // Confirm Delete
  const handleDelete = async () => {
    try {
      await deleteClient(selectedId);
      
      // Re-fetch new update data from backend
      const newUpdate = await getClients(); 
      setClients(newUpdate);

      toast.success("Deleted !! ");
    } catch (error) {
      console.error("Delete error!", error);
      toast.error("Someting went wrong !");
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="px-8">
      {/** Modal Makesure for Delete  */}
      <ModalDelete
        isOpen={open}
        onClose={() => setOpen(false)}
        confirmDelete={handleDelete}
      />

      {/** Table Data */}
      <TableContainer component={Paper} sx={{ borderRadius: "1rem" }}>
        <Table sx={{ minWidth: 650 }} className="bg-gray-400">
          <TableHead sx={{ "& th": { fontWeight: "bold" } }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Job</TableCell>
              <TableCell align="left">Rate</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterClients.map((client, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell align="left">{client.email}</TableCell>
                <TableCell align="left">{client.job}</TableCell>
                <TableCell align="left">{client.rate}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color={clsx(client.isactive ? "success" : "error")}
                  >
                    {client.isactive ? "Actice" : "InActive"}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleEditClick(client.id)}
                      size="small"
                      variant="contained"
                      color="secondary"
                      startIcon={<CiEdit />}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(client.id)}
                      size="small"
                      variant="contained"
                      color="error"
                      startIcon={<MdDelete />}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableList;
