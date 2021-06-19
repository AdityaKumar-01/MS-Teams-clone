import React, { useState, useRef, useEffect, useContext } from "react";

// NPM packages
import Avatar from "react-avatar";

// context
import { UserContext } from "../../Context/userContext";
import { MeetContext } from "../../Context/meetContext";

// External CSS
import "./Attendees.styles.css";
const Attendees = ({ participant }) => {
  const { name } = useContext(UserContext);
  const { vidState, audState } = useContext(MeetContext);
  
const [videoTracks, setVideoTracks] = useState([]);
const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();
  
  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
   
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribe = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnSubscribe = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };
    participant.on("trackSubscribed", trackSubscribe);
    participant.on("trackUnsubscribed", trackUnSubscribe);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant, vidState, audState]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

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
    <div>
      {participant.identity === name ? (
        <div className="meet-frame">
          <span className="frame-title">{participant.identity}</span>
          {vidState ? (
            <video ref={videoRef} autoPlay />
          ) : (
            <Avatar name={name} size="300" className="card-avatar" />
          )}
          {audState ? (
            <audio ref={audioRef} autoPlay />
          ) : (
            <audio ref={audioRef} muted />
          )}
        </div>
      ) : (
        <div className="meet-frame">
          <span className="frame-title">{participant.identity}</span>

          <video ref={videoRef} autoPlay />
          <audio ref={audioRef} autoPlay />
        </div>
      )}
    </div>
  );
};

export default Attendees;
