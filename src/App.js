import React from 'react';
import { Tournament } from "./tennis/Tournament";
import { Placeholder } from "./tennis/Placeholder";
import './App.scss';

function App() {
    return (
        <div className="App">
            <main>
                <Tournament ref={Tournament => { window.Tournament = Tournament; }} />
                <Placeholder width={60} height={60} />
                <button onClick={() => {
                    window.Tournament.updateState(document.getElementById("json").value);
                }}>Обновить стейт</button>
                <textarea id="json" readOnly={true} value={JSON.stringify({
                    date: "2 января — 8 января 2020",
                    title: "Кубок президента УлГУ 2020",
                    place: "ФОК УлГУ, Ульяновск",
                    status: "Завершен",
                    shortForm: false
                })} />
            </main>
        </div>
    );
}

export default App;