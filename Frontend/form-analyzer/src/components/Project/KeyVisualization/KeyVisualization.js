import React, { useEffect, useState } from 'react'
import axios from '../../../helper/axios';
import CheckBoxKeyVisualization from './keys/CheckBoxKeyVisualization';
import DateKeyVisualization from './keys/DateKeyVisualization';
import NumberKeyVisualization from './keys/NumberKeyVisualization';
import SentimentKeyVisualization from './keys/SentimentKeyVisualization';
import TextKeyVisualization from './keys/TextKeyVisualization';
export default function KeyVisualization({ projectId, currentKey }) {

    const [keyData, setKeyData] = useState(null);


    useEffect(async () => {
        if (currentKey.length == 0) {
            return;
        }
        try {
            const { data } = await axios.post('/visualization-data/', {
                project_id: projectId,
                key: currentKey,
            });
            // const data = {
            //     valueType: "Sentiment", values: [
            //         { "sentiment": [0.5, 0.23], "data": ["This is good", "This is the best"] },
            //         { "sentiment": [0.5, 0.2], "data": ["This is bad", "This is worst"] },
            //     ]
            // };

            setKeyData(prevState => ({
                ...prevState,
                valueType: data.valueType,
                values: data.values,
            }));
        } catch (e) {
            console.error(e);
        }
    }, [currentKey]);

    const showVisualization = () => {
        if (keyData.valueType === "Checkbox") {
            return <CheckBoxKeyVisualization values={keyData.values} currentKey={currentKey} />
        } else if (keyData.valueType === "Date") {
            return <DateKeyVisualization values={keyData.values} />
        } else if (keyData.valueType === "Text") {
            return <TextKeyVisualization values={keyData.values} />
        } else if (keyData.valueType === "Number") {
            return <NumberKeyVisualization values={keyData.values} />
        } else if (keyData.valueType === "Sentiment") {
            return <SentimentKeyVisualization values={keyData.values} />
        }
    }
    return (
        keyData === null ?
            <div>
                Loading
            </div>
            :
            <div class='col-md-10 mt-5'>
                {showVisualization()}
            </div>
    )
}
