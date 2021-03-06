/**
 * Created by jzheng on 7/14/17.
 */
import React from 'react';
import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import ResponseUtil from "../util/ResponseUtil";

class ScreeningResultDisplay extends React.Component {
    constructor(props) {
        super(props);
        //green backgound
        this.passedClassName = 'enabled_screener_form_container';
        //red background
        this.failedClassName = 'unsatisfied_screener_form_container';
    }

    render() {
        return (this.props.shouldDisplay === true) ?
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Ticker</th>
                    <th>ALL SCREENERS</th>
                    {this.props.shouldDisplayMacd ?
                        <th>MACD</th> : null}
                    {this.props.shouldDisplayStochastic ?
                        <th>STOCHASTIC</th> : null}
                </tr>
                </thead>
                <tbody>
                {this.displayTableRows(this.props.passedScreeningResults)}
                {this.displayTableRows(this.props.failedScreeningResults)}
                </tbody>
            </Table> : null;
    }

    displayTableRows(resultsMap) {
        var htmlEleArr = [];
        Object.keys(resultsMap).map((tickerKey, index) => {

            var displayableMap = ResponseUtil.convertToComprehensiveFormat(tickerKey, resultsMap[tickerKey]);
            console.log("display result is ", displayableMap);
            var trClassName = displayableMap['ALL_SCREENER_PASS'] ? this.passedClassName : this.failedClassName;
            htmlEleArr.push(
                <tr key={index} className={trClassName}>
                    <td>{index}</td>
                    <td>{displayableMap['TICKER']}</td>
                    <td>{displayableMap['ALL_SCREENER_PASS'] ? 'P' : 'F'}</td>

                    {this.props.shouldDisplayMacd ?
                        <td>{displayableMap['MACD_PASS'] ? 'P' : 'F'}</td> : null }
                    {this.props.shouldDisplayStochastic ?
                        <td>{displayableMap['STOCHASTIC_PASS'] ? 'P' : 'F'}</td> : null }
                </tr>
            );
        });

        return htmlEleArr;
    }
}

ScreeningResultDisplay.propTypes = {
    shouldDisplay: PropTypes.bool.isRequired
};

export default ScreeningResultDisplay;