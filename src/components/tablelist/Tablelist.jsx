import "./tablelist.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Tablelist = () => {

  const rows =[
    {
      id:2344,
      Fullname:"mirindi saidi",
      address:"rubavu",
      organizatin:"RDDFG",
      status:"Private",
    },

    {
      id:2900,
      Fullname:"Mahame Alfred",
      address:"rubavu",
      organizatin:"RDDFG",
      status:"Public",
    },

    {
      id:2100,
      Fullname:"My foot",
      address:"rubavu",
      organizatin:"RDDFG",
      status:"Private",
    },
  ];


  return (
    
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><b>Id</b> </TableCell>
          <TableCell className="tableCell"><b>Fullname</b></TableCell>
          <TableCell className="tableCell"><b>Address</b></TableCell>
          <TableCell className="tableCell"><b>Organization</b></TableCell>
          <TableCell className="tableCell"><b>status</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell className="tableCell" >{row.Fullname}</TableCell>
            <TableCell className="tableCell">{row.address}</TableCell>
            <TableCell className="tableCell">{row.organizatin}</TableCell>
            <TableCell className="tableCell">
               <span className={`status ${row.status}`}>{row.status}</span> 
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  )
}

export default Tablelist