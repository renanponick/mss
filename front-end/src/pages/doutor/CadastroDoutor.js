import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Doutor from '../../services/Doutor';
import Navbar from '../../components/Navbar';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="./home">
        Medical Support System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

export default function SignUp() {
  const classes = useStyles();
  const [cpf, setCpf] = useState('');
  const [CPFError, setCPFError] = useState(false);
  const [msg, setMsg] = React.useState('');


  const registreAuth = () => {
    var data = {
      user: {
        email: document.getElementById("inpEmail").value,
        password: document.getElementById("inpPassword").value
      },
      name: document.getElementById("inpName").value,
      cpf: document.getElementById("inpCpf").value,
      crx: document.getElementById("inpCrx").value,
      ufCrx: document.getElementById("inpUfCrx").value,
      role: document.getElementById("inpRole").value,
      address: document.getElementById("inpEndereco").value,
      city: document.getElementById("inpCidade").value,
      province: document.getElementById("inpProvince").value
    }
    console.log(data)
    Doutor.create(data)
    .then(res => {
    window.location.href="/login"
    }) 
    .catch(error => {
      console.log(error)
      const texto = error.response.data.message.split('.')
      setMsg(texto[0]+'.')
    });
};

  return (
    <div>
    <Navbar />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se no
        </Typography>
        <Typography component="h1" variant="h5">
          Medical Support System
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="inpName"
                label="Nome Completo"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="inpCpf"
          label="CPF"
          variant="outlined"
          fullWidth
          error={CPFError}
          helperText={CPFError && "Deve conter 11 dígitos. Insira apenas os números."}
          value={cpf}
          onBlur={(event) => {
            const tmpCPF = event.target.value;

            if (tmpCPF.length !== 11) {
              setCPFError(true);
            } else {
              setCPFError(false);
            }
          }}
          onChange={(event) => {
            const tmpCPF = event.target.value;

            if (tmpCPF.length === 11) {
              setCPFError(false);
            }

            setCpf(event.target.value)}
          }
        />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="inpCrx"
                label="CRX"
                name="crx"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="inpUfCrx"
                label="Estado"
                name="ufcrx"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="inpRole"
                label="Área de atuação"
                name="role"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="inpEndereco"
                label="Endereço"
                name="address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="inpCidade"
                label="Cidade"
                name="city"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="inpProvince"
                label="Estado"
                name="province"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="inpEmail"
                label="Email"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="inpPassword"
              />
            </Grid>
          </Grid>
          { msg ? ( 
              <div className={classes.alerta}> 
              <h3 ><strong>{msg}</strong> Por favor Preencher todos os campos Obrigatorios!</h3>
              </div>
             ) : '' }
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registreAuth}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="./login" variant="body2">
                Você ja possui uma conta ? Então acesse aqui
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}