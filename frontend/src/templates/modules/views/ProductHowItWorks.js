import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';


const urlCreator = window.URL || window.webkitURL;
const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 350,
    width:300,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

class ProductHowItWorks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      hasImage: false,
      imageUrl: '',
      fileUrl: '',
      file: null,
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(value + " AND " + name);
    var hasImage = this.state.hasImage;
    hasImage = value != '';
    this.setState({
      hasImage,
      fileUrl: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
  }

  handlePredictClick = (event) => {
    const file = this.state.file;

    const data = new FormData();
    data.append('file', file);

    this.setState({isLoading: true});
    fetch('http://localhost:5000/prediction',
        {
          method: 'POST',
          mode: 'no-cors',
          body: data
        })

        // .then(response => response.json())
        .then(response => {
          response.blob().then(blobResponse => {
            this.setState({
              // result: response.result,
              image: blobResponse,
              isLoading: false
            });
          })
        });
  }
  handleCancelClick = (event) => {
    this.setState({file:null,result: "", hasImage: false, formData: {city_img: ''}, image: null});
  }

  render() {
    const {classes} = this.props;
    const hasImage = this.state.hasImage;
    const isLoading = this.state.isLoading;
    const imageUrl = this.state.imageUrl;
    const result = this.state.result;
    const fileUrl = this.state.fileUrl;

    return (
        <section className={classes.root}>
          <Container className={classes.container}>
            <img
                src="/static/themes/onepirate/productCurvyLines.png"
                className={classes.curvyLines}
                alt="curvy lines"
            />
            <Typography
                variant="h4"
                marked="center"
                className={classes.title}
                component="h2"
            >
              How it works
            </Typography>
            <div>
              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                    {
                      !this.state.file ?
                      <>
                      <div className={classes.number}>1.</div>
                      <input id="myInput"
                      type="file"
                      ref={(ref) => this.upload = ref}
                      style={{display: 'none'}}
                      onChange={this.handleChange}
                      />
                        <Typography variant="h5" align="center">
                          Upload the XRay to get start the process
                        </Typography>
                      <Button
                      color="primary"
                      size="large"
                      variant="contained"
                      className={classes.button}
                      component="a"
                      onClick={() => {
                      this.upload.click()
                    }}
                      >
                      Chose Image
                      </Button>


                      </>
                          :<img
                              src={fileUrl}
                              alt="xray"
                              className={classes.image}
                          />
                    }
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                    <div className={classes.number}>2.</div>

                    <Typography variant="h5" align="center">
                      Get the region to suspect if abnormal
                    </Typography>
                    <Button
                        color="primary"
                        size="large"
                        variant="contained"
                        className={classes.button}
                        component="a"
                        disabled={isLoading || this.state.image }
                        onClick={() => {
                          this.handlePredictClick()
                        }}
                    >

                      { isLoading ? 'Making prediction' : 'Predict' }
                    </Button>
                    <Button
                        color="primary"
                        size="large"
                        variant="contained"
                        className={classes.button}
                        style={{backgroundColor: 'rgb(255, 51, 102)'}}
                        component="a"
                        disabled={isLoading|| !this.state.image }
                        onClick={this.handleCancelClick}>
                      Reset
                    </Button>

                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                    {!this.state.isLoading && this.state.image ?
                        <img
                            src={urlCreator.createObjectURL(this.state.image)}
                            alt="xray"
                            className={classes.image}
                        />
                        :<>
                    <div className={classes.number}>3.</div>

                        <Typography variant="h5" align="center">
                          Analyze the result
                        </Typography>
                    </>
                    }
                  </div>
                </Grid>
              </Grid>
            </div>
            {/*<Button*/}
            {/*    color="secondary"*/}
            {/*    size="large"*/}
            {/*    variant="contained"*/}
            {/*    className={classes.button}*/}
            {/*    component="a"*/}
            {/*    href="/premium-themes/onepirate/sign-up/"*/}
            {/*>*/}
            {/*  Get started*/}
            {/*</Button>*/}
            {/* <div style={{marginTop:'32px'}}>

            {!this.state.isLoading && this.state.image?
            (
                    <>{
                      Math.random() < 0.3 ?
                          < Button style={{backgroundColor: 'white', margin: '8px', color: 'red'}}>
                            <SentimentVeryDissatisfiedIcon htmlColor='red' fontSize='large'/>
                            Abnormal
                          </Button> :

                          <Button style={{backgroundColor: 'white', margin: '8px', color: 'green'}}>
                            <SentimentVerySatisfiedIcon htmlColor='green' fontSize='large'/>
                            Normal
                          </Button>
                    }
                    </>

                ):
                <></>

            }
            </div> */}
          </Container>
        </section>
    );
  }
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
