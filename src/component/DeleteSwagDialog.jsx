import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function DeleteSwagDialog({
  swag,
  swagData,
  setSwagData,
  handleCloseDeleteSwagDialog,
}) {
  // Delete swag
  const handleDeleteSwag = async () => {
    await fetch(`/swags/${swag.id}`, { method: "DELETE" });
    setSwagData(swagData.filter((swagItem) => swag.id !== swagItem.id));
  };

  return (
    <Dialog open={true} onClose={handleCloseDeleteSwagDialog}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Do you want to delete this swag item?</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteSwagDialog}>Cancel</Button>
        <Button onClick={handleDeleteSwag} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteSwagDialog;
