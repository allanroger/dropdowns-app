import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from 'react-uuid';
import { Container, FormControl, Grid, InputLabel, Select, Typography } from "@material-ui/core";

function App() {
  const [uf, setUf] = useState('AC');
  const [listUf, setListUf] = useState([]);
  const [city, setCity] = useState('');
  const [listCity, setListCity] = useState([]);

  const loadUf = () => {
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    axios
    .get(url)
    .then(resp  => resp.data)
    .then(data => {        
      data.sort((a,b) => a.nome.localeCompare(b.nome));
      setListUf([ ...data ]);
    });
  }

  const loadCity = (id) => {
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`;

    axios
    .get(url)
    .then(resp => resp.data)
    .then(data => {        
      data.sort((a,b) => a.nome.localeCompare(b.nome));
      setListCity([ ...data ]);
    });
  }

  useEffect(() => {
    loadUf();
    if ( uf ) {
      loadCity( uf );
      setCity('');
    }
  }, [ uf ]);

  return (
    <Container className="App">
      <Grid container>
        <Grid item xs={ 6 }>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="list-uf">
              Estado
            </InputLabel>
            <Select
              native
              inputProps={{
                id: "list-uf"
              }}
              value={ uf }
              onChange={e => setUf(e.target.value)}>
              <option value="">
                Escolha um Estado
              </option>
              {listUf.map((a, b) => (
                <option value={ a.id } key={ uuid() }>
                  { a.sigla } - { a.nome }
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={ 6 }>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="list-city">
              Cidade
            </InputLabel>
            <Select
              native
              inputProps={{
                id: "list-city"
              }}
              value={ city }
              onChange={e => setCity(e.target.value)}>
              <option value="">
                Escolha uma Cidade
              </option>
              {listCity.map((a, b) => ( 
                <option value={ a.sigla } key={ uuid() }>
                  { a.nome }
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={ 12 }>
          <Typography>
            <strong>Cidade selecionada:</strong>  { city }
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;