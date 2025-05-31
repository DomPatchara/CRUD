import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { getClients, postClient, updateClient } from "../api/clientApi";
import toast from "react-hot-toast";
import { useClientStore } from "../stores/useClientStore";

const ModalForm = () => {
  const {
    selectedId,
    user,
    setUser,
    clearInput,
    isOpen,
    setIsOpen,
    modalMode,
    setClients,
  } = useClientStore();

  // Destructure State Input
  const { name, email, job, rate, isactive } = user;

  // onChange Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "add") {
        await postClient(user);
        toast.success("Added Success");
      } else {
        await updateClient(selectedId, user);
        toast.success("Updated Success");
      }

      const newUpdate = await getClients(); // Re-fetch new update data from backend
      setClients(newUpdate);

      // clear input
      clearInput();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong !");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] border rounded-2xl  bg-gray-300 shadow-2xl p-4">
          {/** Head Title */}
          <Typography
            variant="h5"
            fontWeight={"bold"}
            align="center"
            component="h2"
          >
            {modalMode === "add" ? "Client Detail" : "Edit Client"}
          </Typography>

          {/** Input field */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-5">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={name || ""}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email || ""}
              onChange={handleChange}
            />
            <TextField
              name="job"
              label="Job"
              variant="outlined"
              fullWidth
              value={job || ""}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <TextField
                name="rate"
                label="Rate"
                variant="outlined"
                sx={{ width: "50%" }}
                value={rate || ""}
                onChange={handleChange}
              />
              <FormControl sx={{ width: "50%" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="isactive"
                  label="Status"
                  value={isactive || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/** Button Submit */}
            <Button variant="contained" color="success" type="submit">
              {modalMode === "add" ? "Add Client" : " Save Change"}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalForm;
