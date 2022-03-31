import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Receita from '../../services/Receita';
import Doutor from '../../services/Doutor';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paciente from '../../services/Paciente';
import { formataData } from '../../fns/helpers';
import NavBarLogOut from '../../components/NavBarLogOut';

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    carregando: {
        index: 2,
        backgroundColor: theme.palette.text.disabled,
    },
    alerta: {
        backgroundColor: theme.palette.error.main,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(0);
    const [doutor, setDoutor] = React.useState();
    const [receitas, setReceitas] = React.useState();
    const [receita, setReceita] = React.useState();
    const [novaReceita, setNovaReceita] = React.useState('false');
    const [assinar, setAssinar] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const [msg, setMsg] = React.useState('');


    React.useEffect(() => {
        Doutor.findById().then(res => {
            setDoutor(res.data)
        });
        Receita.findAll().then(res => {
            setReceitas(res.data)
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (id) => {
        const receit = receitas.find(it => it.id === id);
        if (receit) {
            receit.validite = formataData(receit.validity);
            receit.cod = receit.id.substring(receit.id.length - 6);
        }

        setReceita(receit);
        setOpen(true);
    }

    const deletarReceita = (id) => {
        Receita.delete(id)
            .then(res => {
                Receita.findAll()
                    .then(result => {
                        setReceitas(result.data)
                        setOpen(false);
                    })
                    .catch(error => {
                        setMsg(error.response.data.err)
                    })
            });
    }


    const cadastrarReceita = () => {
        setLoad(true);
        const venceEm = document.getElementById("inpValidity").value
        var data = new Date();
        data.setDate(data.getDate() + parseInt(venceEm));

        const novaReceita = {
            composed: document.getElementById("inpComposed").value,
            dosage: document.getElementById("inpDosage").value,
            timesDay: parseInt(document.getElementById("inpTimesDay").value),
            note: document.getElementById("inpNote").value,
            validity: data
        }
        Paciente.findByCpf(document.getElementById("inpCpf").value)
            .then(res => {
                novaReceita.patientId = res.data.id
                Receita.create(novaReceita)
                    .then(result => {
                        setNovaReceita(result.data.url);
                        setAssinar(true);
                        setLoad(false);
                    })
                    .catch(error => {
                        console.log(error)
                        const texto = error.response.data.message.split('.')
                        setMsg(texto[0] + '.')
                    });
            })
    };

    return (
        <div>
            <NavBarLogOut />
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                    >
                        <LinkTab label="Prescrição de Receita" href="/drafts" {...a11yProps(0)} />
                        <LinkTab label="Listagem das Receitas" href="/trash" {...a11yProps(1)} />
                        <LinkTab label="Meus Dados" href="/trash" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                {load ? (
                    <div severity="info">Carregando as informaçoes. Aguarde! </div>
                ) : (
                    <TabPanel value={value} index={0}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            {!assinar ? (
                                <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                        <ReceiptIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Cadastro de Receita Medica
                                    </Typography>
                                    <form className={classes.form} noValidate>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="inpCpf"
                                                    label="CPF"
                                                    name="cpf"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <TextField
                                                    name="Composição Quimica"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="inpComposed"
                                                    label="Composição Quimica"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="inpDosage"
                                                    label="Dosagem"
                                                    name="dosagem"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    id="inpNote"
                                                    label="Observação"
                                                    multiline
                                                    fullWidth
                                                    rows={10}
                                                    variant="outlined"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    id="inpValidity"
                                                    label="Dias de Validade"
                                                    name="Validade"
                                                    autoComplete="Validade"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    name="TimesDay"
                                                    label="Vezes ao dia"
                                                    type="TimesDay"
                                                    id="inpTimesDay"
                                                />
                                            </Grid>
                                        </Grid>
                                        {msg ? (<div className={classes.alerta}>
                                            <h3 ><strong>{msg}</strong></h3>
                                        </div>) : ''}
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={cadastrarReceita}
                                        >
                                            Prescrever
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <div>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        href={novaReceita}
                                    >
                                        Assinar Receita
                                    </Button>

                                </div>
                            )}
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </Container>
                    </TabPanel>
                )}

                <TabPanel value={value} index={1}>
                    {!receitas ? (
                        <ListItemText primary={'Não foi possivel listar a receita'} />
                    ) : (
                        <List component="nav" className={classes.root} aria-label="contacts">
                            {receitas.map((item) => {
                                var cod = item.id.substring(item.id.length - 6);
                                var dataFormatad = formataData(item.validity);

                                return (
                                    <ListItem button variant="outlined" color="primary" onClick={() => handleClickOpen(item.id)}>
                                        <ListItemIcon >
                                            <ReceiptIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={cod + " - " + item.patient.name + " - " + dataFormatad} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    )}
                </TabPanel>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                        {!receita ? (
                            <ListItemText primary={'Não foi possivel detalhar a receita'} />
                        ) : (
                            <div component="main" maxWidth="xs">
                                <ListItemText>
                                    <Avatar className={classes.avatar}>
                                        <ReceiptIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Receita Medica
                                    </Typography>
                                    <form className={classes.form} noValidate>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    // variant="outlined"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    variant="outlined"
                                                    id="Paciente"
                                                    label="Paciente"
                                                    name="Paciente"
                                                    fullWidth
                                                    value={receita.patient.name}
                                                    className={classes.textField}

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    className={classes.textField}
                                                    fullWidth
                                                    variant="outlined"
                                                    name="Composição Quimica"
                                                    id="inpComposition"
                                                    label="Composição Quimica"
                                                    value={receita.composed}
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    className={classes.textField}
                                                    variant="outlined"
                                                    id="inpDosage"
                                                    label="Dosagem"
                                                    name="dosagem"
                                                    value={receita.dosage}
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    className={classes.textField}
                                                    variant="outlined"
                                                    id="inpTimesDay"
                                                    label="Vezes ao Dia"
                                                    name="vezesaodia"
                                                    value={receita.timesDay}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    className={classes.textField}
                                                    id="inpNote"
                                                    label="Observação"
                                                    multiline
                                                    fullWidth
                                                    rows={10}
                                                    variant="outlined"
                                                    value={receita.note}

                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    variant="outlined"
                                                    fullWidth
                                                    className={classes.textField}
                                                    id="Validade"
                                                    label="Receita Válida até"
                                                    name="Validade"
                                                    autoComplete="Validade"
                                                    value={receita.validite}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    className={classes.textField}
                                                    variant="outlined"
                                                    fullWidth
                                                    name="Doutor"
                                                    label="Doutor"
                                                    value={receita.doctor.name}
                                                    id="Doutor"
                                                />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </ListItemText>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    onClick={() => deletarReceita(receita.id)}>
                                    Deletar Receita
                                </Button>
                                {msg ? (<div className={classes.alerta}>
                                    <h3 ><strong>{msg}</strong></h3>
                                </div>) : ''}
                            </div>

                        )}
                    </List>
                </Dialog>
                <TabPanel value={value} index={2}>
                    <List component="nav" className={classes.root} aria-label="contacts">
                        <ListItemText>
                            <div>
                                {!doutor ? (
                                    <ListItemText primary={'Não foi possivel detalhar os dados do Medico'} />
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                fullWidth
                                                name="Nome"
                                                label="Nome"
                                                value={doutor.name}
                                                id="Doutor"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                fullWidth
                                                name="paciente"
                                                label="CPF"
                                                value={doutor.cpf}
                                                id="Paciente"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                name="crm"
                                                label="CRM"
                                                value={doutor.crx}
                                                id="crm"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                fullWidth
                                                name="endereco"
                                                label="Endereço"
                                                value={'Rua: ' + doutor.address}
                                                id="Endereco"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                id="Cidade"
                                                label="Cidade"
                                                name="Cidade"
                                                value={doutor.city}
                                            />

                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                id="estado"
                                                label="Estado"
                                                name="vezesaodia"
                                                value={doutor.province}
                                            />

                                        </Grid>
                                    </Grid>

                                )}
                            </div>
                        </ListItemText>
                    </List>
                </TabPanel>
            </div>
        </div>
    );
}
