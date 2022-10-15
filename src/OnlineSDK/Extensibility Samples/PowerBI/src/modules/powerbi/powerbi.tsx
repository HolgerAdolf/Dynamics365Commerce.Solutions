/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */
import * as React from 'react';
import { IPowerbiData } from './powerbi.data';
import { IPowerbiProps } from './powerbi.props.autogenerated';

export interface IPowerbiViewProps extends IPowerbiProps<IPowerbiData> {}

/**
 *
 * Powerbi component
 * @extends {React.PureComponent<IPowerbiProps<IPowerbiData>>}
 */
class Powerbi extends React.PureComponent<IPowerbiProps<IPowerbiData>> {
    constructor(props: IPowerbiProps<IPowerbiData>) {
        super(props);
    }
    public render(): JSX.Element | null {
        return this.props.renderView(this.props);
    }
}

export default Powerbi;
