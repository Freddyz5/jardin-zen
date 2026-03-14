import { Audio, AVPlaybackStatus } from 'expo-av';

export interface AudioPlayerState {
  isPlaying: boolean;
  isLoaded: boolean;
  position: number;
  duration: number;
}

class AudioPlayer {
  private sound: Audio.Sound | null = null;
  private onStatusUpdate: ((state: AudioPlayerState) => void) | null = null;

  async load(uri: string, onStatusUpdate?: (state: AudioPlayerState) => void) {
    try {
      await this.unload();

      this.onStatusUpdate = onStatusUpdate || null;

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        this.handleStatusUpdate
      );

      this.sound = sound;
    } catch (error) {
      console.error('Error loading audio:', error);
      throw error;
    }
  }

  private handleStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      this.onStatusUpdate?.({
        isPlaying: false,
        isLoaded: false,
        position: 0,
        duration: 0,
      });
      return;
    }

    this.onStatusUpdate?.({
      isPlaying: status.isPlaying,
      isLoaded: true,
      position: status.positionMillis,
      duration: status.durationMillis || 0,
    });
  };

  async play() {
    if (this.sound) {
      await this.sound.playAsync();
    }
  }

  async pause() {
    if (this.sound) {
      await this.sound.pauseAsync();
    }
  }

  async stop() {
    if (this.sound) {
      await this.sound.stopAsync();
      await this.sound.setPositionAsync(0);
    }
  }

  async seek(position: number) {
    if (this.sound) {
      await this.sound.setPositionAsync(position);
    }
  }

  async setVolume(volume: number) {
    if (this.sound) {
      await this.sound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
    }
  }

  async unload() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }

  async isPlaying(): Promise<boolean> {
    if (this.sound) {
      const status = await this.sound.getStatusAsync();
      return status.isLoaded && status.isPlaying;
    }
    return false;
  }
}

export const audioPlayer = new AudioPlayer();
