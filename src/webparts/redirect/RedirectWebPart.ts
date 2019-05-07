import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';

import * as strings from 'RedirectWebPartStrings';
import Redirect from './components/Redirect';
import { IRedirectProps, IRedirectionConfigData } from './components/IRedirectConfig';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

export interface IRedirectWebPartProps {
  duration: number;
  redirectionCollectionData: IRedirectionConfigData[];
}

export default class RedirectWebPart extends BaseClientSideWebPart<IRedirectWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRedirectProps > = React.createElement(
      Redirect,
      {
        duration : this.properties.duration,
        redirectionConfig : this.properties.redirectionCollectionData,
        _onConfigure: this._onConfigure.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _onConfigure() {
    // Context of the web part
    this.context.propertyPane.open();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneSlider('duration', {
                  label : 'Set the redirection timer (in secs)',
                  max: 20,
                  min: 3,
                  showValue: true,
                  step: 1,
                  disabled : false
                }),
                PropertyFieldCollectionData("redirectionCollectionData", {
                  key: "redirectionCollectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  value: this.properties.redirectionCollectionData,
                  fields: [
                    {
                      id: "parameter",
                      title: "Redirect Parameter",
                      type: CustomCollectionFieldType.string,
                      required: true,
                      placeholder : "Add a redirection Parameter"
                    },
                    {
                      id: "pageTitle",
                      title: "Redirection Title",
                      type: CustomCollectionFieldType.string,
                      required : true,
                      placeholder: 'Give your redirection page a title'
                    },
                    {
                      id: "pageDesc",
                      title: "Redirection Description",
                      type: CustomCollectionFieldType.string,
                      required: false,
                      placeholder: 'Provide description for your redirection'
                    },
                    {
                      id: "redirectionURL",
                      title : "Redirection URL",
                      type : CustomCollectionFieldType.url,
                      required : true,
                      placeholder : "Add a redirection URL for your parameter"
                    }                    
                  ],
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
