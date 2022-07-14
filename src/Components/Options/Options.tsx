import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface optionsProps {
  handleChangeOption: any;
  currentVarient: string;
}

function Options(props: optionsProps) {
  const { handleChangeOption, currentVarient } = props;

  const handleChange = (event: SelectChangeEvent) => {
    handleChangeOption(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-standard-label">Varient</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currentVarient}
          onChange={handleChange}
          label={currentVarient}
        >
          <MenuItem value="masonry">masonry</MenuItem>
          <MenuItem value="quilted">quilted</MenuItem>
          <MenuItem value="standard">standard</MenuItem>
          <MenuItem value="woven">woven</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Options;
