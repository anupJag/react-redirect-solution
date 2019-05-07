import * as React from 'react';
import styles from './redirectorConfig.module.scss';

export interface IRedirectorConfigProps {
    timeRemaining: number;
    pageTitle: string;
    pageDesc?: string;
    pageRedirectURL: string;
}

const redirectorConfig = (props: IRedirectorConfigProps) => {
    return (
        <div className={styles.redirectorConfig}>
            <div className={styles.container}>
                <div className={styles.title}>{props.pageTitle}</div>
                {
                    props.pageDesc ? <div className={styles.desc}>{props.pageDesc}</div> : null
                }
                <div className={styles.desc}>Redirecting in {props.timeRemaining} seconds...<br /><span>If the page does not redirect automatically <a href={props.pageRedirectURL} className={styles.urlStyle}>Click Here</a></span>
                </div>
            </div>
        </div>
    );
};

export default redirectorConfig;