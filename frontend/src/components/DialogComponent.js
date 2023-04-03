import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, opciones, header, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const checkGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (checkGroupRef.current != null) {
      checkGroupRef.current.focus();
    }
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Seleccione para filtrar</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={checkGroupRef}
          aria-label={header}
          name={header}
          value={value}
          onChange={handleChange}
        >
          {opciones.map((option) => (
            <FormControlLabel
              value={option.id}
              key={option.id}
              control={<Checkbox />}
              label={option.descripcion}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function ConfirmationDialog(props) {
  const { opciones, header, ...other } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="div" role="group">
        <ListItem
          divider
          aria-haspopup="true"
          aria-controls="menu"
          aria-label={header}
          onClick={handleClickListItem}
        >
          <ListItemText primary={header} />
        </ListItem>
        <ConfirmationDialogRaw
          id="menu"
          keepMounted
          open={open}
          onClose={handleClose}
          opciones={opciones}
        />
      </List>
    </Box>
  );
}
