import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { alertActions, institucionActions } from '../../_actions';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    rootImage: {
        maxWidth: 345,
    },
    paper: {
        margin: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
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
    textcontrol: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const imgBase = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAA9QTFRF////4hsb4hsbmZmZ4hsbWMYoTwAAAAN0Uk5TAAgQLxhesgAAAp9JREFUeNrt27ENwyAURVFnhGwQeQVW8P4zpUUWilLY+oZ3bg3N+YgKtnZqG9QGLbMOAAAAAAAAAAAAAAAAAAAACARIDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgCIAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADI4AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID5AEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMngAAAAAAADgwt5dkQBHFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgToA6iVqABxwFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmBngdF/cBAADATD0e4O7LHwAAAAAAAAAAAAAAAAAAAAAAAACAMIA/8nscAAAAAAAAAAAAAAAAAAAAAAAAAIAKAI+lAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHUB6vJSFAAAAAAAAMgF2LsiAWoDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABRACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGTwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwHwAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAYPAAAAAAAArAvQBv3auMo6AAAAAAAAAAAAAAAAAAAAIBDgC7tK/ATcy9KHAAAAAElFTkSuQmCC'

function AddInstitucionComponent() {
    const instituciones = useSelector(state => state.instituciones);
    const classes = useStyles();

    const modelInstitucion = {
        Activo: true,
        Direccion: '',
        Email: '',
        IdInstitucion: 0,
        Nombre: '',
        NombreContacto: '',
        Telefono: '',
        ImageBase64: imgBase
    };

    const [institucion, setInstitucion] = useState(modelInstitucion);



    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    function handleChange(e) {
        const { name, value } = e.target;
        setInstitucion(institucion => ({ ...institucion, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (validateData()) {

            setSubmitted(true);
            if (institucion.Nombre &&
                institucion.NombreContacto &&
                institucion.Email &&
                institucion.Telefono &&
                institucion.Direccion) {
                console.log(institucion);
                dispatch(institucionActions.register(institucion));
                clearData();
            }
        }
    }

    function clearData() {
        setInstitucion(modelInstitucion);
    }

    function handleCapture({ target }) {
        var file = target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setInstitucion(institucion => ({ ...institucion, 'ImageBase64': reader.result }));
        };
    }

    function removeImage() {
        setInstitucion(institucion => ({ ...institucion, 'ImageBase64': imgBase }));
    }

    function validateData() {
        if (institucion.ImageBase64 == imgBase) {
            return false;
        } else {
            return true;
        }
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">Datos de institución</Typography>
                    <form className={classes.form} onSubmit={handleSubmit} validate="true" >
                        <div className="row">
                            <div className="col-md-8 col-xs-12 col-lg-8">
                                <div className="row">
                                    <div className="col-md-4 col-xs-12 col-lg-4">
                                        <TextField
                                            onChange={handleChange}
                                            fullWidth
                                            value={institucion.Nombre}
                                            margin="normal"
                                            required
                                            id="Nombre"
                                            label="Nombre"
                                            name="Nombre"
                                        />
                                    </div>
                                    <div className="col-md-8 col-xs-12 col-lg-8">
                                        <TextField
                                            onChange={handleChange}
                                            fullWidth
                                            value={institucion.NombreContacto}
                                            margin="normal"
                                            required
                                            id="NombreContacto"
                                            label="Nombre Contacto"
                                            name="NombreContacto"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 col-xs-12 col-lg-4">
                                        <TextField
                                            onChange={handleChange}
                                            fullWidth
                                            value={institucion.Telefono}
                                            type="number"
                                            margin="normal"
                                            required
                                            id="Telefono"
                                            label="Teléfono"
                                            name="Telefono"
                                        />
                                    </div>
                                    <div className="col-md-8 col-xs-12 col-lg-8">
                                        <TextField
                                            onChange={handleChange}
                                            fullWidth
                                            value={institucion.Email}
                                            type="email"
                                            margin="normal"
                                            required
                                            id="Email"
                                            label="Email"
                                            name="Email"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-xs-12 col-lg-12">
                                        <TextField
                                            onChange={handleChange}
                                            fullWidth
                                            value={institucion.Direccion}
                                            margin="normal"
                                            required
                                            id="Direccion"
                                            label="Dirección"
                                            name="Direccion"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-xs-12 col-lg-4">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Logo"
                                            height="165"
                                            image={institucion.ImageBase64}
                                            title="Logo"
                                            style={{ objectFit: "scale-down" }}
                                        />

                                    </CardActionArea>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            component="label"
                                            color="primary"
                                        >
                                            Cargar Logo
  <input
                                                type="file"
                                                style={{ display: "none" }}
                                                id="icon-button-photo"
                                                onChange={handleCapture}
                                            />
                                        </Button>
                                        <Button size="small" onClick={removeImage} color="primary">Quitar</Button>

                                    </CardActions>
                                </Card>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6 col-xs-12 col-lg-6">
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={clearData}
                                >
                                    Limpiar
                        </Button>
                            </div>
                            <div className="col-md-6 col-xs-12 col-lg-6">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Guardar
                        </Button>
                            </div>
                        </div>
                    </form>

                </div>
            </Grid>
        </Grid>
    );
}

export { AddInstitucionComponent };