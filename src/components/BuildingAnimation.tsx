import {
  Player,
  PlayerEvent,
  PlayerState,
} from '@lottiefiles/react-lottie-player';
import { memo, useEffect, useRef } from 'react';

export const BuildingAnimationComponent = ({
  play,
  segments,
}: {
  play: boolean;
  segments: [number, number][];
}) => {
  const playerRef = useRef<Player>(null);
  console.log('***', { play });
  useEffect(() => {
    console.log('*** useEffect 0', playerRef.current?.state);
    if (playerRef.current && playerRef.current?.state?.instance?.isLoaded) {
      console.log('*** here 0');
      if (
        play &&
        playerRef.current?.state.playerState !== PlayerState.Playing
      ) {
        console.log('*** here 1');
        playerRef.current.play();
      } else if (
        !play &&
        playerRef.current?.state.playerState === PlayerState.Playing
      ) {
        console.log('*** here 2');
        playerRef.current.pause();
      }
    }
  }, [play]);

  const onPlayerEvent = (e: PlayerEvent) => {
    console.log('*** onPlayerEvent 0', e);
    if (playerRef.current) {
      console.log('*** onPlayerEvent 1');
      if (
        e === PlayerEvent.Load &&
        play &&
        playerRef.current.state.playerState !== PlayerState.Playing
      ) {
        console.log('*** ready', playerRef.current);
        playerRef.current.play();
      }
      if (e === PlayerEvent.Frame) {
        // playerRef.current.state.seeker frames
        console.log(
          '*** frame',
          playerRef.current.state.instance?.currentFrame,
          playerRef.current.state.instance?.totalFrames
        );
      }
    }
  };
  return (
    <Player
      ref={playerRef}
      //   autoplay
      //   loop
      src="lotties/building-a-community.json"
      //   frame={() => console.log('frame')}
      onEvent={onPlayerEvent}
    />
  );
};

const BuildingAnimation = memo(BuildingAnimationComponent);

export default BuildingAnimation;

// TODO: now mui styles console warning
