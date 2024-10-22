import { Button, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaySlip = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }
  const handlePaySlip = () => {}
  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Pay Slip
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />
      <div>
        <TextField
          fullWidth
          label="Employee Id"
          size="small"
          
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <TextField
          fullWidth
          label="First Name"
          size="small"
          type='text'
          variant="outlined"
        >
        </TextField>
        <TextField
          fullWidth
          label="Last Name"
          size="small"
          type="text"
          variant="outlined"
        />
      </div>
      <div className="col-span-3 flex justify-center space-x-4">
        <Button variant="contained" color="secondary" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handlePaySlip}>
          Get PaySlip
        </Button>
      </div>
    </div>
  )
}

export default PaySlip
