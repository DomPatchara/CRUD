import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const ModalDelete = ({ isOpen, onClose, confirmDelete }) => {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h5" fontWeight={"bold"} component="h2" color="red">
            Delete
          </Typography>
          <Typography align="center" sx={{ mt: 2 }}>
            Are you sure for delete this client ?
          </Typography>
          <div className="flex gap-2 items-center mt-4 justify-end">
            <Button onClick={onClose} variant="contained" color="success">
              No
            </Button>
            <Button onClick={confirmDelete} variant="contained" color="error">
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDelete;
