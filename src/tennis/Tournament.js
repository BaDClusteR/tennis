import React from "react";
import "./Tournament.scss";
import {Placeholder} from "./Placeholder";

export class Tournament extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "Дата турнира",
            title: "Название турнира",
            place: "Место проведения",
            status: "Статус",
            rounds: {
                m: 0,
                w: 0,
                mm: 0,
                ww: 0,
                mw: 0
            },
            shortForm: true
        }
    }

    updateState(json) {
        try {
            json = JSON.parse(json)
        } catch (e) {
            return false;
        }
        if (typeof json !== "object")
            return false;
        let newState = this.state;
        [ "date", "title", "place", "status" ].forEach(index => {
            if (json.hasOwnProperty(index))
                newState[index] = json[index].toString();
        });
        if (json.hasOwnProperty("shortForm"))
            newState.shortForm = !!json.shortForm;
        if (json.rounds && typeof json.rounds === "object") {
            [ "m", "w", "mm", "ww", "mw" ].forEach(index => {
                if (json.rounds[index])
                    newState.rounds[index] = Math.max(0, parseInt(json.rounds[index]));
            });
        }
        this.setState(newState, () => { console.log("New state: ", this.state) });
    }

    labelFor(index) {
        let labels = {
            m: "Мужчины",
            w: "Женщины",
            mw: "Мужчины и женщины",
            mm: "Мужчины и мужчины",
            ww: "Женщины и женщины"
        }
        return labels.hasOwnProperty(index) ? labels[index] : "";
    }

    renderPlayer(index, value) {
        return (
            <div className={`tournament__player tournament__player--${index}`} key={index}>
                <Placeholder width="30" height="30" alt={this.labelFor(index)} title={this.labelFor(index)} />
                <span className="tournament__player-rounds">{value}</span>
            </div>
        )
    }

    renderPlayers() {
        console.log("Before");
        if (this.state.shortForm)
            return null;
        console.log("After");
        let players = [];
        Object.keys(this.state.rounds).forEach(key => {
            players.push(this.renderPlayer(key, this.state.rounds[key]));
        });
        return (
            <div className="tournament__players">
                {players}
            </div>
        )
    }

    render() {
        return (
            <div className={`tournament ${this.state.shortForm ? "" : "tournament--full-form"}`} role="listitem">
                <div class="tournament__info">
                    <div className="tournament__date">{this.state.date}</div>
                    <div className="tournament__title">{this.state.title}</div>
                    <div className="tournament__place">{this.state.place}</div>
                    <div className="tournament__status">
                        <span>Статус</span>
                        <span className="tournament__status-label">{this.state.status}</span>
                    </div>
                </div>
                {this.renderPlayers()}
            </div>
        )
    }
}