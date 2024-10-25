// Initialize statistics for both teams
const stats = {
    team1: {
        goals: 0,
        shots: 0,
        passes: 0,
        shotsOnGoal: 0,
        outOfGoal: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
        offsides: 0
    },
    team2: {
        goals: 0,
        shots: 0,
        passes: 0,
        shotsOnGoal: 0,
        outOfGoal: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
        offsides: 0
    },
};

// Update statistics and refresh analytics
function updateStat(team, stat, change) {
    // Update the stats object
    stats[team][stat] += change;
    // Ensure counts don't go below zero
    if (stats[team][stat] < 0) stats[team][stat] = 0;

    // Update the displayed count
    document.getElementById(`${team}-${stat}-count`).textContent = stats[team][stat];

    // Update analytics
    updateAnalytics();
}

// Update team names based on input fields
function updateTeamNames() {
    const team1Name = document.getElementById('team1-name').value || 'Домашен тим';
    const team2Name = document.getElementById('team2-name').value || 'Гостински тим';

    document.getElementById('team1-title').textContent = team1Name;
    document.getElementById('team2-title').textContent = team2Name;
}

// Add input event listeners to team name inputs
document.getElementById('team1-name').addEventListener('input', updateTeamNames);
document.getElementById('team2-name').addEventListener('input', updateTeamNames);

// Update analytics section
function updateAnalytics() {
    // For each stat type, calculate totals and update analytics
    const statsTypes = ['goals', 'shots', 'passes', 'shotsOnGoal', 'outOfGoal', 'fouls', 'yellowCards', 'redCards', 'offsides'];
    
    statsTypes.forEach(stat => {
        const totalStat = stats.team1[stat] + stats.team2[stat];
        setLineWidth(document.getElementById(`${stat}-line`), stats.team1[stat], stats.team2[stat], totalStat, 'blue', 'yellow', `${stat}-percentage`);
    });
}

// Set the width of the lines based on statistics
function setLineWidth(line, team1Stat, team2Stat, totalStat, team1Color, team2Color, percentageId) {
    const team1PercentageElem = document.getElementById(`team1-${percentageId}`);
    const team2PercentageElem = document.getElementById(`team2-${percentageId}`);

    if (totalStat > 0) {
        const team1Percentage = (team1Stat / totalStat) * 100;
        const team2Percentage = (team2Stat / totalStat) * 100;

        // Set line width and background color based on percentages
        line.style.width = '100%'; // Full width of the line
        line.style.background = `linear-gradient(to right, ${team1Color} ${team1Percentage}%, ${team2Color} ${team1Percentage}%)`;

        // Update percentage text in the span elements
        team1PercentageElem.textContent = `${Math.round(team1Percentage)}%`;
        team2PercentageElem.textContent = `${Math.round(team2Percentage)}%`;
    } else {
        line.style.width = '0%';
        team1PercentageElem.textContent = `0%`;
        team2PercentageElem.textContent = `0%`;
    }
}

// Reset all statistics for both teams
function resetStats() {
    for (const team in stats) {
        for (const stat in stats[team]) {
            stats[team][stat] = 0;
            document.getElementById(`${team}-${stat}-count`).textContent = stats[team][stat];
        }
    }

    // Reset analytics
    updateAnalytics();
}

// Add event listeners to buttons
function addEventListeners() {
    document.getElementById('team1-goal-button').addEventListener('click', () => updateStat('team1', 'goals', 1));
    document.getElementById('team2-goal-button').addEventListener('click', () => updateStat('team2', 'goals', 1));

    document.getElementById('team1-shot-button').addEventListener('click', () => updateStat('team1', 'shots', 1));
    document.getElementById('team2-shot-button').addEventListener('click', () => updateStat('team2', 'shots', 1));

    document.getElementById('team1-passes-button').addEventListener('click', () => updateStat('team1', 'passes', 1));
    document.getElementById('team2-passes-button').addEventListener('click', () => updateStat('team2', 'passes', 1));

    document.getElementById('team1-shotsOnGoal-button').addEventListener('click', () => updateStat('team1', 'shotsOnGoal', 1));
    document.getElementById('team2-shotsOnGoal-button').addEventListener('click', () => updateStat('team2', 'shotsOnGoal', 1));

    document.getElementById('team1-outOfGoal-button').addEventListener('click', () => updateStat('team1', 'outOfGoal', 1));
    document.getElementById('team2-outOfGoal-button').addEventListener('click', () => updateStat('team2', 'outOfGoal', 1));

    document.getElementById('team1-fouls-button').addEventListener('click', () => updateStat('team1', 'fouls', 1));
    document.getElementById('team2-fouls-button').addEventListener('click', () => updateStat('team2', 'fouls', 1));

    document.getElementById('team1-yellowCards-button').addEventListener('click', () => updateStat('team1', 'yellowCards', 1));
    document.getElementById('team2-yellowCards-button').addEventListener('click', () => updateStat('team2', 'yellowCards', 1));

    document.getElementById('team1-redCards-button').addEventListener('click', () => updateStat('team1', 'redCards', 1));
    document.getElementById('team2-redCards-button').addEventListener('click', () => updateStat('team2', 'redCards', 1));

    document.getElementById('team1-offsides-button').addEventListener('click', () => updateStat('team1', 'offsides', 1));
    document.getElementById('team2-offsides-button').addEventListener('click', () => updateStat('team2', 'offsides', 1));

    // Reset button
    document.getElementById('reset-button').addEventListener('click', resetStats);
}

// Initialize event listeners
addEventListeners();
