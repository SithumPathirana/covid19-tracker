import React from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography } from '@mui/material';

function InfoBox({ title, cases, total }) {
  return (
    <Card className="info-box">
      <CardContent>
        <Typography color={'#3E5060'} className="info-box-title">
          {title}
        </Typography>

        <h2 className="info-box-cases">{cases}</h2>

        <Typography color={'#3E5060'} className="info-box-total">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
