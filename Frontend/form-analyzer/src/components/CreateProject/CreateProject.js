import React, { Component } from 'react'
import CreateNewProject from './CreateNewProject/CreateNewProject'
import SelectFields from './SelectFields/SelectFields';

import UploadForms from './UploadForms/UploadForms';
import Visualizations from './Visualizations/Visualizations';
export default class CreateProject extends Component {
    state = {
        step: 0,
        name: '',
        file: null,
        fields: []
    }
    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }
    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }
    onFileChange = file => {
        this.setState({ file: file });
    }

    render() {
        const { step } = this.state;
        const { name, file } = this.state;
        const values = { name, file };
        switch (step) {
            case 0:
                return (
                    <CreateNewProject nextStep={this.nextStep} values={values} handleChange={this.handleChange} onFileChange={this.onFileChange} />
                )
            case 1:
                return (
                    <SelectFields nextStep={this.nextStep} values={values} prevStep={this.prevStep} />
                )
            case 2:
                return (
                    <UploadForms nextStep={this.nextStep} values={values} prevStep={this.prevStep} />
                )
            case 3:
                return (
                    <Visualizations values={values} />
                )

            default:
        }
    }
}
