import { Card, CardContent, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles'
import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    card:{
        marginTop:"5em",
        backgroundColor:"#F5E6CA"
    }
}))

export default function detailPage({data}){
    const classes = useStyles()
    console.log(data)
    return <>
    <Typography variant="h1" style={{marginLeft:"45%"}}>{data[0].word}</Typography>
    <Grid item container direction = "row">
    <Grid item style={{marginLeft:"15%"}}>
    <Grid item>
            <Typography variant="h3">
                Meanings
            </Typography>
        </Grid>
    {data && data.map((da,k)=>(
        <Card>
        {da.meanings.map((meaning)=>(
            <CardContent  classes={{root:classes.card}}>
            {meaning.definitions.map((def,i)=>(<>
                <Typography><b>Definition {i+1}</b> : {def.definition}</Typography>
                <Typography><b>Example {i+1}</b> : {def.example}</Typography>
                {def.synonyms && <Typography><b>Synonym</b></Typography>}
                
                {
                    def.synonyms && def.synonyms.map((syn) => (<Typography style={{marginLeft:"6em"}}>{syn}</Typography>))
                }
                </>
            ))}
            <Typography style={{marginLeft:"2em"}}><b>Part Of Speech</b> : {meaning.partOfSpeech}</Typography>
            </CardContent>
        ))}
        <Grid item style={{marginTop:"3em"}}>
            <Typography variant="h3">
                Phonetics
            </Typography>
        </Grid>
        {da.phonetics && da.phonetics.map((pt)=>(
            <CardContent>
            <Typography><b>Audio</b> : {pt.audio}</Typography>
            <Typography><b>Text</b> : {pt.text}</Typography>
            </CardContent>
        ))}
        </Card>
        ) 
    )}

    </Grid>
    </Grid>
    </>
}

export async function getServerSideProps({query}){
  
    const link = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${query.id}`
    const json = await fetch(link)
    const data = await json.json()
    return {
      props:{data}
    }
  }