import React, {useState} from 'react';
import {useQuery} from "urql";

import { useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

const QUERY = `
{
launchesPast(limit: 20) {
    mission_name
    rocket {
      rocket_name
    }
    id
    launch_date_utc
    launch_success
  }
}
`;

interface RowData {
    id: string,
    mission_name: string,
    rocket_name: string,
    launch_date: string,
    launch_success: boolean
}

function createRowData(
    id: string,
    mission_name: string,
    rocket_name: string,
    launch_date: string,
    launch_success: boolean
) : RowData {
    return { id, mission_name, rocket_name, launch_date, launch_success };
}

interface Column {
    visible: boolean,
    name : string,
    key : string,
}

export const DataTable = () => {
    // const { t, i18n } = useTranslation();
    const [columnNames, setColumnNames] = useState([{ key: 'mission_name' ,name : 'Mission name', visible : true}, { key: 'rocket_name', name : 'Rocket name', visible : true}, { key: 'launch_date', name : 'Launch date', visible: true}, { key : 'success', name : 'Success', visible: true}]);

    const navigate = useNavigate();
    const [result] = useQuery({ query : QUERY });

    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Could not load data!</p>;

    const rowData = data.launchesPast.map((launch : any) => createRowData(launch.id, launch.mission_name, launch.rocket.rocket_name, new Date(launch.launch_date_utc).toDateString(), launch.launch_success));

    // When checkbox is clicked, we have to show/hide column in the table
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.name;
        const newList = [...columnNames];
        const found = newList.find(c => c.name === checkboxName);
        if (found) {
            found.visible = !found.visible;
            setColumnNames(newList);
        }
    };

    return (
        <>
            <header>
                <h1 style={{ textAlign : 'center' }}>SpaceX</h1>
            </header>
            <div style={{ textAlign : 'center' }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Select columns to show</FormLabel>
                    <FormGroup aria-label="position" row>
                        {
                            columnNames.map((c: Column) => (
                                <FormControlLabel
                                    value= {c.name}
                                    control={<Checkbox checked={c.visible} onChange={handleChange} name={c.name}/>}
                                    label= {c.key}
                                    labelPlacement="top"
                                />
                            ))
                        }
                    </FormGroup>
                </FormControl>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {columnNames.filter(c => c.visible).map((c: Column) => (
                                    <TableCell align="center">{c.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowData.map((row: RowData) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    { columnNames.some(c => c.name === 'Mission name' && c.visible) && <TableCell align="center">{row.mission_name}</TableCell> }
                                    { columnNames.some(c => c.name === 'Rocket name' && c.visible) && <TableCell align="center">{row.rocket_name}</TableCell> }
                                    { columnNames.some(c => c.name === 'Launch date' && c.visible) && <TableCell align="center">{row.launch_date}</TableCell> }
                                    { columnNames.some(c => c.name === 'Success' && c.visible) && <TableCell align="center">{row.launch_success}</TableCell> }
                                    {
                                        columnNames.some(c => c.visible) &&
                                            <TableCell align="center">
                                                <button onClick={() => navigate(`detail?id=${row.id}`)}>
                                                    Details
                                                </button>
                                            </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
