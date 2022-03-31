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
import Farmacia from '../../services/Farmacia';
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
    const [Cnpj, setCnpj] = useState('');
    const [msg, setMsg] = React.useState('');


    const [CnpjError, setCnpjError] = useState(false);

    const registreAuth = () => {
        var data = {
          user: {
            email: document.getElementById("inpEmail").value,
            password: document.getElementById("inpPassword").value
          },
          socialName: document.getElementById("inpSocialName").value,
          cnpj: document.getElementById("inpCnpj").value,
          address: document.getElementById("inpEndereco").value,
          city: document.getElementById("inpCidade").value,
          province: document.getElementById("inpProvince").value
        }
        console.log(data)
        Farmacia.create(data)
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
                                name="Nome Fantasia"
                                variant="outlined"
                                required
                                fullWidth
                                id="inpSocialName"
                                label="Nome Fantasia"
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="inpCnpj"
                                label="Cnpj"
                                variant="outlined"
                                required
                                fullWidth
                                error={CnpjError}
                                helperText={CnpjError && "Deve conter 14 dígitos. Insira apenas os números."}
                                value={Cnpj}
                                onBlur={(event) => {
                                    const tmpCnpj = event.target.value;

                                    if (tmpCnpj.length !== 14) {
                                        setCnpjError(true);
                                    } else {
                                        setCnpjError(false);
                                    }
                                }}
                                onChange={(event) => {
                                    const tmpCnpj = event.target.value;

                                    if (tmpCnpj.length === 14) {
                                        setCnpjError(false);
                                    }

                                    setCnpj(event.target.value)
                                }
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="inpEndereco"
                                label="Endereço e numero"
                                name="endereco"
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="inpCidade"
                                label="Cidade"
                                name="cidade"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="inpProvince"
                                label="Estado"
                                name="estado"
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
              <h3 ><strong>{msg}</strong>Preencher todos os campos obrigatorios!</h3>
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