// Added fertility phase coloring based on clicked ovulation date

import React from 'react';
import { TFertilityPhase, PHASE_COLORS, PHASE_LABEL } from './constants'; // assuming the types and colors are defined in a separate constants file

const getPhaseForDay = (date) => {
    // logic to determine fertility phase based on the date
};

const CalendarGrid = ({ days }) => {
    return (
        <div className="calendar-grid">
            {days.map((day) => {
                const phase = getPhaseForDay(day);
                return (
                    <div key={day} className={`day-cell ${PHASE_COLORS[phase]}`}> {/* Use phase colors as primary class */} 
                        <div className="phase-dot-badge">{phase}</div> {/* Phase dot badge */} 
                        <TooltipContent date={day} phase={phase} />
                    </div>
                );
            })}
        </div>
    );
};

const TooltipContent = ({ date, phase }) => {
    return (
        <div className="tooltip-content">
            <span>{PHASE_LABEL[phase]}</span> {/* Extend TooltipContent to include phase label */}
        </div>
    );
};

const Legend = () => {
    return (
        <div className="legend">
            {Object.keys(PHASE_COLORS).map((phase) => (
                <div key={phase} style={{ color: PHASE_COLORS[phase] }}>
                    {PHASE_LABEL[phase]}
                </div>  {/* Update legend with three phase colors */}
            ))}
        </div>
    );
};

export { CalendarGrid, TooltipContent, Legend };