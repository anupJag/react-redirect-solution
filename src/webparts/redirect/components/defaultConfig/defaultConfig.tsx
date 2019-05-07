import * as React from 'react';
import styles from './defaultConfig.module.scss';

const defaultConfig = (props) => {
    return (
        <div className={styles.defaultConfig}>
            <div className={styles.container}>
                <div className={styles.title}>Redirection Value/Parameter Not Found</div>
                <div className={styles.desc}>Check if you have used the correct redirector parameter. <br /> Make sure you use 'redirectparam' as the key in your query parameter.</div>
            </div>
        </div>
    );
};

export default defaultConfig;