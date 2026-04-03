const generateReport = (property) => {
    return `
Property Energy Report

This property is estimated to have a DPE rating of ${property.predictedRating}.

Energy Consumption: ${property.energyConsumption} kWh/m²/year
CO2 Emissions: ${property.co2Emission} kg/m²/year

Key Observations:
 Property Type: ${property.propertyType}
 Construction Year: ${property.constructionYear}
 Heating Type: ${property.heatingType}
 Window Type: ${property.windowType}

Recommendations:
${property.recommendations.map(r => "- " + r).join("\n")}

Improving these factors can significantly enhance the energy efficiency of the property.
  `;
};

module.exports = { generateReport };