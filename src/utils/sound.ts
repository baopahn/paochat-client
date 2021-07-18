import SendingSound from "../asserts/sound/sending.mp3";
import SendSuccessSound from "../asserts/sound/send-sucess.mp3";
import NewMessageSound from "../asserts/sound/new-message.mp3";

type SoundKey = "sending" | "sendsuccess" | "newmessage";

type AudioType = {
  sending: HTMLAudioElement | null;
  sendsuccess: HTMLAudioElement | null;
  newmessage: HTMLAudioElement | null;
};

class Sound {
  private _isMute: boolean = false;
  private CACHE_KEY = "MuTe";
  private _audio: AudioType = {
    sending: null,
    sendsuccess: null,
    newmessage: null,
  };

  constructor() {
    const mute = localStorage.getItem(this.CACHE_KEY);
    this._isMute = mute ? JSON.parse(mute) : false;

    this._audio = {
      sending: new Audio(SendingSound),
      sendsuccess: new Audio(SendSuccessSound),
      newmessage: new Audio(NewMessageSound),
    };
  }

  public setMute(): void {
    this._isMute = !this._isMute;
    localStorage.setItem(this.CACHE_KEY, this._isMute.toString());
  }

  public playSound(soundKey: SoundKey): void {
    if (this._isMute) return;
    this._audio[soundKey]?.play();
  }
}

const soundController = new Sound();

export default soundController;
