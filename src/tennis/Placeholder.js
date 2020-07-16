import React from "react";

export class Placeholder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: props.width ? props.width : 60,
            height: props.height ? props.height : 60,
            bg: props.bg ? props.bg : "#DEDEDE",
            alt: props.alt ? props.alt : "Плейсхолдер",
            title: props.title ? props.title : null
        };
    }

    render() {
        let src = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${this.state.width}' height='${this.state.height}' viewBox='0 0 ${this.state.width} ${this.state.height}'><rect stroke='${this.state.bg}' stroke-width='2' x='0' y='0' width='${this.state.width}' height='${this.state.height}' fill='${this.state.bg}' /></svg>`);
        return (
            <img width={this.state.width} height={this.state.height} src={`data:image/svg+xml;utf-8,${src}`} alt={this.state.alt} title={this.state.title} />
        );
    }

}