const ReactDOM  = require('react-dom/client');
const root = ReactDOM.createRoot(
    document.getElementById('root')
);

function tick() {
    const element = (
        <div>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    root.render(element);
}

setInterval(tick, 1000);