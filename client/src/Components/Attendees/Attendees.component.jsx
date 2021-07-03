import React, { useState, useRef, useEffect, useContext } from "react";

// NPM packages
// import Avatar from "react-avatar";
import SettingsVoiceIcon from "@material-ui/icons/SettingsVoice";
// context
// import { UserContext } from "../../Context/userContext";
import { MeetContext } from "../../Context/meetContext";

// External CSS
import "./Attendees.styles.css";
const Attendees = ({ participant, dominantSpeaker }) => {
  // const { name } = useContext(UserContext); // bring user name
  const { vidState, audState, screenTrack, setScreenTrack } =
    useContext(MeetContext); // bring camera and mic state

  const [videoTracks, setVideoTracks] = useState([]); // holds all the video track published by attendees of the meet
  const [audioTracks, setAudioTracks] = useState([]); // holds all the audio track published by attendees of the meet

  const videoRef = useRef(); // ref to display hold video content
  const audioRef = useRef(); // ref to display hold audio content
  const screenRef = useRef(); // ref to display
  // filter tracks which are not null i.e. we are receiving tracks
  const trackPubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  // useEffect to handle any new attendee in meeting
  // this will render once we have a new attendee or the video or audio state change for any user
  useEffect(() => {
    // Update hook state with recieved tracks which is not null
    setVideoTracks(trackPubsToTracks(participant.videoTracks));
    setAudioTracks(trackPubsToTracks(participant.audioTracks));

    // a funcion to handle change in state of video or audio tracks and update with new state
    // when attendee subscribe i.e. when unmute video or audio
    const trackSub = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    // when attendee Unsubscribe i.e. when mute video or audio
    const trackUnSub = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    // trackSubscribed & trackUnsubscribed are inbuilt function provided twilio
    // to listen activity like subsribing or unsubscribing
    participant.on("trackSubscribed", trackSub);
    participant.on("trackUnsubscribed", trackUnSub);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant, vidState, audState]);

  // any updates in local attendee the use effect will render
  //  and update its status i.e. video on or off
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
    const screenTrack = videoTracks[0];

    if (screenTrack) {
      console.log("started");
      screenTrack.attach(screenRef.current);

      return () => {
        screenTrack.detach();
      };
    }
  }, [videoTracks, screenTrack]);
  useEffect(() => {
    const videoTrack = videoTracks[1];
    console.log("video started");
    if (videoTrack) {
      console.log("here", videoTrack);
      setScreenTrack(true);
      videoTrack.attach(screenRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks, screenTrack]);

  // any updates in local attendee the use effect will render
  //  and update its status i.e. video on or off
  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="attendee-wrapper">
      {screenTrack ? (
        <span className="screen-frame meet-frame">
          <video ref={screenRef} autoPlay />
        </span>
      ) : null}
      <div className="meet-frame">
        <span className="frame-title">
          {dominantSpeaker ? (
            <SettingsVoiceIcon style={{ color: "#F54748" }} />
          ) : null}
          {participant.identity}
        </span>
        <video ref={videoRef} autoPlay />
        <audio ref={audioRef} autoPlay />
      </div>
    </div>
  );
};

export default Attendees;
