// Assuming the file has imports and surrounding context

const calculateFertilityPhases = (entries, stats) => {
    return entries.map(entry => {
        let ovulationDate = entry.ovulationDate;
        if (!ovulationDate && stats.ovulationAvgDay !== null && entries.length >= 2) {
            // Fallback ovulation date
            const startDate = new Date(entry.startDate);
            const fallbackDays = stats.ovulationAvgDay || 14;
            ovulationDate = new Date(startDate.setDate(startDate.getDate() + fallbackDays));
            entry.tooltip += ' (szac.)'; // Marking as estimate in tooltip
        }
        // Existing logic for fertility phases continues...
        return { ...entry, ovulationDate };
    });
};

// Additional code for rendering or using the phases...
