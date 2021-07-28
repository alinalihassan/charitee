import appStoreButton from '../../assets/img/buttons/app-store-button.svg'
import googlePlayButton from '../../assets/img/buttons/google-play-button.svg'

const imageLinks: any = {
  ios: appStoreButton,
  android: googlePlayButton,
};

type MobileStoreButtonProps = {
  store: 'ios' | 'android',
  url: string,
}


const MobileStoreButton = (props: MobileStoreButtonProps) => (
  <div className="mobile-store-button" style={{ height: 75, width: 225, marginRight: 20, display: 'inline-block' }}>
    <a
      href={props.url}
      aria-label={props.store === 'ios' ? "App Store Link" : "Play Store Link"}
      style={{
        background: `url(${imageLinks[props.store]}) no-repeat`,
        backgroundSize: 'contain',
        display: 'inline-block',
        overflow: 'hidden',
        textDecoration: 'none',
        height: '100%',
        width: '100%',
        padding: '5px',
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      &nbsp;
    </a>
  </div>
)

export default MobileStoreButton;