import React, { useState, useRef, useEffect, useContext } from "react";

// NPM packages
import Avatar from "react-avatar";

// context
import { UserContext } from "../../Context/userContext";

// External CSS
import "./Attendees.styles.css";
const Attendees = ({ participant }) => {
  const { vidOn,audOn,name } = useContext(UserContext);
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
  }, [participant]);

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
    <div className="meet-frame">
      {participant.identity === name ? (
        <div>
          <span className="frame-title">{participant.identity}</span>
          {vidOn ? (
            <video ref={videoRef} autoPlay />
          ) : (
            <Avatar name={name} size="80" className="card-avatar" />
          )}
          {audOn ? (
            <audio ref={audioRef} autoPlay />
          ) : (
            <audio ref={audioRef} muted />
          )}
        </div>
      ) : (
        <div>
          <span className="frame-title">{participant.identity}</span>
          
            <video ref={videoRef} autoPlay />
            <audio ref={audioRef} autoPlay />
          
        </div>
      )}
    </div>
  );
};

export default Attendees;
