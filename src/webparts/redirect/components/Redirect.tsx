import * as React from 'react';
import styles from './Redirect.module.scss';
import { IRedirectProps, IRedirectState, IRedirectionConfigData } from './IRedirectConfig';
import { escape, isEqual } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import RedirectorDefault from './defaultConfig/defaultConfig';
import Redirector from './redirectorConfig/redirectorConfig';

export default class Redirect extends React.Component<IRedirectProps, IRedirectState> {


  private redirectionParams: string;
  private redirectParameter: string = "redirectparam";
  private interval: any;
  /**
   * Default constructor
   */
  constructor(props: IRedirectProps) {
    super(props);
    this.state = {
      selectedRedirection: null,
      duration: props.duration,
      redirectionConfigData : props.redirectionConfig
    };

    const redirectParamObj = new URLSearchParams(window.location.search);
    this.redirectionParams = redirectParamObj.get(this.redirectParameter);
  }

  public componentDidMount() {
    if (this.props.redirectionConfig && this.props.redirectionConfig.length > 0) {
      this.setRedirectionObject();
    }
  }

  public componentWillReceiveProps(nextProps: IRedirectProps) {
    if (this.props.duration != nextProps.duration) {
      this.setState({
        duration: nextProps.duration
      }, () => {
        if(this.interval){
          clearInterval(this.interval);
        }
        this.tick();
      });
    }

    if(!isEqual(this.props.redirectionConfig, nextProps.redirectionConfig)){
      this.setState({
        redirectionConfigData : nextProps.redirectionConfig
      });
    }
  }

  protected tick = () => {
    if (this.state.selectedRedirection) {
      this.interval = setInterval(this.tickCounter, 1000);
    }
  }

  protected tickCounter = () => {
    this.setState((prevState: IRedirectState) => {
      return {
        duration: prevState.duration - 1
      };
    });

    console.log(`Timer Remaining: ${this.state.duration}`);

    if (this.state.duration === 0) {
      clearInterval(this.interval);
      window.location.href = this.state.selectedRedirection.redirectionURL;
    }

  }

  protected setRedirectionObject = () => {
    const tempRedirectionData: IRedirectionConfigData[] = [...this.props.redirectionConfig];
    let selectedConfig: IRedirectionConfigData = null;

    if (this.redirectionParams) {
      let tempData: IRedirectionConfigData[] = tempRedirectionData.filter(el => el.parameter.toString().toLowerCase() === this.redirectionParams.toString().toLowerCase());

      if (tempData && tempData.length > 0) {
        selectedConfig = tempData[0];
      }
    }

    this.setState({
      selectedRedirection: selectedConfig
    }, this.tick);
  }


  public render(): React.ReactElement<IRedirectProps> {
   
    const showPlaceholder = !(this.state.redirectionConfigData && this.state.redirectionConfigData.length > 0) ? 
      <Placeholder
        iconName='Edit'
        iconText='Configure your web part'
        description='Please configure the redirections.'
        buttonLabel='Configure'
        onConfigure={this.props._onConfigure}

      /> : null;

    const showDefaultConfiguration = (showPlaceholder == null) && !this.state.selectedRedirection ? <RedirectorDefault /> : null;

    const showRedirector = !showDefaultConfiguration && (this.state.redirectionConfigData && this.state.redirectionConfigData.length > 0) ? 
      <Redirector 
        pageTitle={this.state.selectedRedirection.pageTitle}
        pageDesc={this.state.selectedRedirection.pageDesc}
        pageRedirectURL={this.state.selectedRedirection.redirectionURL}
        timeRemaining={this.state.duration}
      /> 
      : 
      null;

    return (
      <div className={styles.redirect}>
        <div className={styles.container}>
          {showPlaceholder}
          {showDefaultConfiguration}
          {showRedirector}
        </div>
      </div>
    );
  }
}
