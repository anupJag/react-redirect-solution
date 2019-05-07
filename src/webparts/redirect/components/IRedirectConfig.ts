export interface IRedirectProps {
  duration: number;
  redirectionConfig : IRedirectionConfigData[];
  _onConfigure:() => void;
}

export interface IRedirectState{
  selectedRedirection : IRedirectionConfigData;
  duration : number;
  redirectionConfigData : IRedirectionConfigData[];
}

export interface IRedirectionConfigData {
  parameter: string;
  pageTitle: string;
  pageDesc?: string;
  redirectionURL : string;
}