const options = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day',
                displayFormats: {
                    hour: 'MMM dd hh:mm',
                    day: 'MMM dd',
                    month: 'MM yyyy',
                },
            },
            ticks: {
                autoSkip: true,
                maxTicksLimit: 8,
            }
        },
    },
    plugins: {
        legend: {
            // disable label above chart
            display: false
        }
    },
    elements: {
        line: {
            // smooth curved lines
            tension : 0.5
        },
    },
};

const tempData = {
    datasets: [{
        data: [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
        ],
        fill: true,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
    }],
};

const humData = {
    datasets: [{
        data: [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
        ],
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
    }],
}

const tempConfig = {
    type: 'line',
    data: tempData,
    options: options,
};

const humConfig = {
    type: 'line',
    data: humData,
    options: options,
};

const tempChart = new Chart(document.getElementById('tempChart'), tempConfig);
const humChart = new Chart(document.getElementById('humChart'), humConfig);

function generateUrl(componentName, startDate, endDate) {
    let url;
    if (componentName === 'temperature') {
        url = `http://localhost:3001/temperature`;
    } else {
        url = `http://localhost:3001/humidity`;
    }
    url += `?startDate=${startDate}&endDate=${endDate}`;
    return url;
}

function differenceInDays(leftDate, rightDate) {
    const date1 = new Date(leftDate);
    const date2 = new Date(rightDate);
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function adjustTimeUnit(labels) {
    const diff = differenceInDays(labels[0], labels[labels.length - 1]);
    options.scales.x.time.unit = diff <= 2 ? 'hour' : 'day';
}

function generateData(results) {
    /** @namespace result.create_date **/
    const labels = results.map(result => result.create_date);
    const values = results.map(result => result.value);
    adjustTimeUnit(labels);

    let i = -1;
    return labels.map((label) => {
        const timeStrings = label.split('T');
        return {x:(timeStrings[0] + ' ' + timeStrings[1].slice(0, 8)), y: values[++i]};
    });
}

function drawChart(url, config, chart) {
    fetch(url)
        // 1. check response status and convert it to json format
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then((json) => {
            /** @namespace json.results **/
            config.data.datasets[0].data = generateData(json.results);
            // Don't draw chat outside here, cz you can't guarantee draw chat after
            // getting data, you have to wait re-render, which behaviors weird
            chart.update(config);
        })
        .catch((error) => console.log(`Could not fetch verse: ${error}`));
}

function onSubmit(event) {
    let url;
    if (event.submitter.id === 'tempButton') {
        url = generateUrl('temperature',
            document.getElementById('tempStartDate').value,
            document.getElementById('tempEndDate').value,
        );
        drawChart(url, tempConfig, tempChart);
    } else {
        url = generateUrl('humidity',
            document.getElementById('humStartDate').value,
            document.getElementById('humEndDate').value,
        );
        drawChart(url, humConfig, humChart);
    }
    event.preventDefault(); // prevent refresh
}

const tempForm = document.getElementById('tempForm');
const humForm = document.getElementById('humForm');
tempForm.addEventListener('submit', onSubmit);
humForm.addEventListener('submit', onSubmit);

