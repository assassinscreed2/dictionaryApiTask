
import React,{ useState,useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card:{
      marginTop:"5em",
      backgroundColor:"#EEEEEE"
  }
}))


export default function Home({data,end}) {
  console.log(data)
  const classes = useStyles()
  return <>
  <h1 style={{marginLeft:"50%"}}>DICTIONARY API</h1>
  <Link href={`/${end}`}>
  <Card classes={{root:classes.card}}>
    <CardContent>
      <Typography>
        <b>Word : </b>{data[0].word}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography>
        <b>Phonetics : </b>{data[0].phonetics.length}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography>
        <b>Meanings : </b>{data[0].meanings.length}
      </Typography>
    </CardContent>
  </Card>
  </Link>
  </>
}


export async function getServerSideProps(){
  
  const link = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/home'
  const json = await fetch(link)
  const data = await json.json()
  const endarray = link.split('/')
  const end = endarray[endarray.length-1]
  return {
    props:{data,end}
  }
}