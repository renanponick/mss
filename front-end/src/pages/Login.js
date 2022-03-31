import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import Auth from '../services/Auth';
import { useLocation } from 'react-router-dom';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Medical Support System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cartaodosus.info/wp-content/uploads/2019/07/planos-de-saude.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alerta : {
    backgroundColor: theme.palette.error.main,
  }
}));

export default function Login() {
  let pag = useLocation();
  console.log(pag.pathname)
  const classes = useStyles();
  const [msg, setMsg] = React.useState('');

  const loginAuth = () => {
    var data = {
      email: document.getElementById("inpEmail").value,
      password: document.getElementById("inpPassword").value
    }
    Auth.signIn(data)
      .then(res => {
        Auth.setUserData(res.data)
        console.log(res.data)
        switch (res.data.type) {
          case 0:
            window.location.href="/CadastroReceita"
            break;
          case 1:
            window.location.href="/TelaPaciente"
            break;
          case 2:
            window.location.href="/TelaFarmacia"
            break;
          default:
            break;
        }
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Acesso ao MSS
            </Typography>
            { msg ? ( 
              <div className={classes.alerta}> 
              <h3 ><strong>{msg}</strong></h3>
              </div>
             ) : '' }
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="inpEmail"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="inpPassword"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginAuth}
            >
              Entrar
              </Button>
            <Grid container>
              <Grid item>
                <Link href="./cadastros" variant="body2">
                  {"Não possui cadastro ? Acesse aqui para realizar seu acesso"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  </div>
);
}