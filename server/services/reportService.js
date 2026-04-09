// const generateReport = async (property) => {
//     return `
// Property Energy Report

// This property is estimated to have a DPE rating of ${property.predictedRating}.

// Energy Consumption: ${property.energyConsumption} kWh/m²/year
// CO2 Emissions: ${property.co2Emission} kg/m²/year

// Key Observations:
//  Property Type: ${property.propertyType}
//  Construction Year: ${property.constructionYear}
//  Heating Type: ${property.heatingType}
//  Window Type: ${property.windowType}

// Recommendations:
// ${property.recommendations.map(r => "- " + r).join("\n")}

// Improving these factors can significantly enhance the energy efficiency of the property.
//   `;
// };
const generateReport = async (property) => {
    return `
Property Energy Report

Estimated DPE Rating: ${property.predictedRating}

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

⚠️ This is a pre-assessment estimate only and does not replace an official DPE inspection by a certified professional.
  `;
};

module.exports = { generateReport };