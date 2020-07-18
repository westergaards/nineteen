import React, { useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import { ViewName } from '../../App'
import './ButtonBar.css'

export const ButtonBar = ({ onClick }) => {
  const [selected, setSelected] = useState('regions')

  const handleClick = (view) => {
    setSelected(view.toLowerCase())
    onClick(view)
  }

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item>
        <Button
          id="regions"
          variant="contained"
          onClick={() => handleClick(ViewName.REGIONS)}
          // className={`button ${selected === 'regions' ? 'active' : null}`}
          color={selected === 'regions' ? 'primary' : 'default'}
        >
          Regions
        </Button>
      </Grid>
      <Grid item>
        <Button
          id="states"
          variant="contained"
          onClick={() => handleClick(ViewName.STATES)}
          color={selected === 'states' ? 'primary' : 'default'}
        >
          States
        </Button>
      </Grid>
      <Grid item>
        <Button
          id="hospital"
          variant="contained"
          onClick={() => handleClick(ViewName.HOSPITAL)}
          color={selected === 'hospital' ? 'primary' : 'default'}
        >
          Hospital
        </Button>
      </Grid>
    </Grid>
  )
}
