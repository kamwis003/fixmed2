// Restore the original CycleCalendar implementation from main
import React from 'react';
import PhaseTooltip from './PhaseTooltip';

const CycleCalendar = ({ ovulationDate, phases }) => {
  return (
    <div className="cycle-calendar">
      {phases.map((phase, index) => (
        <div key={index} className="phase" style={{ backgroundColor: phase.color }}> {/* Use phase as primary cell color */} 
          <PhaseTooltip phase={phase} />
          <div className="dot-badge" /> {/* Add dot badge */}
        </div>
      ))}
    </div>
  );
};

// Update the legend with three phase colors
const phaseColors = ['#ffcccc', '#ccffcc', '#ccccff']; // Example color codes
const Legend = () => (
  <div className="legend">
    <div className="legend-item" style={{ backgroundColor: phaseColors[0] }}>Phase 1</div>
    <div className="legend-item" style={{ backgroundColor: phaseColors[1] }}>Phase 2</div>
    <div className="legend-item" style={{ backgroundColor: phaseColors[2] }}>Phase 3</div>
  </div>
);

export { CycleCalendar, Legend };