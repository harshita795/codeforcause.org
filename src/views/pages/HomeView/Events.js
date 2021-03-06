import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import EventCard from '../../../components/Event/EventCard';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.LIGHT,
    padding: '30px 0',
    paddingLeft: 70,
    paddingRight: 70,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 15,
      paddingRight: 15
    }
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  extraMargin: {
    marginTop: theme.spacing(6)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: '10px',
    color: '#000',
    '&:hover': {
      color: '#B20000',
      boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.12)'
    }
  },
  cardMedia: {
    paddingTop: '55.75%', // 16:9
    borderBottom: '1px solid #eee'
  },
  cardContent: {
    flexGrow: 1
  },
  gridCls: {
    padding: '32px !important',
    textDecoration: 'none',
    [theme.breakpoints.down('md')]: {
      padding: '15px !important'
    }
  },
  extraPaddingLink: {
    paddingLeft: '32px !important'
  },
  icon: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '20px'
    },
    '&:hover': {
      backgroundColor: '#000',
      opacity: '0.8'
    }
  },
  titleDesc: {
    fontWeight: '500',
    marginTop: '5px',
    lineHeight: '1.3'
  },
  btn: {
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  box2: {
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  eventdate: {
    position: 'absolute',
    top: 18,
    zIndex: 1,
    borderRadius: '0px 5px 5px 0px',
    color: 'white',
    backgroundColor: '#000000'
  }
}));

function Events({ className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [events, setEvents] = useState(null);

  const getEvents = useCallback(() => {
    axios
      .get(
        'https://us-central1-codeforcauseorg.cloudfunctions.net/widgets/events'
      )
      .then(response => {
        if (isMountedRef.current) {
          setEvents(response.data);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  if (!events) {
    return null;
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography variant="h1" align="center" color="textPrimary">
          Our Online Events
        </Typography>
        <Grid container spacing={4} className={classes.extraMargin}>
          {events.slice(Math.max(events.length - 3, 0)).map((event, index) => (
            <EventCard event={event} index={index} />
          ))}
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.box2}>
              <Box
                display="flex"
                justifyContent="center"
                className={classes.btn}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    component="a"
                    href="https://www.youtube.com/channel/UCfv8cds8AfIM3UZtAWOz6Gg?sub_confirmation=1"
                    target="_blank"
                    variant="contained"
                    size="small"
                    className={classes.icon}
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Box>
              <Typography className={classes.secondaryText}>
                Our Youtube Channel for Upcoming Webinars
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Events.propTypes = {
  className: PropTypes.string
};

export default Events;
