import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReceiptIcon from '@material-ui/icons/Receipt';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Auth from '../../services/Auth';
import Receita from '../../services/Receita';
import Farmacia from '../../services/Farmacia';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import NavBarLogOut from '../../components/NavBarLogOut';
import { formataData } from '../../fns/helpers';


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
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    iconButton: {
        padding: 10,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavTabs() {
    Auth.isSignedIn(2);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(0);
    const [farmacia, setFarmacia] = React.useState();
    const [receitas, setReceitas] = React.useState();
    const [receita, setReceita] = React.useState();
    const [receitaTake, setReceitaTake] = React.useState();
    const [msg, setMsg ] = React.useState('');

    React.useEffect(() => {
        Farmacia.findById().then(res => {
            setFarmacia(res.data)
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
        let receita = receitas.find(it => it.id === id);
        if (receita) {
            var data = new Date(receita.validity);
            receita.dataFormatada = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
            receita.cod = receita.id.substring(receita.id.length - 6);
        }

        setReceita(receita);
        setOpen(true);
    }

    const buscarReceita = () => {
        Receita.findByToken(document.getElementById("inpToken").value)
            .then(res => {
                setReceitaTake(res.data[0])
            })
            .catch(err => console.log(err))
    }

    const dispensarReceita = () => {
        Receita.takePrescription(receitaTake.id)
            .then(res => { 
                Receita.findAll().then(result => {
                    setReceitas(result.data)
                });
                setMsg('Receita Dispensada com Sucesso!')
            })
            .catch(error => {
                setMsg('Não foi possivel dispensar a receita. ' + error.response.data.err)
            })
        
        setReceitaTake(null)
    }

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
                    <LinkTab id="teste" label="Buscar Receita" href="/trash" {...a11yProps(0)} />
                    <LinkTab label="Minhas Receitas" href="/drafts" {...a11yProps(1)} />
                    <LinkTab label="Meus Dados" href="/trash" {...a11yProps(2)} />

                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <div item xs={12}>
                    <InputBase
                        className={classes.input}
                        variant="outlined"
                        id="inpToken"
                        placeholder="Pesquisar Receita"
                        inputProps={{ 'aria-label': 'Pesquisar Receita' }}
                    />
                    <IconButton className={classes.iconButton} aria-label="Search" onClick={buscarReceita}>
                        <SearchIcon />
                    </IconButton>
                </div>
                {!receitaTake ? (
                    <div item xs={12}>{msg ? msg : '' }</div>
                ) : (
                    <List>
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
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="outlined"
                                                id="Paciente"
                                                label="Paciente"
                                                name="Paciente"
                                                fullWidth
                                                value={receitaTake.patientname}
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
                                                id="composition"
                                                label="Composição Quimica"
                                                value={receitaTake.composed}
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                id="dosage"
                                                label="Dosagem"
                                                name="dosagem"
                                                value={receitaTake.dosage}
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                variant="outlined"
                                                id="vezesaodia"
                                                label="Vezes ao Dia"
                                                name="vezesaodia"
                                                value={receitaTake.times_day}
                                            />

                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                className={classes.textField}
                                                id="outlined-multiline-static"
                                                label="Observação"
                                                multiline
                                                fullWidth
                                                rows={10}
                                                variant="outlined"
                                                value={receitaTake.note}

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
                                                value={receitaTake.validity}
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
                                                value={receitaTake.doctorname + " - " + receitaTake.crx}
                                                id="Doutor"
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </ListItemText>
                        </div>

                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.margin}
                        onClick={dispensarReceita}
                    >
                        Dispensar Receita
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Download da Receita
                    </Button>
                    </List>
                )}
            </TabPanel>

            <TabPanel value={value} index={1}>
                <List component="nav" className={classes.root} aria-label="contacts">
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
                                        <ListItemText primary={cod + " - " + item.doctor.name + " - " + item.patient.name + " - " + dataFormatad} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    )}
                </List>
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
                                                id="composition"
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
                                                id="dosage"
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
                                                id="vezesaodia"
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
                                                id="outlined-multiline-static"
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
                                                value={formataData(receita.validity)}
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
                        </div>
                    )}
                </List>
            </Dialog>

            <TabPanel value={value} index={2}>
                <List component="nav" className={classes.root} aria-label="contacts">
                    <ListItemText>
                        <div>
                            {!farmacia? (
                                <ListItemText primary={'Não foi possivel detalhar a pacient'} />
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
                                            name="SocialName"
                                            label="Razão Social"
                                            value={farmacia.socialName}
                                            id="farmacia"
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
                                            name="cnpj"
                                            label="CNPJ"
                                            value={farmacia.cnpj}
                                            id="cnpj"
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
                                            value={'Rua: ' + farmacia.address}
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
                                            value={farmacia.city}
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
                                            value={farmacia.province}
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
